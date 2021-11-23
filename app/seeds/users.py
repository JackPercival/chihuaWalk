from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name='User', email='demo@aa.io', password='password', profile_pic='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637106867/Capstone/arlo_cermdd.png')
    jack = User(first_name='Jack', last_name='Percival', email='jack@jack.com', password='password', profile_pic='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634168909/soccr/WhiteCrestTN_oizp1h.jpg')
    julia = User(first_name='Julia', last_name='Rose', email='julia@julia.com', password='password')
    brad = User(first_name='Brad', last_name='Simpson', email='brad@brad.com', password='@#$%^&lkgsh', profile_pic="https://avatars.githubusercontent.com/u/59807764?v=4?s=400")
    cesar = User(first_name='Cesar', last_name='Milan', email='cesarmilan@gmail.com', password='$%^&*kfajggfasd', profile_pic="https://www.cesarsway.com/wp-content/uploads/2019/02/IMG_0442.jpg")
    dimitri =  User(first_name='Dimitri', last_name='Ingram', email='dimitri@dimitri.com', password='dimitri')
    max = User(first_name='Max', last_name='Weinberg', email='max@max.com', password='max')
    ash = User(first_name='Ash', last_name='Khayami', email='ash@ash.com', password='ash')
    david = User(first_name='David', last_name='Colemand', email='dave@dave.com', password='save', profile_pic="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637641164/Capstone/newF_ilyv4j.png")
    kevin = User(first_name='Kevin', last_name='Torres', email='kevin@kevin.com', password='kevin')

    db.session.add(demo)
    db.session.add(jack)
    db.session.add(julia)
    db.session.add(brad)
    db.session.add(cesar)
    db.session.add(dimitri)
    db.session.add(max)
    db.session.add(ash)
    db.session.add(david)
    db.session.add(kevin)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
