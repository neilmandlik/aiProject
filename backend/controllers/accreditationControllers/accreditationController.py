from flask import jsonify
from controllers.accreditationControllers.accreditationHelper import get_latest_accreditation


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
    
# def AddAccreditationFileController():
    