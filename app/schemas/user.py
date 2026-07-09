from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# 1. Bộ khung chứa dữ liệu chung
class UserBase(BaseModel):
    fullname: str
    email: EmailStr

# 2. Schema dùng khi ĐĂNG KÝ / TẠO MỚI (Cần người dùng gửi lên mật khẩu dạng chữ thường)
class UserCreate(UserBase):
    password: str

# 3. Schema dùng khi TRẢ DỮ LIỆU VỀ (Giấu mật khẩu đi để bảo mật, chỉ trả về thông tin cơ bản)
class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    # Cấu hình để Pydantic tự chuyển đổi dữ liệu từ SQLAlchemy Model sang JSON
    class Config:
        from_attributes = True