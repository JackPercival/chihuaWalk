from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class NewReview(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    dog_id = IntegerField("dog_id", validators=[DataRequired()])
    comment = StringField("comment", validators=[DataRequired()])
    behavior = IntegerField("behavior", validators=[DataRequired()])
    kindness = IntegerField("kindness", validators=[DataRequired()])
    quietness = IntegerField("quietness", validators=[DataRequired()])
    energy = IntegerField("energy", validators=[DataRequired()])
