from flask import jsonify
from controllers.performanceControllers.performanceHelpers import get_all_performance_names

def getPerformanceReviewNames():
    try:
        performances = get_all_performance_names()

        if not performances:
            return jsonify({"message": "No performance records found"}), 404

        return jsonify({"performances": performances}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

