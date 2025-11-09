from models.PerformanceDetails import PerformanceDetails
from databaseConnection import sessionLocal

def get_all_performance_names():
    session = sessionLocal()
    try:
        results = session.query(
            PerformanceDetails.per_id,
            PerformanceDetails.per_name
        ).order_by(PerformanceDetails.per_id.asc()).all()

        performances = [
            {"per_id": per_id, "performance_name": name}
            for per_id, name in results
        ]

        return performances
    finally:
        session.close()