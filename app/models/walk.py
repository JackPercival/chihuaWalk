from .db import db
from sqlalchemy import UniqueConstraint

class Walk(db.Model):
    __tablename__ = 'walks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="walk")
    dog = db.relationship("Dog", back_populates="walk")

    __table_args__ = (UniqueConstraint('dog_id', 'date', name='dog_walk_date'),)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'dog_id': self.dog_id,
            'date': self.date,
        }
