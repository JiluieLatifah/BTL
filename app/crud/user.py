from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

# Hàm lấy thông tin người dùng theo Email (để kiểm tra xem email đã tồn tại chưa)
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Hàm tạo mới người dùng vào Database
def create_user(db: Session, user_in: UserCreate):
    # Tạo object dữ liệu từ model, lưu ý thực tế cần mã hóa password (ở đây làm mẫu chữ thô trước)
    db_user = User(
        fullname=user_in.fullname,
        email=user_in.email,
        hashed_password=user_in.password  
    )
    db.add(db_user)       # Thêm vào phiên làm việc
    db.commit()          # Lưu lại thay đổi vào PostgreSQL
    db.refresh(db_user)    # Lấy lại dữ liệu mới nhất (bao gồm cả ID tự sinh) từ DB về
    return db_user