from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False, unique=False)
    last_name = db.Column(db.String(60), nullable=False, unique=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True, unique=False)

    dog = db.relationship("Dog", back_populates="user")
    review = db.relationship("Review", back_populates="user")
    walk = db.relationship("Walk", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_pic': self.profile_pic
        }

    def owner_info(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic
        }
