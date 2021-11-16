from .db import db


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    breed = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    user = db.relationship("User", back_populates="dog")
    images = db.relationship("Image", back_populates="dog", cascade="all, delete")
    review = db.relationship("Review", back_populates="dog", cascade="all, delete")
    walk = db.relationship("Walk", back_populates="dog", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'weight': self.weight,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'user': self.user.owner_info(),
            'images': [image.image_info() for image in self.images],
        }
