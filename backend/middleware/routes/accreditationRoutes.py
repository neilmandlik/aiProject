from flask import Blueprint,jsonify
from controllers.accreditationControllers.accreditationController import accreditationFileNameController

test_route_bp = Blueprint("test",__name__)

test_route_bp.route("/accreditation-file-names",methods = ['GET'])(accreditationFileNameController)