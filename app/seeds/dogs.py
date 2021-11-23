from app.models import db, Dog
import random


# Adds a demo user, you can add other users here if you want
def seed_dogs():
    dog1 = Dog(user_id=1, name="Casper", breed="Akita", description="Small and cute and loves to snuggle. Would make a wonderful walking buddy.", weight=25, address="560 Penstock Drive", city="Grass Valley", state="CA", country="USA", latitude=39.213076, longitude=-121.077583)
    dog2 = Dog(user_id=2, name="Kirby", breed="Beagle", description="Who doesn't want a cute lil beagle to walk. Kirby is such a sweatheart and will make someone very happy soon.", weight=28, address="637 Britannia Drive", city="Vallejo", state="CA", country="USA", latitude=38.10476999999999, longitude=-122.193849)
    dog3 = Dog(user_id=3, name="Maple", breed="Chihuahua", description="Such a little pup, with a big heart!", weight=8, address="5601 West Crocus Drive", city="Glendale", state="AZ", country="USA", latitude=33.6152469, longitude=-112.179737)
    dog4 = Dog(user_id=4, name="Newton", breed="Vizsla", description="Newton loves long, romantic walks on the beach. Or on a sidewalk. Or anywhere. Newton just loves walks.", weight=80, address="22572 Toreador Drive", city="Salinas", state="CA", country="USA", latitude=36.602449, longitude=-121.699071)
    dog5 = Dog(user_id=5, name="Chester", breed="Pomeranian", description="So fluffy and cute. Chester is a bit of a diva but is great on a leash", weight=14, address="49548 Road 200", city="O'Neals", state="CA", country="USA", latitude=37.153463, longitude=-119.648192)
    dog6 = Dog(user_id=6, name="Rudy", breed="Pug", description="Pugs are cute, and Rudy is no exception. Just one walk and you will fall in love", weight=19, address="20930 Todd Valley Road", city="Foresthill", state="CA", country="USA", latitude=38.989466, longitude=-120.883108)
    dog7 = Dog(user_id=7, name="Fitz", breed="Great Dane", description="Fitz really is a great dog (it's in the name). He needs someone with excellent handling skills, but is an awesome companion", weight=130, address="125 John Street", city="Santa Cruz", state="CA", country="USA", latitude=36.950901, longitude=-122.046881)
    dog8 = Dog(user_id=8, name="Sasha", breed="Jack Russell", description="Sasha is a one of a kind dog who will love you unconditionally.", weight=30, address="31353 Santa Elena Way", city="Union City", state="CA", country="USA", latitude=37.593981, longitude=-122.059762)
    dog9 = Dog(user_id=9, name="Tucker", breed="Labrador", description="Tucker loves playing tennis - actually just loves chasing the balls on the court. If you like tennis, Tucker already loves you.", weight=60, address="10826 Pointe Royal Drive", city="Bakersfield", state="CA", country="USA", latitude=35.2930007, longitude=-119.1225908)
    dog10 = Dog(user_id=10, name="Simba", breed="Golden Retriever", description="Watch Simba's glorious hair blow through the air as you take him on a walk", weight=70, address="19416 Barclay Road", city="Castro Valley", state="CA", country="USA", latitude=37.70382, longitude=-122.091054)


    db.session.add(dog1)
    db.session.add(dog2)
    db.session.add(dog3)
    db.session.add(dog4)
    db.session.add(dog5)
    db.session.add(dog6)
    db.session.add(dog7)
    db.session.add(dog8)
    db.session.add(dog9)
    db.session.add(dog10)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
