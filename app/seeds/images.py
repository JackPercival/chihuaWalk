from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(dog_id=1, url='https://images.dog.ceo/breeds/akita/512px-Ainu-Dog.jpg')
    image2 = Image(dog_id=1, url='https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg')
    image3 = Image(dog_id=1, url='https://images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg')

    image4 = Image(dog_id=2, url='https://images.dog.ceo/breeds/beagle/1271553739_Milo.jpg')
    image5 = Image(dog_id=2, url='https://images.dog.ceo/breeds/beagle/1374053345_Milo.jpg')
    image6 = Image(dog_id=2, url='https://images.dog.ceo/breeds/beagle/166407056_Milo.jpg')

    image8 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/n02085620_10074.jpg')
    image9 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/n02085620_10131.jpg')
    image7 = Image(dog_id=3, url='https://images.dog.ceo/breeds/chihuahua/marto.jpg')

    image10 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10249.jpg')
    image11 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10358.jpg')
    image12 = Image(dog_id=4, url='https://images.dog.ceo/breeds/vizsla/n02100583_10367.jpg')

    image14 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10158.jpg')
    image13 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10129.jpg')
    image15 = Image(dog_id=5, url='https://images.dog.ceo/breeds/pomeranian/n02112018_10243.jpg')

    image16 = Image(dog_id=6, url='https://images.dog.ceo/breeds/pug/IMG_0226.jpg')
    image17 = Image(dog_id=6, url='https://images.dog.ceo/breeds/pug/DSCF7495-2.jpg')
    image18 = Image(dog_id=6, url='https://images.dog.ceo/breeds/pug/IMG_0233.jpg')

    image19 = Image(dog_id=7, url='https://images.dog.ceo/breeds/dane-great/dane-2.jpg')
    image20 = Image(dog_id=7, url='https://images.dog.ceo/breeds/dane-great/dane-4.jpg')
    image21 = Image(dog_id=7, url='https://images.dog.ceo/breeds/dane-great/dane-1.jpg')

    image22 = Image(dog_id=8, url='https://images.dog.ceo/breeds/terrier-russell/iguet3.jpeg')
    image23 = Image(dog_id=8, url='https://images.dog.ceo/breeds/terrier-russell/iguet2.jpeg')
    image24 = Image(dog_id=8, url='https://images.dog.ceo/breeds/terrier-russell/iguet4.jpeg')

    image25 = Image(dog_id=9, url='https://images.dog.ceo/breeds/labrador/IMG_2752.jpg')
    image26 = Image(dog_id=9, url='https://images.dog.ceo/breeds/labrador/IMG_4708.jpg')
    image27 = Image(dog_id=9, url='https://images.dog.ceo/breeds/labrador/IMG_4709.jpg')

    image28 = Image(dog_id=10, url='https://images.dog.ceo/breeds/retriever-golden/20200731_180910_200731.jpg')
    image29 = Image(dog_id=10, url='https://images.dog.ceo/breeds/retriever-golden/20200801_174527_200801.jpg')
    image30 = Image(dog_id=10, url='https://images.dog.ceo/breeds/retriever-golden/20200814_113907_200814.jpg')

    image31 = Image(dog_id=11, url='https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg')
    image32 = Image(dog_id=11, url='https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg')
    image33 = Image(dog_id=11, url='https://images.dog.ceo/breeds/akita/Japaneseakita.jpg')

    image34 = Image(dog_id=12, url='https://images.dog.ceo/breeds/beagle/n02088364_11130.jpg')
    image35 = Image(dog_id=12, url='https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg')
    image36 = Image(dog_id=12, url='https://images.dog.ceo/breeds/beagle/n02088364_11231.jpg')

    image37 = Image(dog_id=13, url='https://images.dog.ceo/breeds/chihuahua/n02085620_242.jpg')
    image38 = Image(dog_id=13, url='https://images.dog.ceo/breeds/chihuahua/n02085620_2479.jpg')
    image39 = Image(dog_id=13, url='https://images.dog.ceo/breeds/chihuahua/n02085620_2614.jpg')

    image40 = Image(dog_id=14, url='https://images.dog.ceo/breeds/vizsla/n02100583_10433.jpg')
    image41 = Image(dog_id=14, url='https://images.dog.ceo/breeds/vizsla/n02100583_10698.jpg')
    image42 = Image(dog_id=14, url='https://images.dog.ceo/breeds/vizsla/n02100583_10721.jpg')

    image43 = Image(dog_id=15, url='https://images.dog.ceo/breeds/pomeranian/n02112018_11071.jpg')
    image44 = Image(dog_id=15, url='https://images.dog.ceo/breeds/pomeranian/n02112018_1146.jpg')
    image45 = Image(dog_id=15, url='https://images.dog.ceo/breeds/pomeranian/n02112018_1158.jpg')

    image46 = Image(dog_id=16, url='https://images.dog.ceo/breeds/pug/c677d2fa5324.jpg')
    image47 = Image(dog_id=16, url='https://images.dog.ceo/breeds/pug/lupita.jpg')
    image48 = Image(dog_id=16, url='https://images.dog.ceo/breeds/pug/lupita_and_cats.jpg')

    image49 = Image(dog_id=17, url='https://images.dog.ceo/breeds/dane-great/n02109047_10160.jpg')
    image50 = Image(dog_id=17, url='https://images.dog.ceo/breeds/dane-great/n02109047_10414.jpg')
    image51 = Image(dog_id=17, url='https://images.dog.ceo/breeds/dane-great/n02109047_11178.jpg')

    image52 = Image(dog_id=18, url='https://images.dog.ceo/breeds/labrador/n02099712_1828.jpg')
    image53 = Image(dog_id=18, url='https://images.dog.ceo/breeds/labrador/n02099712_1866.jpg')
    image54 = Image(dog_id=18, url='https://images.dog.ceo/breeds/labrador/n02099712_209.jpg')

    image55 = Image(dog_id=19, url='https://images.dog.ceo/breeds/terrier-russell/iguet5.jpeg')
    image56 = Image(dog_id=19, url='https://images.dog.ceo/breeds/terrier-russell/jack1.jpg')
    image57 = Image(dog_id=19, url='https://images.dog.ceo/breeds/terrier-russell/jack2.jpg')

    image58 = Image(dog_id=20, url='https://images.dog.ceo/breeds/retriever-golden/n02099601_1324.jpg')
    image59 = Image(dog_id=20, url='https://images.dog.ceo/breeds/retriever-golden/n02099601_1249.jpg')
    image60 = Image(dog_id=20, url='https://images.dog.ceo/breeds/retriever-golden/n02099601_118.jpg')

    # for j in range (4,9):
    #     for i in range(1,4):
    #         db.session.add(Image(dog_id=j, url='https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6'))

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image7)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image14)
    db.session.add(image13)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)
    db.session.add(image30)
    db.session.add(image31)
    db.session.add(image32)
    db.session.add(image33)
    db.session.add(image34)
    db.session.add(image35)
    db.session.add(image36)
    db.session.add(image37)
    db.session.add(image38)
    db.session.add(image39)
    db.session.add(image40)
    db.session.add(image41)
    db.session.add(image42)
    db.session.add(image43)
    db.session.add(image44)
    db.session.add(image45)
    db.session.add(image46)
    db.session.add(image47)
    db.session.add(image48)
    db.session.add(image49)
    db.session.add(image50)
    db.session.add(image51)
    db.session.add(image52)
    db.session.add(image53)
    db.session.add(image54)
    db.session.add(image55)
    db.session.add(image56)
    db.session.add(image57)
    db.session.add(image58)
    db.session.add(image59)
    db.session.add(image60)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
