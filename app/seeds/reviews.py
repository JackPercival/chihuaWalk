from app.models import db, Review
import datetime
import random

# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(user_id=1, dog_id=1, comment="I had such a blast with Arlo. He is soooo cute and such a good boy. I hope someone adopts him soon!", date=datetime.datetime.now().date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review2 = Review(user_id=1, dog_id=2, comment="I had such a blast with Eview. She is soooo cute and such a good girl. I hope someone adopts her soon!", date=(datetime.datetime.now() - datetime.timedelta(days = 5)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review3 = Review(user_id=1, dog_id=3, comment="I had such a blast with Spot. He is soooo cute and such a good boy. I hope someone adopts him soon!", date=(datetime.datetime.now() - datetime.timedelta(days = 10)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review4 = Review(user_id=2, dog_id=1, comment="This pupper is sooooo much fun to walk! I will definitely be scheduling a walk with this dog another time soon.", date=(datetime.datetime.now() - datetime.timedelta(days = 9)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review5 = Review(user_id=2, dog_id=2, comment="This pupper is sooooo much fun to walk! I will definitely be scheduling a walk with this dog another time soon.", date=(datetime.datetime.now() - datetime.timedelta(days = 1)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review6 = Review(user_id=2, dog_id=3, comment="This pupper is sooooo much fun to walk! I will definitely be scheduling a walk with this dog another time soon.", date=(datetime.datetime.now() - datetime.timedelta(days = 2)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review7 = Review(user_id=3, dog_id=1, comment="Cannot wait to take this pupper on another walk. When they get adopted, I'll definitely be sad I can't walk them anymore, but I'll be so happy for this cute dog to have a forever home", date=(datetime.datetime.now() - datetime.timedelta(days = 4)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review8 = Review(user_id=3, dog_id=2, comment="Cannot wait to take this pupper on another walk. When they get adopted, I'll definitely be sad I can't walk them anymore, but I'll be so happy for this cute dog to have a forever home", date=(datetime.datetime.now() - datetime.timedelta(days = 12)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))
    review9 = Review(user_id=3, dog_id=3, comment="Cannot wait to take this pupper on another walk. When they get adopted, I'll definitely be sad I can't walk them anymore, but I'll be so happy for this cute dog to have a forever home", date=(datetime.datetime.now() - datetime.timedelta(days = 20)).date(), behavior=random.randint(1,5), kindness=random.randint(1,5), quietness=random.randint(1,5), energy=random.randint(1,5))

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
