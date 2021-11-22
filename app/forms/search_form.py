from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class SearchForm(FlaskForm):
    city = StringField("city")
    state = StringField("state")
    breed = StringField("breed")
    min_weight = IntegerField("min_weight")
    max_weight = IntegerField("max_weight")
