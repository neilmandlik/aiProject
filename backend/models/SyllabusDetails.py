from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from databaseConnection import Base

class SyllabusDetails(Base):
    __tablename__ = "syllabus_details"

    syll_id = Column(Integer, primary_key=True)
    syll_filename = Column(String(100))

    performance = relationship("PerformanceDetails", back_populates="syllabus")
