from flask import Blueprint,jsonify
from controllers.testController import testController

test_route_bp = Blueprint("test",__name__)

test_route_bp.route("/test",methods = ['GET'])(testController)