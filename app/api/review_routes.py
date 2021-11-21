from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms import NewReview
from .auth_routes import validation_errors_to_error_messages
import datetime

review_routes = Blueprint('reviews', __name__)

# Get all reviews for a dog.
@review_routes.route('/dog/<int:dogId>')
def dog_reviews(dogId):
    reviews = Review.query.filter(Review.dog_id == dogId).all()
    results = [review.to_dict() for review in reviews]
    return {'reviews': results}


#Create a review
@review_routes.route('/', methods=['POST'])
@login_required
def add_review():
    form = NewReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        review = Review(user_id=data['user_id'], dog_id=data['dog_id'],
                        comment=data['comment'], behavior=data['behavior'],
                        kindness=data['kindness'], quietness=data['quietness'],
                        energy=data['energy'], date=datetime.datetime.now().date())

        db.session.add(review)
        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# # #Update a walk date
# @walk_routes.route('/<int:walkId>', methods=['PUT'])
# def update_dog(walkId):
#     form = UpdatedWalk()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data

#         walk = Walk.query.filter(Walk.id == walkId).first()
#         walk.date = data['walk_date']

#         db.session.commit()

#         return walk.walk_info()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_walk(reviewId):
    review = Review.query.filter(Review.id == reviewId).first()
    if review:
        db.session.delete(review)
        db.session.commit()
        return "Deleted the review"
