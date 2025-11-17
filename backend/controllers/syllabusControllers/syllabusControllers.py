from controllers.syllabusControllers.syllabusHelpers import get_latest_syllabus, add_syllabus_filename
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
    
def addSyllabusFileController(dbObj):

    #Make DB call to add syllabus File name
    return add_syllabus_filename(dbObj)


    