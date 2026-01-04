from models.PerformanceDetails import PerformanceDetails
from databaseConnection import sessionLocal
from models.AccreditationRubrics import AccreditationRubrics
from models.SyllabusDetails import SyllabusDetails
from models.PerformanceDetails import PerformanceDetails
from models.PerformanceScore import PerformanceScore
from datetime import datetime

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

def get_selected_acc_rubrics(accIds):
    with sessionLocal() as session:
        rubrics = (
            session.query(
                AccreditationRubrics.acc_id,
                AccreditationRubrics.acc_rub_id,
                AccreditationRubrics.acc_rubric,
                AccreditationRubrics.acc_rub_description
            )
            .filter(AccreditationRubrics.acc_id.in_(accIds))
            .order_by(
                AccreditationRubrics.acc_id,
                AccreditationRubrics.acc_rub_id
            )
            .all()
        )

        return [
            {
                "acc_id": rubric.acc_id,
                "acc_rub_id": rubric.acc_rub_id,
                "acc_rubric": rubric.acc_rubric,
                "acc_rub_description": rubric.acc_rub_description
            }
            for rubric in rubrics
        ]


def get_selected_syllabus_name(syllId):
    with sessionLocal() as session:
        syllabus_name = (
            session.query(
                SyllabusDetails.syll_filename
            )
            .filter(SyllabusDetails.syll_id == syllId)
            .first()
        )

        return syllabus_name[0]
    
def save_performance(syllId, reviewList):
    with sessionLocal() as session:
        
        perId = save_performance_detail(session, syllId)

        if not perId:
            return False

        isSaved = save_performance_score(session,perId=perId,reviewList=reviewList)

        if not isSaved:
            return False

    return True
        


def save_performance_detail(session,syllId):
    performance_detail = PerformanceDetails(
        per_name = f"Performance {datetime.now()}",
        syll_id = syllId
    )

    session.add(performance_detail)
    session.commit()

    return performance_detail.per_id

def save_performance_score(session,perId,reviewList):

    try:
        scoreObjects = []

        for review in reviewList:
            scoreObjects.append(
                PerformanceScore(
                    per_id=perId,
                    acc_rub_id=review["acc_rub_id"],
                    per_score=review["per_score"],
                    per_justification=review["per_justification"]
                )
            )

        session.bulk_save_objects(scoreObjects)
        session.commit()
        return True

    except Exception as e:
        print(e)
        return False