from flask import Flask
from flask_cors import CORS
from api import apiServe


class FlaskApp():

    @classmethod
    def creating_app(cls):
        app = Flask(__name__, static_folder='/static',template_folder='/templates')
        CORS(app)
        app.register_blueprint(apiServe.api_app)
        return app