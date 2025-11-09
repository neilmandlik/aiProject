from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from databaseConnection import Base

class AccreditationRubrics(Base):
    __tablename__ = "accreditation_rubrics"

    acc_rub_id = Column(Integer, primary_key=True)
    acc_id = Column(Integer, ForeignKey("accreditation_details.acc_id"))
    acc_rubric = Column(String(100))
    acc_rub_description = Column(String(300))

