from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from databaseConnection import Base

class AccreditationDetails(Base):
    __tablename__ = "accreditation_details"

    acc_id = Column(Integer, primary_key=True)
    acc_filename = Column(String(100))
