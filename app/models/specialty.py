from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Specialty(Base):
    __tablename__ = "specialties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id", ondelete="CASCADE"), nullable=False)
    
    hospital = relationship("Hospital", back_populates="specialties")
    slots = relationship("TimeSlot", back_populates="specialty", cascade="all, delete-orphan")