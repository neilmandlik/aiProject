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

    except Exception as e:
        print(f"Error fetching latest syllabus: {e}")
        return None

    finally:
        session.close()


def add_syllabus_filename(dbObj):
    session = sessionLocal()
    try:
        new_entry = SyllabusDetails(syll_filename=dbObj["filename"])
        session.add(new_entry)
        session.commit()
        session.refresh(new_entry)
        return ({
            "syll_id": new_entry.syll_id,
            "success": True,
            "message": "Syllabus Filename Saved Successfully"
        })

    except Exception as e:
        session.rollback()
        return ({
            "success": False,
            "message": f"Error occured: {e}"
        })

    finally:
        session.close()
