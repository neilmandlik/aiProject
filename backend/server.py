from flask import Flask
from flask_cors import CORS

import os
from dotenv import load_dotenv

from middleware.routes.testRoute import test_route_bp
from middleware.corsOpt import corsOpt

server = Flask(__name__)
load_dotenv()

server.config['PORT'] = int(os.getenv('PORT'))

CORS(server, resources={r"/*": corsOpt})

server.register_blueprint(test_route_bp,url_prefix = "/api")

if __name__ == "__main__":
    server.run(port = server.config['PORT'], debug = True)

