from logging import log
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms import NewReview, UpdateReview
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

# #Update a review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    form = UpdateReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        review = Review.query.filter(Review.id == reviewId).first()
        review.comment = data['comment']
        review.behavior = data['behavior']
        review.kindness = data['kindness']
        review.quietness = data['quietness']
        review.energy= data['energy']

        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Delete a review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_walk(reviewId):
    review = Review.query.filter(Review.id == reviewId).first()
    if review:
        db.session.delete(review)
        db.session.commit()
        return "Deleted the review"
