from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(dog_id=1, url='https://images.dog.ceo/breeds/akita\/512px-Ainu-Dog.jpg')
    image2 = Image(dog_id=1, url='https://images.dog.ceo/breeds/akita\/512px-Akita_inu.jpeg')
    image3 = Image(dog_id=1, url='images.dog.ceo/breeds/akita/Akina_Inu_in_Riga_1.jpg')

    image4 = Image(dog_id=2, url='images.dog.ceo/breeds/beagle/1271553739_Milo.jpg')
    image5 = Image(dog_id=2, url='images.dog.ceo/breeds/beagle/1374053345_Milo.jpg')
    image6 = Image(dog_id=2, url='images.dog.ceo/breeds/beagle/166407056_Milo.jpg')

    image7 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/marto.jpg')
    image8 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/n02085620_10074.jpg')
    image9 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/n02085620_10131.jpg')

    image10 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10249.jpg')
    image11 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10358.jpg')
    image12 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10367.jpg')

    image13 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10129.jpg')
    image14 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10158.jpg')
    image15 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10158.jpg')

    # for j in range (4,9):
    #     for i in range(1,4):
    #         db.session.add(Image(dog_id=j, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6'))

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
