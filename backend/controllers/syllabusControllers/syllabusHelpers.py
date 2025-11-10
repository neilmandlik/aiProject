from models.SyllabusDetails import SyllabusDetails
from databaseConnection import sessionLocal
def get_latest_syllabus():
    session = sessionLocal()
    try:

        latest_syllabus = (
            session.query(SyllabusDetails.syll_filename)
            .order_by(SyllabusDetails.syll_id.desc())
            .first()
        )

        return latest_syllabus
    finally:
        session.close()