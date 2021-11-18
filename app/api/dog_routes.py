from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Dog, Image
from app.forms import NewDogForm
from .auth_routes import validation_errors_to_error_messages

dog_routes = Blueprint('dogs', __name__)

# Get all dogs. Used for the browse page
@dog_routes.route('/')
def all_dogs():
    dogs = Dog.query.all()
    results = [dog.to_dict() for dog in dogs]
    return {'dogs': results}

#Create a dog
@dog_routes.route('/', methods=['POST'])
def add_dog():
    form = NewDogForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        dog = Dog(user_id=data['user_id'], name=data['name'], breed=data['breed'], description=data['description'],
                    weight=data['weight'], address=data['address'], city=data['city'], state=data['state'],
                    country=data['country'], latitude=data['latitude'], longitude=data['longitude'])

        db.session.add(dog)
        db.session.commit()

        image1 = Image(dog_id=dog.id, url=form.data['image1'])
        image2 = Image(dog_id=dog.id, url=form.data['image2'])
        image3 = Image(dog_id=dog.id, url=form.data['image3'])

        db.session.add(image1)
        db.session.add(image2)
        db.session.add(image3)
        db.session.commit()

        return dog.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Update a dog
@dog_routes.route('/<int:dogId>', methods=['PUT'])
def update_dog(dogId):
    form = NewDogForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        dog = Dog.query.filter(Dog.id == dogId).first()
        dog.name = data['name']
        dog.breed = data['breed']
        dog.description = data['description']
        dog.weight = data['weight']
        dog.address = data['address']
        dog.city = data['city']
        dog.state = data['state']
        dog.latitude=data['latitude']
        dog.longitude=data['longitude']

        images = Image.query.filter(Image.dog_id == dogId).all()
        for image in images:
            db.session.delete(image)
        db.session.commit()

        image1 = Image(dog_id=dogId, url=form.data['image1'])
        image2 = Image(dog_id=dogId, url=form.data['image2'])
        image3 = Image(dog_id=dogId, url=form.data['image3'])

        db.session.add(image1)
        db.session.add(image2)
        db.session.add(image3)

        db.session.commit()
        return dog.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a dog
@dog_routes.route('/<int:dogId>', methods=['DELETE'])
def delete_dog(dogId):
    dog = Dog.query.filter(Dog.id == dogId).first()
    if dog:
        db.session.delete(dog)
        db.session.commit()
        return "Deleted the dog"
