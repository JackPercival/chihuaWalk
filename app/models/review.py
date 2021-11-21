from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False, unique=False)
    behavior = db.Column(db.Integer, nullable=False)
    kindness = db.Column(db.Integer, nullable=False)
    quietness = db.Column(db.Integer, nullable=False)
    energy = db.Column(db.Integer, nullable=False)
    avgRating = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='review')
    dog = db.relationship('Dog', back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'dog_id': self.dog_id,
            'comment': self.comment,
            'date': self.date,
            'behavior': self.behavior,
            'kindness': self.kindness,
            'quietness': self.quietness,
            'energy': self.energy,
            'avgRating': self.avgRating,
            'user': self.user.owner_info(),
        }
