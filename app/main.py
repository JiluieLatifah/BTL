from fastapi import FastAPI
from app.core.config import settings
from app.core.database import engine, Base
# Import đúng các model mới cho đồ án lịch khám bệnh
from app.models.hospital import Hospital
from app.models.specialty import Specialty
from app.models.time_slot import TimeSlot

# Lệnh tự động tạo toàn bộ các bảng vào PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.get("/")
def read_root():
    return {"status": "Healthy", "project_name": settings.PROJECT_NAME}