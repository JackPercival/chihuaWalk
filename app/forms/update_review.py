from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class UpdateReview(FlaskForm):
    comment = StringField("comment", validators=[DataRequired()])
    behavior = IntegerField("behavior", validators=[DataRequired()])
    kindness = IntegerField("kindness", validators=[DataRequired()])
    quietness = IntegerField("quietness", validators=[DataRequired()])
    energy = IntegerField("energy", validators=[DataRequired()])
