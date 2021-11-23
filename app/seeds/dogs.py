from app.models import db, Dog

# Dog seeders
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
    dog11 = Dog(user_id=4, name="Widget", breed="Akita", description="Widget can walk all day. Can you keep up?", weight=35, address="21950 Arnold Center Road", city="Carson", state="CA", country="USA", latitude=33.8272706, longitude=-118.2302826)
    dog12 = Dog(user_id=5, name="Spud", breed="Beagle", description="Spud is known for his long naps. But when he's awake he's quite the chatterbox.", weight=27, address="145 Grau Drive", city="Fremont", state="CA", country="USA", latitude=7.582453, longitude=-121.994476)
    dog13 = Dog(user_id=6, name="Charlie", breed="Chihuahua", description="If you want a cuddle buddy, who sometimes will go for a walk, Charlie is your man.", weight=9, address="3959 Fairlands Driv", city="Pleasanton", state="CA", country="USA", latitude=37.6992001, longitude=-121.8703701)
    dog14 = Dog(user_id=7, name="Preston", breed="Vizsla", description="Preston actually caught a car one time. And as the saying goes, he had no idea what to do next", weight=85, address="19590 East Batavia Drive", city="Aurora", state="CO", country="USA", latitude=39.7420886, longitude=-104.7581149)
    dog15 = Dog(user_id=8, name="Sully", breed="Pomeranian", description="Sully's favorite movie is Monsters Inc. If you let him, he will watch it all day (after he goes for a walk, of course!)", weight=13, address="6424 Simms Street", city="Arvada", state="CO", country="USA", latitude=39.8133443, longitude=-105.1283237)
    dog16 = Dog(user_id=9, name="Nala", breed="Pug", description="Nala just wants someone to love her as much as she loves walks.", weight=0, address="9036 Calico Court", city="Hesperia", state="CA", country="USA", latitude=34.414491, longitude=-117.375403)
    dog17 = Dog(user_id=10, name="Benji", breed="Great Dane", description="If you like big dogs, Benji is the one for you", weight=180, address="90 Via Verde", city="San Lorenzo", state="CA", country="USA", latitude=37.67869, longitude=-122.117142)
    dog18 = Dog(user_id=1, name="Neslon", breed="Labrador", description="Nelson will get you in shape. His walks are really more like brisk jogs.", weight=70, address="6231 North 59th Avenue", city="Glendale", state="AZ", country="USA", latitude=33.5285304, longitude=-112.1860744)
    dog19 = Dog(user_id=2, name="Leo", breed="Jack Russell", description="Walking and eating are this pups' pastime", weight=32, address="553 South Arlington Road", city="Orange", state="CA", country="USA", latitude=33.7794839, longitude=-117.820383)
    dog20 = Dog(user_id=3, name="Maverick", breed="Golden Retrieve", description="His buddies all call him Mav. If you walk him enough times, he might let you call him Mav too!", weight=63, address="457 Mountain Village Boulevard", city="Mountain Village", state="CO", country="USA", latitude=37.93323040000001, longitude=-107.8515732)


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
    db.session.add(dog11)
    db.session.add(dog12)
    db.session.add(dog13)
    db.session.add(dog14)
    db.session.add(dog15)
    db.session.add(dog16)
    db.session.add(dog17)
    db.session.add(dog18)
    db.session.add(dog19)
    db.session.add(dog20)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_dogs():
    db.session.execute('TRUNCATE dogs RESTART IDENTITY CASCADE;')
    db.session.commit()
