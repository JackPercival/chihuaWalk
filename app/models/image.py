from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    dog_id = db.Column(db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    url = db.Column(db.Text, nullable=False)

    dog = db.relationship("Dog", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'dog_id': self.dog_id,
            'url': self.url
        }

    def image_info(self):
        return self.url
