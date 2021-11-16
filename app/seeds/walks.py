from app.models import db, Walk
import datetime

# Adds a demo user, you can add other users here if you want
def seed_walks():
    walk1 = Walk(user_id=1, dog_id=1, date=(datetime.datetime.now() - datetime.timedelta(days = 10)).date())
    walk2 = Walk(user_id=1, dog_id=2, date=datetime.datetime.now().date())
    walk3 = Walk(user_id=1, dog_id=3, date=(datetime.datetime.now() + datetime.timedelta(days = 10)).date())

    walk4 = Walk(user_id=2, dog_id=1, date=(datetime.datetime.now() - datetime.timedelta(days = 5)).date())
    walk5 = Walk(user_id=2, dog_id=2, date=(datetime.datetime.now() + datetime.timedelta(days = 3)).date())
    walk6 = Walk(user_id=3, dog_id=3, date=(datetime.datetime.now() + datetime.timedelta(days = 5)).date())

    walk7 = Walk(user_id=3, dog_id=1, date=(datetime.datetime.now() + datetime.timedelta(days = 7)).date())
    walk8 = Walk(user_id=3, dog_id=2, date=(datetime.datetime.now() - datetime.timedelta(days = 3)).date())
    walk9 = Walk(user_id=3, dog_id=3, date=(datetime.datetime.now() + datetime.timedelta(days = 2)).date())

    db.session.add(walk1)
    db.session.add(walk2)
    db.session.add(walk3)
    db.session.add(walk4)
    db.session.add(walk5)
    db.session.add(walk6)
    db.session.add(walk7)
    db.session.add(walk8)
    db.session.add(walk9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_walks():
    db.session.execute('TRUNCATE walks RESTART IDENTITY CASCADE;')
    db.session.commit()
