from flask import jsonify
from controllers.accreditationControllers.accreditationHelper import get_latest_accreditation
from controllers.accreditationControllers.accreditationHelper import generate_and_save_rubrics

from agents.rubricGenerator import generate_rubrics


def accreditationFileNameController():
    acc_list = get_latest_accreditation()

    if acc_list and len(acc_list) > 0:
        return jsonify([
            {
                "acc_id": acc.acc_id,
                "fileName": acc.acc_filename
            }
            for acc in acc_list
        ])
    else:
        return jsonify({"message": "No accreditation files found"}), 404
    
def addAccreditationFileController(text, dbObj):
    #Generate Rubrics

    rubrics = generate_rubrics(text)

    return generate_and_save_rubrics(rubrics["rubrics"],dbObj)

    