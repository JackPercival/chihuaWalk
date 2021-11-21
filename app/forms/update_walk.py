from flask_wtf import FlaskForm
from wtforms import DateField
from wtforms.validators import DataRequired


class UpdatedWalk(FlaskForm):
    walk_date = DateField('walk_date', validators=[DataRequired()])
