from flask import Blueprint
from controllers.fileControllers.fileContollers import fileUploadController
file_route_bp = Blueprint("file",__name__)

file_route_bp.route("/file-upload",methods = ['POST'])(fileUploadController)