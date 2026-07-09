from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import Generator
from app.core.config import settings

# 1. Tạo Engine kết nối dựa trên đường dẫn DATABASE_URL cấu hình trong file .env
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True  # Tự động kiểm tra và làm mới kết nối nếu bị ngắt quãng
)

# 2. Tạo SessionLocal - nơi quản lý các phiên làm việc (đọc/ghi) với Database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Tạo Base class để các bảng dữ liệu (Models) kế thừa sau này
Base = declarative_base()

# 4. Tạo Hàm get_db để tự động đóng/mở kết nối khi API được gọi
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()