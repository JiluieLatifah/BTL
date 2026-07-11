from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
import random
from typing import Generator

from app.core.config import settings
from app.core.database import engine, Base, get_db

from app.models.user import User 
from app.models.hospital import Hospital
from app.models.specialty import Specialty
from app.models.time_slot import TimeSlot

# Tự động tạo bảng vào database
Base.metadata.create_all(bind=engine)
    
app = FastAPI(
    title="PTTK-HEALTH",
    openapi_url="/api/v1/openapi.json"
)

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# --- SCHEMAS ---
class OTPRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^0\d{9}$", description="Số điện thoại di động 10 số")

class OTPVerify(BaseModel):
    phone_number: str
    otp: str 

class BookingRequest(BaseModel):
    patient_profile_id: str
    time_slot_id: int
    current_version: int
    price: int

# Lưu trữ OTP tạm thời 
MOCK_OTP_STORE = {}

# --- API ENDPOINTS ---

@app.get("/")
def read_root():
    return {"status": "Healthy", "project_name": "PTTK-HEALTH"}

@app.post("/api/v1/auth/request-otp", summary="Gửi mã OTP")
def send_otp(request: OTPRequest):
    otp_code = str(random.randint(100000, 999999))
    MOCK_OTP_STORE[request.phone_number] = otp_code
    return {
        "status": "Success", 
        "message": "OTP đã được gửi", 
        "debug_otp": otp_code  
    }

# [API XÁC THỰC - LOGIC UPSERT]
@app.post("/api/v1/auth/otp", summary="Xác thực OTP và Đăng nhập/Đăng ký")
def verify_otp(request: OTPVerify, db: Session = Depends(get_db)):
    # 1. Kiểm tra OTP
    if request.phone_number not in MOCK_OTP_STORE or MOCK_OTP_STORE[request.phone_number] != request.otp:
        raise HTTPException(status_code=400, detail="Mã OTP không chính xác.")
    
    del MOCK_OTP_STORE[request.phone_number]
    
    # 2. Logic Kiểm tra người dùng
    user = db.query(User).filter(User.phone_number == request.phone_number).first()
    
    if not user:
        # Nếu chưa tồn tại -> Đăng ký mới
        new_user = User(phone_number=request.phone_number)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        # Trả về is_new_user: True để Front-end hiển thị thông báo "Đăng ký thành công"
        return {
            "status": "Success", 
            "is_new_user": True, 
            "message": "Đăng ký tài khoản thành công!"
        }
    else:
        # Nếu đã tồn tại -> Chào mừng trở lại
        # Trả về is_new_user: False để Front-end hiển thị thông báo "Đăng nhập thành công"
        return {
            "status": "Success", 
            "is_new_user": False, 
            "message": "Chào mừng bạn trở lại!"
        }

# [API ĐẶT LỊCH]
@app.post("/api/v1/booking/create", summary="Đặt lịch khám bệnh")
def create_booking(request: BookingRequest, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == request.time_slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Không tìm thấy khung giờ.")

    if hasattr(slot, 'version') and slot.version != request.current_version:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Lịch đã thay đổi, vui lòng tải lại.")

    booked_slots = getattr(slot, 'So_Luong_Hien_Tai', getattr(slot, 'booked_slots', 0))
    max_slots = getattr(slot, 'So_Luong_Toi_Da', getattr(slot, 'max_slots', 5))

    if booked_slots >= max_slots:
        raise HTTPException(status_code=400, detail="Khung giờ đã hết chỗ.")

    if hasattr(slot, 'So_Luong_Hien_Tai'): slot.So_Luong_Hien_Tai += 1
    elif hasattr(slot, 'booked_slots'): slot.booked_slots += 1

    if hasattr(slot, 'version'): slot.version += 1

    db.commit()
    db.refresh(slot)

    return {
        "status": "Success",
        "data": {"maPhieuKham": f"MED-{random.randint(10000000, 99999999)}"}
    }

# [API HỦY LỊCH]
@app.put("/api/v1/booking/cancel/{appointment_id}", summary="Hủy lịch khám")
def cancel_booking(appointment_id: str):
    return {"status": "Success", "message": "Hủy lịch khám thành công."}