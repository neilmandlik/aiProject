from flask import Flask
from flask_cors import CORS

import os
from dotenv import load_dotenv

from middleware.routes.testRoute import test_route_bp
from middleware.routes.accreditationRoutes import accreditation_route_bp
from middleware.routes.performanceRoutes import performance_route_bp
from middleware.routes.syllabusRoutes import syllabus_route_bp
from middleware.corsOpt import corsOpt

server = Flask(__name__)
load_dotenv()

server.config['PORT'] = int(os.getenv('PORT'))

CORS(server, resources={r"/*": corsOpt})

server.register_blueprint(test_route_bp,url_prefix = "/api")
server.register_blueprint(accreditation_route_bp, url_prefix = "/api")
server.register_blueprint(performance_route_bp, url_prefix = "/api")
server.register_blueprint(syllabus_route_bp, url_prefix = "/api")

if __name__ == "__main__":
    server.run(port = server.config['PORT'], debug = True)

