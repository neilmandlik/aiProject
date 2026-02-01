from flask import jsonify,request
from controllers.performanceControllers.performanceHelpers import (
    get_all_performance_names, 
    get_selected_acc_rubrics, 
    get_selected_syllabus_name,
    save_performance
)
from controllers.fileControllers.fileHelper import extract_text_from_pdf
import os

from agents.syllabusEvaluator import generate_review

def getPerformanceReviewNames():
    try:
        performances = get_all_performance_names()

        if not performances:
            return jsonify({"message": "No performance records found"}), 404

        return jsonify({"performances": performances}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def generatePerformanceReview():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No Data Found"}),404
            
        
        selectedAccFiles = data.get('accFiles')

        if not selectedAccFiles:
            return jsonify({"message": "Incomplete Data, Accreditation Files Aren't Selected"}),404

        selectedSyllFile = data.get('syllFile')

        if not selectedSyllFile:
            return jsonify({"message": "Incomplete Data, Syllabus File is not Selected"}),404
        
        #Step 1
        rubrics = get_selected_acc_rubrics(selectedAccFiles)

        #Step 2
        syllFile = get_selected_syllabus_name(selectedSyllFile)

        #Step 3
        syllabusText = extract_text_from_pdf(os.path.join(os.getcwd(),'files','syllabus',f'{syllFile}'))

        #Step 4
        review = generate_review(rubrics,syllabusText)
        if not review:
            return jsonify({"message": "Review could not be generated"}),500

        #Step 5
        perId = save_performance(selectedSyllFile,review["result"])
        if not save_performance(selectedSyllFile,review["result"]):
            return jsonify({"isReviewGenerated": False,"performanceId": None, "message": "Unable to save the Generated Review"})
        
        return jsonify({"isReviewGenerated": True, "performanceId": perId}), 200

    except Exception as e:
        return jsonify({"error": str(e)})
    

    

