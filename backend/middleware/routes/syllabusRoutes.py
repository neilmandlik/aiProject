from flask import Blueprint
from controllers.syllabusControllers.syllabusControllers import getSyllabusFileNamesControllers

syllabus_route_bp = Blueprint('syllabus', __name__)
syllabus_route_bp.route('/syllabus-file-name', methods=['GET'])(getSyllabusFileNamesControllers)