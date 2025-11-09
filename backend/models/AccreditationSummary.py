from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from databaseConnection import Base

class AccreditationSummary(Base):
    __tablename__ = "accreditation_summary"

    acc_summary_id = Column(Integer, primary_key=True)
    acc_summary = Column(Text)
    acc_id = Column(Integer, ForeignKey("accreditation_details.acc_id"))

    details = relationship("AccreditationDetails", back_populates="summaries")