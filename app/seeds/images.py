from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(dog_id=1, url='https://upload.wikimedia.org/wikipedia/commons/4/4c/Chihuahua1_bvdb.jpg')
    image2 = Image(dog_id=1, url='https://upload.wikimedia.org/wikipedia/commons/4/4c/Chihuahua1_bvdb.jpg')
    image3 = Image(dog_id=1, url='https://upload.wikimedia.org/wikipedia/commons/4/4c/Chihuahua1_bvdb.jpg')

    image4 = Image(dog_id=2, url='https://s36700.pcdn.co/wp-content/uploads/2018/09/black-and-tan-chiahuahua-600x400.jpg.optimal.jpg')
    image5 = Image(dog_id=2, url='https://s36700.pcdn.co/wp-content/uploads/2018/09/black-and-tan-chiahuahua-600x400.jpg.optimal.jpg')
    image6 = Image(dog_id=2, url='https://s36700.pcdn.co/wp-content/uploads/2018/09/black-and-tan-chiahuahua-600x400.jpg.optimal.jpg')

    image7 = Image(dog_id=3, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6')
    image8 = Image(dog_id=3, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6')
    image9 = Image(dog_id=3, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6')

    for j in range (4,9):
        for i in range(1,4):
            db.session.add(Image(dog_id=j, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6'))

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
