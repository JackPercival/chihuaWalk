import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { useSearch } from '../context/SearchContext';
import { getGeoCoordinates } from '../../store/map';
import { loadAllDogs, updatedExistingDog, uploadFile } from '../../store/dog';
import ImageUploading from 'react-images-uploading';

import './editDog.css'

const EditDog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { dogId } = useParams();

    const dog = useSelector(state => state.dogs[dogId]);
    const user = useSelector(state => state.session.user);
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setSetWeight] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [addressErrorId, setAddressErrorId] = useState("noAddressError")
    const [addressErrorBackground, setAddressErrorBackground] = useState('classNoAddressError')
    const [dogErrorId, setDogErrorId] = useState("noDogError")
    const [dogErrorMessage, setDogErrorMessage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [images, setImages] = useState('')

    useEffect(() => {
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoaded) {
            document.title = `Edit ${dog?.name} · ChihuaWalk`;
        }
    }, [isLoaded, dog?.name]);

    useEffect(() => {
        setName(dog?.name)
        setBreed(dog?.breed)
        setDescription(dog?.description)
        setSetWeight(dog?.weight)
        setAddress(dog?.address)
        setCity(dog?.city)
        setState(dog?.state)

        let images = dog?.images.map(image => {
            return {'data_url': image}
        })

        setImages(images)
    }, [dog])

    //Redirect if the dog does not belong to the logged in user
    useEffect(() => {
        if (isLoaded && !dog?.name) {
            history.push('/')
        }

        if (isLoaded && dog?.user_id !== user.id) {
            history.push('/')
        }
    }, [isLoaded, dog, history, user.id])

    //Get the longitude/latitude coordinates of the address by calling a google API
    const getCoordinates = async (address) => {
        const data = await dispatch(getGeoCoordinates(address))
        return data;
    }

    const updateDog = async (e) => {
        e.preventDefault();
        setDogErrorId("noDogError")
        setDogErrorMessage('')
        setAddressErrorId("noAddressError")
        setAddressErrorBackground("classNoAddressError")

        if (images.length < 3) {
            setDogErrorId('dogError')
            setDogErrorMessage("Please add a minumum of 3 images.")
            return;
        }

        const fullAddress = `${address.trim()}, ${city.trim()}, ${state}`

        const realAddress = await getCoordinates(fullAddress)

        if (realAddress.coordinates.length === 1 && realAddress.coordinates[0].geometry.location_type !== "APPROXIMATE") {
            const latitude = realAddress.coordinates[0].geometry.location.lat
            const longitude = realAddress.coordinates[0].geometry.location.lng
            const data = await dispatch(updatedExistingDog(Number(dogId), user?.id, name, breed, description, weight, address, city, state, "USA", latitude, longitude, image1, image2, image3));

            if (data[0] === "Error") {
                setDogErrorId("dogError")
                setDogErrorMessage("Please fill out all fields.")
                return;
            } else {
                await addImages(images, data[1].id)
                // history.push(`/dogs/${data[1].id}`)
            }
        } else {
            setAddressErrorId("addressError")
            setAddressErrorBackground("classYesAddressError")
            return;
        }
    }

    const addImages = async (images, dog_id) => {
        setShowModal(true)
        for (let x = 0; x < images.length; x++) {
            let image = images[x]

            let newFile = false
            let file;

            //If there is a file, this is a new/updated upload
            if (image.file) {
                newFile = true
                file = image.file
            } else {
                file = image.data_url
            }

            const obj = {
                file: file,
                dog_id: dog_id,
                newFile: newFile
            };

            console.log(obj)

            await dispatch(uploadFile(obj));
        }

        history.push(`/dogs/${dog_id}`)
        setShowModal(false)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        history.push(`/your-dogs`)
    }

    //Clean up search bar
    useEffect(() => {
        setShowSearch(false)
        setSearchCity('')
        setSearchState('')
        setSearchBreed('')
        setSearchMinWeight('')
        setSearchMaxWeight('')
    }, [setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight])

    //Clean up function
    useEffect(() => {
        return () => {
            setShowModal(false)
        }
    }, [])

  return (
      <>
      {isLoaded && (
        <div className="puploadContainer">
            <h1 id="editYourPup">{`Edit ${dog?.name}`}</h1>
                <div className="puploadFormsContainer">
                    <div >
                        <form className="puploadForm" autoComplete="off" onSubmit={updateDog}>
                            <div className="editPupForm">
                                <div className="formInputSection">
                                    <div className="fieldSection">
                                        <h3>{`${dog?.name}'s Information`}</h3>
                                        <div className="pupLoadField">
                                            <label>Name</label>
                                            <input
                                                name='name'
                                                type="input"
                                                maxLength="40"
                                                required
                                                autoComplete="off"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="pupLoadField">
                                            <label>Breed</label>
                                            <input
                                                name='breed'
                                                type="input"
                                                maxLength="40"
                                                required
                                                autoComplete="off"
                                                value={breed}
                                                onChange={(e) => setBreed(e.target.value)}
                                            />
                                        </div>
                                        <div className="pupLoadField">
                                            <label>Weight (lbs)</label>
                                            <input
                                                name='weight'
                                                type="number"
                                                required
                                                autoComplete="off"
                                                min="1"
                                                max="400"
                                                value={weight}
                                                onChange={(e) => setSetWeight(e.target.value)}
                                            />
                                        </div>
                                        <div className="pupLoadField">
                                            <label>Description</label>
                                            <textarea
                                                name='description'
                                                type="input"
                                                required
                                                autoComplete="off"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="fieldSection">
                                        <h3>Shelter Information</h3>
                                        <div className="pupLoadField">
                                            <label>Street Address</label>
                                            <input
                                                className={addressErrorBackground}
                                                name='address'
                                                type="input"
                                                maxLength="255"
                                                required
                                                autoComplete="off"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="pupLoadField">
                                            <label>City</label>
                                            <input
                                                className={addressErrorBackground}
                                                name='city'
                                                type="input"
                                                required
                                                maxLength="50"
                                                autoComplete="off"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="pupLoadField" id="stateSelector">
                                            <label>State</label>
                                            <select value={state} onChange={(e) => setState(e.target.value)} className={addressErrorBackground}>
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                        <div className="addDogError" id={addressErrorId}>
                                            <div>!</div>
                                            <span>Invalid address.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="formInputSection" id="imageUploadSection">
                                    <div className="fieldSection">
                                        <h3 className="imagesHeader">Images</h3>
                                        <div className="imageUploadContainer">
                                            <ImageUploading
                                                multiple
                                                value={images}
                                                onChange={(imageList) => setImages(imageList)}
                                                maxNumber={20}
                                                dataURLKey="data_url"
                                                acceptType={['jpg','png', 'jpeg']}>
                                                {({
                                                imageList,
                                                onImageUpload,
                                                onImageRemoveAll,
                                                onImageUpdate,
                                                onImageRemove,
                                                isDragging,
                                                dragProps,
                                                }) => (
                                                <div className="upload__image-wrapper">
                                                    <div
                                                        style={isDragging ? { color: 'rgb(192, 53, 22)' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        className="clickDragHere"
                                                    >
                                                    Add or Drag Images Here
                                                    </div>
                                                    {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
                                                    <div className="uploadedImagesContainer">
                                                        {imageList.map((image, index) => (
                                                        <div key={index}>
                                                            <img src={image['data_url']} alt="" height="230" />
                                                            <div className="editPhotoButtons">
                                                                <div className="updatePhoto" onClick={() => onImageUpdate(index)}>Update</div>
                                                                <div className="updatePhoto removePhoto" onClick={() => onImageRemove(index)}>Remove</div>
                                                            </div>
                                                        </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                )}
                                            </ImageUploading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="puploadButtons">
                                <button type="submit">Edit Dog</button>
                                <button className="formButton" id="clearPuploadForm" onClick={cancelEdit}>Cancel Edit</button>
                            </div>
                            <div className="addDogError" id={dogErrorId}>
                                <div>!</div>
                                <span>{dogErrorMessage}</span>
                            </div>
                        </form>
                    </div>
            </div>
            {showModal && (
                <div className="loginModal">
                    <div>
                        <img className="fetchGif" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637790962/Capstone/loadingGif_hgflu6.gif" alt="fetching gif"/>
                    </div>
                </div>
            )}
        </div>
      )}
      </>
  );
}

export default EditDog;
