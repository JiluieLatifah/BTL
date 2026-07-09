from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
import random
from typing import Generator

from app.core.config import settings
from app.core.database import engine, Base, get_db

# Import các model thực tế từ Database của bạn
from app.models.hospital import Hospital
from app.models.specialty import Specialty
from app.models.time_slot import TimeSlot

# Tự động tạo bảng vào PostgreSQL nếu chưa tồn tại
Base.metadata.create_all(bind=engine)
    
app = FastAPI(
    title="PTTK-HEALTH",
    openapi_url="/api/v1/openapi.json"
)

# --- CẤU HÌNH CORS MIDDLEWARE (BẮT BUỘC ĐỂ FRONTEND RÁP NỐI ĐƯỢC API) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn truy cập (hoặc cấu hình port cụ thể của Frontend sau)
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức GET, POST, PUT, DELETE
    allow_headers=["*"],  # Cho phép tất cả các headers mẫu
)

# --- 1. KHU VỰC ĐỊNH NGHĨA PYDANTIC SCHEMAS (VALIDATION) ---
class OTPRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^\d{10}$", description="Số điện thoại gồm 10 chữ số")

class OTPVerify(BaseModel):
    phone_number: str
    otp_code: str

class BookingRequest(BaseModel):
    patient_profile_id: str = Field(..., description="Mã hồ sơ bệnh nhân (MP-XXXXXX)")
    time_slot_id: int = Field(..., description="ID của khung giờ khám muốn đặt")
    current_version: int = Field(..., description="Version hiện tại đọc từ client để check Optimistic Locking")
    price: int

# Lưu trữ OTP tạm thời trong bộ nhớ RAM của server
MOCK_OTP_STORE = {}


# --- 2. CÁC API ENDPOINTS ---

@app.get("/")
def read_root():
    return {"status": "Healthy", "project_name": "PTTK-HEALTH"}


# [API 1] GỬI MÃ OTP VIA PHONE NUMBER
@app.post("/api/v1/auth/send-otp", summary="Gửi mã OTP qua số điện thoại")
def send_otp(request: OTPRequest):
    # Sinh ngẫu nhiên mã OTP 6 chữ số
    otp_code = str(random.randint(100000, 999999))
    MOCK_OTP_STORE[request.phone_number] = otp_code
    
    return {
        "status": "Success",
        "message": f"Mã OTP đã được gửi tới {request.phone_number}",
        "debug_otp": otp_code  # Giúp Tester xem trực tiếp trên Swagger để nhập test ở bước sau
    }


# [API 2] XÁC THỰC MÃ OTP ĐĂNG NHẬP
@app.post("/api/v1/auth/verify-otp", summary="Xác thực OTP và đăng nhập")
def verify_otp(request: OTPVerify):
    if request.phone_number not in MOCK_OTP_STORE or MOCK_OTP_STORE[request.phone_number] != request.otp_code:
        raise HTTPException(status_code=400, detail="Mã OTP không chính xác hoặc đã hết hạn.")
    
    # Xóa OTP sau khi xác thực thành công để bảo mật
    del MOCK_OTP_STORE[request.phone_number]
    
    return {
        "status": "Success",
        "message": "Đăng nhập thành công",
        "access_token": "mock-json-web-token-real-db-xyz123",
        "token_type": "bearer"
    }


# [API 3] ĐẶT LỊCH KHÁM BỆNH (XỬ LÝ TRANH CHẤP & QUÁ TẢI TRÊN POSTGRESQL THẬT)
@app.post("/api/v1/booking/create", summary="Đặt lịch khám bệnh (Tương tác PostgreSQL)")
def create_booking(request: BookingRequest, db: Session = Depends(get_db)):
    # Bước 1: Truy vấn khung giờ khám thực tế từ bảng dựa trên dữ liệu bạn đã seed
    slot = db.query(TimeSlot).filter(TimeSlot.id == request.time_slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Không tìm thấy khung giờ khám này.")

    # Bước 2: Kiểm tra Optimistic Locking (Chống tranh chấp dữ liệu bằng thuộc tính version)
    # Nếu file model của bạn dùng tên cột khác (ví dụ: 'version'), hãy sửa tương ứng tên thuộc tính
    if hasattr(slot, 'version') and slot.version != request.current_version:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Lịch khám đã có sự thay đổi từ người dùng khác. Vui lòng tải lại trang."
        )

    # Bước 3: Kiểm tra Overbooking (Đối chiếu số lượng hiện tại với số lượng tối đa)
    # Tự động map theo tên cột bạn định nghĩa trong Model (mặc định dự phòng nếu chưa map)
    booked_slots = getattr(slot, 'So_Luong_Hien_Tai', getattr(slot, 'booked_slots', 0))
    max_slots = getattr(slot, 'So_Luong_Toi_Da', getattr(slot, 'max_slots', 5))

    if booked_slots >= max_slots:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Khung giờ này đã đạt số lượng đăng ký tối đa. Vui lòng chọn khung giờ khác."
        )

    # Bước 4: Cập nhật tăng lượt đặt lịch và nâng số hiệu phiên bản trực tiếp xuống DB
    if hasattr(slot, 'So_Luong_Hien_Tai'):
        slot.So_Luong_Hien_Tai += 1
    elif hasattr(slot, 'booked_slots'):
        slot.booked_slots += 1

    if hasattr(slot, 'version'):
        slot.version += 1

    db.commit()
    db.refresh(slot)

    # Sinh mã phiếu tự động theo định dạng tài liệu mô tả chuẩn: MED-XXXXXXXX
    generated_id = f"MED-{random.randint(10000000, 99999999)}"

    return {
        "status": "Success",
        "message": "Đặt lịch khám thành công và đã cập nhật xuống PostgreSQL.",
        "data": {
            "maPhieuKham": generated_id,
            "trangThaiPhieu": "ChoThanhToan",
            "soTienKham": request.price,
            "new_version": getattr(slot, 'version', 1)
        }
    }


# [API 4] HỦY LỊCH TRƯỚC 24H
@app.put("/api/v1/booking/cancel/{appointment_id}", summary="Hủy lịch khám (Kiểm tra điều kiện trước 24 giờ)")
def cancel_booking(appointment_id: str, db: Session = Depends(get_db)):
    # Giả định lấy được thông tin ngày hẹn khám từ bảng phiếu khám trong DB
    # Mốc này mô phỏng logic tính toán 24h bằng dữ liệu thời gian thật để tester chạy được ngay
    appointment_time = datetime.now() + timedelta(hours=30)  # Giả lập lịch khám diễn ra sau 30 tiếng nữa
    
    time_difference = appointment_time - datetime.now()
    
    # Ràng buộc điều kiện thời gian hủy tối thiểu
    if time_difference < timedelta(hours=24):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Không thể hủy lịch! Theo quy định, quý khách chỉ được quyền hủy trước giờ hẹn khám ít nhất 24 tiếng."
        )
        
    return {
        "status": "Success",
        "message": "Hủy lịch khám thành công (Điều kiện thời gian hợp lệ).",
        "appointment_id": appointment_id,
        "trangThaiMoi": "Đã hủy"
    }