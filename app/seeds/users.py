from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', password='password')
    jack = User(
        first_name='Jack', last_name='Percival', email='jack@jack.com', password='password', profile_pic='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634168909/soccr/WhiteCrestTN_oizp1h.jpg')
    julia = User(
        first_name='Julia', last_name='Rose', email='julia@julia.com', password='password')

    db.session.add(demo)
    db.session.add(jack)
    db.session.add(julia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
