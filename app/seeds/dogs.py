from app.models import db, Dog
import random


# Adds a demo user, you can add other users here if you want
def seed_dogs():
    dog1 = Dog(user_id=2, name="Arlo", breed="Chihuaha", description="Small and cute and loves to snuggle", weight=8, address="5 Canyon Point", city="Newport Coast", state="CA", country="USA", latitude=33.600578, longitude=-117.851860)
    dog2 = Dog(user_id=3, name="Evie", breed="Chihuaha", description="Full of energy and loves to walk", weight=10, address="20402 Newport Coast Dr", city="Newport Coast", state="CA", country="USA", latitude=33.617450, longitude=-117.823870)

    dog3 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))
    dog4 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))
    dog5 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))
    dog6 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))
    dog7 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))
    dog8 = Dog(user_id=1, name="Spot", breed="Labrador", description="Loves people and being outside. Makes a great walking companion", weight=60, address="20302 Riverside Drive", city="Newport Beach", state="CA", country="USA", latitude=random.uniform(34.4, 41.9), longitude=random.uniform(-118, -111))


    db.session.add(dog1)
    db.session.add(dog2)
    db.session.add(dog3)
    db.session.add(dog4)
    db.session.add(dog5)
    db.session.add(dog6)
    db.session.add(dog7)
    db.session.add(dog8)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
