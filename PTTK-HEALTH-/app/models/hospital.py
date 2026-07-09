from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    
    # Mối quan hệ với Chuyên khoa
    specialties = relationship("Specialty", back_populates="hospital", cascade="all, delete-orphan")