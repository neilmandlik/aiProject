from flask import Blueprint
from controllers.accreditationControllers.accreditationController import accreditationFileNameController

accreditation_route_bp = Blueprint("accreditation",__name__)

accreditation_route_bp.route("/accreditation-file-names",methods = ['GET'])(accreditationFileNameController)