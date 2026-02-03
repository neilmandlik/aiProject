from models.PerformanceDetails import PerformanceDetails
from databaseConnection import sessionLocal
from models.AccreditationRubrics import AccreditationRubrics
from models.SyllabusDetails import SyllabusDetails
from models.PerformanceDetails import PerformanceDetails
from models.PerformanceScore import PerformanceScore
from models.AccreditationDetails import AccreditationDetails
from datetime import datetime

def get_all_performance_names():
    session = sessionLocal()
    try:
        results = session.query(
            PerformanceDetails.per_id,
            PerformanceDetails.per_name
        ).order_by(PerformanceDetails.per_id.asc()).all()

        performances = [
            {"performanceId": per_id, "performanceName": name}
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
            return None

        isSaved = save_performance_score(session,perId=perId,reviewList=reviewList)

        session.commit()

        if not isSaved:
            return None

    return perId
        


def save_performance_detail(session,syllId):
    performance_detail = PerformanceDetails(
        per_name = f"Performance {datetime.now()}",
        syll_id = syllId
    )

    session.add(performance_detail)
    session.flush()

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
        return True

    except Exception as e:
        print(e)
        return False
    

def get_complete_review(perId):
    
    with sessionLocal() as session:
        try:
            results = (
                session.query(
                    PerformanceDetails.per_id,
                    PerformanceDetails.per_name,

                    SyllabusDetails.syll_id,
                    SyllabusDetails.syll_filename,

                    AccreditationDetails.acc_id,
                    AccreditationDetails.acc_filename,
                    AccreditationDetails.acc_body_name,

                    AccreditationRubrics.acc_rub_id,
                    AccreditationRubrics.acc_rubric,
                    AccreditationRubrics.acc_rub_description,

                    PerformanceScore.per_score,
                    PerformanceScore.per_justification
                )
                .join(SyllabusDetails, PerformanceDetails.syll_id == SyllabusDetails.syll_id)
                .join(PerformanceScore, PerformanceDetails.per_id == PerformanceScore.per_id)
                .join(AccreditationRubrics, PerformanceScore.acc_rub_id == AccreditationRubrics.acc_rub_id)
                .join(AccreditationDetails, AccreditationRubrics.acc_id == AccreditationDetails.acc_id)
                .filter(PerformanceDetails.per_id == perId)
                .all()
            )

            return results

        except Exception as e:
            print(f"Error fetching performance details: {e}")
            return None


def jsonify_results(result):

    firstRow = result[0]
    response = {
        "syllFileName": firstRow.syll_filename,
        "performanceName": firstRow.per_name,
        "accreditationDetails": {}
    }

    for row in result:
        acc_key = row.acc_id

        if acc_key not in response['accreditationDetails']:
            response['accreditationDetails'][acc_key]={
                "accFileName": row.acc_filename,
                "accBodyName": row.acc_body_name,
                "performanceDetails": []
            }

        response["accreditationDetails"][acc_key]["performanceDetails"].append({
            "performanceScore": row.per_score,
            "performanceJustification": row.per_justification,
            "accRubricName": row.acc_rubric,
            "accRubricDesc": row.acc_rub_description
        })

    return response

