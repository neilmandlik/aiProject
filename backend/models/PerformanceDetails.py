from sqlalchemy import Column, Integer, Float, ForeignKey, String
from sqlalchemy.orm import relationship
from databaseConnection import Base

class PerformanceDetails(Base):
    __tablename__ = "performance_details"

    per_id = Column(Integer, primary_key=True)
    per_name = Column(String(30))
    syll_id = Column(Integer, ForeignKey("syllabus_details.syll_id"))
    review_percentage = Column(Float)
