from app.models import db, Walk
import datetime
import random

# Adds walk data
def seed_walks():

    # Get random list of non-repeated numbers to avoid conflicting dates
    uniqueDates = random.sample(range(-500, 500), 200)
    loopCount = 0

    for j in range (1, 11):
        for i in range (1,21):
            walkDate = uniqueDates[loopCount]
            db.session.add(Walk(user_id=j, dog_id=i, date=(datetime.datetime.now() - datetime.timedelta(days = walkDate)).date()))
            loopCount += 1

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_walks():
    db.session.execute('TRUNCATE walks RESTART IDENTITY CASCADE;')
    db.session.commit()
