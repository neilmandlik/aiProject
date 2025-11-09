from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from databaseConnection import Base

class PerformanceScore(Base):
    __tablename__ = "performance_score"

    per_rub_id = Column(Integer, primary_key=True)
    per_id = Column(Integer, ForeignKey("performance_details.per_id"))
    acc_rub_id = Column(Integer, ForeignKey("accreditation_rubrics.acc_rub_id"))
    per_score = Column(Integer)

    performance = relationship("PerformanceDetails", back_populates="scores")
    rubric = relationship("AccreditationRubrics", back_populates="scores")