from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired

class NewDogForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    breed = StringField("breed", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    weight = IntegerField("weight", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    latitude = DecimalField("latitude", validators=[DataRequired()])
    longitude = DecimalField("longitude", validators=[DataRequired()])
    image1 = StringField("image1", validators=[DataRequired()])
    image2 = StringField("image2", validators=[DataRequired()])
    image3 = StringField("image3", validators=[DataRequired()])
