from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from controllers.fileControllers.fileHelper import extract_text_from_pdf
from controllers.accreditationControllers.accreditationController import addAccreditationFileController
from controllers.syllabusControllers.syllabusControllers import addSyllabusFileController


UPLOAD_FOLDER = os.path.join(os.getcwd(), 'files')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def fileUploadController():
    try:

        fileType = request.args.get('file-type')

        file = request.files.get('file')
        if not file:
            return jsonify({"message": "No file part found in request"}), 400
        
        
        filename = secure_filename(file.filename)

        #Check Before uploading File
        if fileType == 'accreditation':
            acc_body_name = request.form.get('accBodyName')

            if not acc_body_name:
                return jsonify({"message": "Accreditation body name is required"}), 400
            
            
        folderPath = os.path.join(UPLOAD_FOLDER, fileType)
        os.makedirs(folderPath, exist_ok=True)
        save_path = os.path.join(folderPath,filename)
        file.save(save_path)      

        #Check to save in db
        if fileType == 'accreditation':

            text = extract_text_from_pdf(save_path)    

            dbObj = {
                "filename": filename,
                "acc_body_name": acc_body_name
            }

            returnObj = addAccreditationFileController(text, dbObj)
            
            if returnObj["success"]:
                return jsonify({
                    "message": "File uploaded and rubrics generated successfully",
                    "filename": filename,
                    "acc_id": returnObj.get("acc_id")
                }), 201
            else:
                return jsonify({
                    "message": "Failed to generate rubrics",
                    "error": returnObj.get("message")
                }), 500

        elif fileType == 'syllabus':

            dbObj = {
                "filename": filename
            }

            returnObj = addSyllabusFileController(dbObj)

            if returnObj["success"]:
                return jsonify({
                    "message": "File uploaded successfully",
                    "filename": filename,
                    "syll_id": returnObj.get("syll_id")
                }), 201
            else:
                return jsonify({
                    "message": "Failed to generate rubrics",
                    "error": returnObj.get("message")
                }), 500
        


    except Exception as e:
        print("Error during upload:", e)
        return jsonify({"message": "Something went wrong", "error": str(e)}), 500