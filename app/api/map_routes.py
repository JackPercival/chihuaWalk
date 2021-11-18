from flask import Blueprint
from app.config import Config

map_routes = Blueprint('map', __name__)

@map_routes.route('/key', methods=['POST'])
def return_api_key():

    return {'api_key' : Config.GOOGLE_KEY}
