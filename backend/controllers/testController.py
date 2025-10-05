from flask import jsonify
def testController():
    return jsonify({"message": "Hi"})