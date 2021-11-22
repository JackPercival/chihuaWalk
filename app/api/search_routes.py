from flask import Blueprint, jsonify, request
from app.models import db, Dog
from app.forms import SearchForm
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)

# Get search results
@search_routes.route('/', methods=['POST'])
def search_results():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    # Grab all the different filters
    filters = []
    if (data["city"]):
        filters.append(Dog.city.ilike(f'%{data["city"]}%'))
    if (data["state"]):
        filters.append(Dog.state == data["state"])
    if (data["breed"]):
        filters.append(Dog.breed.ilike(f'%{data["breed"]}%'))
    if (data["min_weight"]):
        filters.append(Dog.weight >= data["min_weight"])
    if (data["max_weight"]):
        filters.append(Dog.weight <= data["max_weight"])

    # Pass all filters into a query
    dogs = Dog.query.filter(*filters)

    results = [dog.to_dict() for dog in dogs]
    return {'dogs': results}
