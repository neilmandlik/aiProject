from flask import Blueprint
from controllers.performanceControllers.performanceControllers import getPerformanceReviewNames,generatePerformanceReview


performance_route_bp = Blueprint("performance",__name__)

performance_route_bp.route("/performance-review-names",methods = ['GET'])(getPerformanceReviewNames)
performance_route_bp.route("/generate-review",methods=['POST'])(generatePerformanceReview)
