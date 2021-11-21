from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Dog, Walk
from app.forms import NewWalk, UpdatedWalk
from .auth_routes import validation_errors_to_error_messages

walk_routes = Blueprint('walks', __name__)

# Get all scheduled walks for a dog.
@walk_routes.route('/dog/<int:dogId>')
def dog_walks(dogId):
    walks = Walk.query.filter(Walk.dog_id == dogId).all()
    results = [walk.to_dict() for walk in walks]
    return {'walks': results}


# Get all scheduled walks for a user.
@walk_routes.route('/user/<int:userId>')
@login_required
def user_walks(userId):
    walks = Walk.query.filter(Walk.user_id == userId).all()
    results = [walk.walk_info() for walk in walks]
    return {'walks': results}

#Create a dog
@walk_routes.route('/', methods=['POST'])
@login_required
def add_walk():
    form = NewWalk()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        walk = Walk(user_id=data['user_id'], dog_id=data['dog_id'], date=data['walk_date'])

        db.session.add(walk)
        db.session.commit()

        return walk.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# #Update a walk date
@walk_routes.route('/<int:walkId>', methods=['PUT'])
def update_dog(walkId):
    form = UpdatedWalk()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        walk = Walk.query.filter(Walk.id == walkId).first()
        walk.date = data['walk_date']

        db.session.commit()

        return walk.walk_info()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a walk
@walk_routes.route('/<int:walkId>', methods=['DELETE'])
@login_required
def delete_walk(walkId):
    walk = Walk.query.filter(Walk.id == walkId).first()
    if walk:
        db.session.delete(walk)
        db.session.commit()
        return "Deleted the walk"
