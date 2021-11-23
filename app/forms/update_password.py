from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class UpdatePassword(FlaskForm):
    password = StringField('password', validators=[DataRequired(message="Password is required.")])
