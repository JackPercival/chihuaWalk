from flask_wtf import FlaskForm
from wtforms import StringField

class UpdatePicture(FlaskForm):
    profile_pic = StringField('profile_pic')
