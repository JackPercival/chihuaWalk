from app.models import db, Review
import datetime
import random

# Adds reviews
def seed_reviews():
    reviewComments = ["I had such a blast with this dog. They are soooo cute and such a good pup. I hope someone adopts them soon!",
                        "This pupper is sooooo much fun to walk! I will definitely be scheduling a walk with this dog another time soon.",
                        "Cannot wait to take this pupper on another walk. When they get adopted, I'll definitely be sad I can't walk them anymore, but I'll be so happy for this cute dog to have a forever home",
                        "This dog walks so well and is so kind and gentle. Please someone adopt this dog. I would but I already have 5 dogs.",
                        "The people at this shelter treat this dog so nice. Everytime I show up to walk them, I'm greeted with so many friendly greetings. The dog is great too!",
                        "5 out of 5 would walk again any day.",
                        "I went on a nice 3 hour hike with this dog and they kept up the entire time!",
                        "I wish I could rate this dog higher than 5 stars. I'd rate them an 13 out of 10 if I could",
                        "This dog even conviced my cat loving friend to try out this website and walk dogs"
                        ]

    for j in range (1, 21):
        for i in range (2,11):
            reviewDays = random.randint(0,500)
            db.session.add(Review(user_id=i, dog_id=j, comment=reviewComments[i - 2], date=(datetime.datetime.now() - datetime.timedelta(days = reviewDays)).date(), behavior=random.randint(3,5), kindness=random.randint(3,5), quietness=random.randint(3,5), energy=random.randint(3,5)))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
