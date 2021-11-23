from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
# from app.models import User

class UpdateName(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(message="First Name is required.")])
    last_name = StringField('last_name', validators=[DataRequired(message="Last Name is required.")])
