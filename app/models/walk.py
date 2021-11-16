from .db import db


class Walk(db.Model):
    __tablename__ = 'walks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey("dog.id"), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="walk")
    dog = db.relationship("Dog", back_populates="walk")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.spotId,
            'dog_id': self.userId,
            'date': self.date,
        }
