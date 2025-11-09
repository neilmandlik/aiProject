from sqlalchemy import func
from models.AccreditationDetails import AccreditationDetails
from models.AccreditationRubrics import AccreditationRubrics
from models.PerformanceDetails import PerformanceDetails
from models.PerformanceScore import PerformanceScore
from databaseConnection import sessionLocal

def get_latest_accreditation():
    session = sessionLocal()
    try:
        latest_per_subq = session.query(func.max(PerformanceDetails.per_id)).scalar_subquery()

        result = (
            session.query(AccreditationDetails)
            .join(AccreditationRubrics, AccreditationRubrics.acc_id == AccreditationDetails.acc_id)
            .join(PerformanceScore, PerformanceScore.acc_rub_id == AccreditationRubrics.acc_rub_id)
            .join(PerformanceDetails, PerformanceDetails.per_id == PerformanceScore.per_id)
            .filter(PerformanceDetails.per_id == latest_per_subq)
            .distinct()
            .all()
        )

        return result
    finally:
        session.close()
