from flask import jsonify
from controllers.accreditationControllers.accreditationHelper import get_latest_accreditation


def accreditationFileNameController():
    acc = get_latest_accreditation()
    if acc:
        return jsonify({
            "acc_id": acc.acc_id,
            "acc_filename": acc.acc_filename
        })
    else:
        return jsonify({"message": "No accreditation files found"}),404