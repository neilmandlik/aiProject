from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from databaseConnection import Base

class PerformanceDetails(Base):
    __tablename__ = "performance_details"

    per_id = Column(Integer, primary_key=True)
    syll_id = Column(Integer, ForeignKey("syllabus_details.syll_id"))
    review_percentage = Column(Float)

    syllabus = relationship("SyllabusDetails", back_populates="performance")

    scores = relationship("PerformanceScore", back_populates="performance")