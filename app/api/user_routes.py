from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms import UpdateName
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Update user name
@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def update_user_name(userId):
    form = UpdateName()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        user = User.query.filter(User.id == userId).first()
        user.first_name = data['first_name']
        user.last_name= data['last_name']

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
