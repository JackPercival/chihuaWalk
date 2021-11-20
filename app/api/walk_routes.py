from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Dog, Walk
from app.forms import NewWalk
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

# #Update a dog
# @dog_routes.route('/<int:dogId>', methods=['PUT'])
# def update_dog(dogId):
#     form = NewDogForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data

#         dog = Dog.query.filter(Dog.id == dogId).first()
#         dog.name = data['name']
#         dog.breed = data['breed']
#         dog.description = data['description']
#         dog.weight = data['weight']
#         dog.address = data['address']
#         dog.city = data['city']
#         dog.state = data['state']
#         dog.latitude=data['latitude']
#         dog.longitude=data['longitude']

#         images = Image.query.filter(Image.dog_id == dogId).all()
#         for image in images:
#             db.session.delete(image)
#         db.session.commit()

#         image1 = Image(dog_id=dogId, url=form.data['image1'])
#         image2 = Image(dog_id=dogId, url=form.data['image2'])
#         image3 = Image(dog_id=dogId, url=form.data['image3'])

#         db.session.add(image1)
#         db.session.add(image2)
#         db.session.add(image3)

#         db.session.commit()
#         return dog.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# #Delete a dog
# @dog_routes.route('/<int:dogId>', methods=['DELETE'])
# def delete_dog(dogId):
#     dog = Dog.query.filter(Dog.id == dogId).first()
#     if dog:
#         db.session.delete(dog)
#         db.session.commit()
#         return "Deleted the dog"
