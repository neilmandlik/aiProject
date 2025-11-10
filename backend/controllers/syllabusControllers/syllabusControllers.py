from controllers.syllabusControllers.syllabusHelpers import get_latest_syllabus
from flask import jsonify

def getSyllabusFileNamesControllers():
    try:
        result = get_latest_syllabus()
        if result:
            return jsonify({"fileName":result.syll_filename}), 200
        else:
            return jsonify({"message": "No syllabus file name found"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500