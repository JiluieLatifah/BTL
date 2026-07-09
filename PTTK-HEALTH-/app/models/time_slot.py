from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class TimeSlot(Base):
    __tablename__ = "time_slots"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)          # Ví dụ: "2026-07-10"
    time_range = Column(String, nullable=False)    # Ví dụ: "08:00 - 09:00"
    total_slots = Column(Integer, default=5)       # Số lượng slot gốc ban đầu
    available_slots = Column(Integer, default=5)   # Số lượng slot còn trống thực tế
    version = Column(Integer, default=1, nullable=False)  # 👈 BẮT BUỘC để phục vụ Hạn chót 2 chống Overbooking
    
    specialty_id = Column(Integer, ForeignKey("specialties.id", ondelete="CASCADE"), nullable=False)
    specialty = relationship("Specialty", back_populates="slots")