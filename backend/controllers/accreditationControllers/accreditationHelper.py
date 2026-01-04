from sqlalchemy import func
from models.AccreditationDetails import AccreditationDetails
from models.AccreditationRubrics import AccreditationRubrics
from models.PerformanceDetails import PerformanceDetails
from models.PerformanceScore import PerformanceScore
from databaseConnection import sessionLocal


def get_latest_accreditation():
    session = sessionLocal()
    try:

        result = (
            session.query(AccreditationDetails)
            .distinct()
            .all()
        )

        return result
    finally:
        session.close()


def generate_and_save_rubrics(rubrics,dbObj):

    try:
        rubric_list = rubrics
        if not rubric_list:
            raise ValueError("No rubrics generated.")

        # Save rubrics into DB
        with sessionLocal() as session:

            new_acc = AccreditationDetails(
                acc_filename=dbObj["filename"],
                acc_body_name=dbObj["acc_body_name"]
            )
            session.add(new_acc)
            session.commit()
            
            session.refresh(new_acc) 

            # Insert rubrics
            bulk_objects = [
                AccreditationRubrics(
                    acc_id=new_acc.acc_id,
                    acc_rubric=item["rubric"],
                    acc_rub_description=item["description"]
                )
                for item in rubric_list
            ]

            session.bulk_save_objects(bulk_objects)
            session.commit()

            return {
                "success": True,
                "message": "Rubrics saved successfully",
                "acc_id": new_acc.acc_id
            }

    except Exception as e:
        print(f"Error while generating or saving rubrics: {e}")
        return {
            "success": False,
            "error": str(e)
        }

