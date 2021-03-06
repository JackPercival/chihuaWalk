from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, DateTimeField
from wtforms.validators import DataRequired


class NewWalk(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    dog_id = IntegerField("dog_id", validators=[DataRequired()])
    walk_date = DateField('walk_date', validators=[DataRequired()])
