from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os


UPLOAD_FOLDER = os.path.join(os.getcwd(), 'files')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def fileUploadController():
    try:

        fileType = request.args.get('file-type')

        file = request.files.get('file')
        if not file:
            return jsonify({"message": "No file part found in request"}), 400
        
        
        filename = secure_filename(file.filename)

        if(fileType == 'accreditation'):
            acc_body_name = request.form.get('accBodyName')

            if not acc_body_name:
                return jsonify({"message": "Accreditation body name is required"}), 400
            
            
        folderPath = os.path.join(UPLOAD_FOLDER, fileType)
        os.makedirs(folderPath, exist_ok=True)
        save_path = os.path.join(folderPath,filename)
        file.save(save_path)

        return jsonify({
            "message": "File uploaded successfully",
            "filename": filename,
            "path": save_path,
        }), 201

    except Exception as e:
        print("Error during upload:", e)
        return jsonify({"message": "Something went wrong", "error": str(e)}), 500