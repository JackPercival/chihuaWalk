import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSearch } from '../context/SearchContext';
import { addNewDog, uploadFile } from '../../store/dog';
import { getGeoCoordinates } from '../../store/map';
import ImageUploading from 'react-images-uploading';

import './pupload.css'

const Pupload = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setSetWeight] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [addressErrorId, setAddressErrorId] = useState("noAddressError")
    const [addressErrorBackground, setAddressErrorBackground] = useState('classNoAddressError')
    const [dogErrorId, setDogErrorId] = useState("noDogError")
    const [dogErrorMessage, setDogErrorMessage] = useState('')
    const [showModal, setShowModal]= useState(false)

    const [images, setImages] = useState('')

    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    useEffect(() => {
        document.title = `Pupload · ChihuaWalk`;
    }, []);

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

    //Get the longitude/latitude coordinates of the address by calling a google API
    const getCoordinates = async (address) => {
        const data = await dispatch(getGeoCoordinates(address))
        return data;
    }

    const addDog = async (e) => {
        e.preventDefault()

        if (images.length < 3) {
            setDogErrorId('dogError')
            setDogErrorMessage("Please add a minumum of 3 images.")
            return;
        }

        let cleanImages = images.map(image => image.file)

        //Check for duplicate images
        // let duplicateImages = checkDuplicateImages(cleanImages)
        // if (duplicateImages) {
        //     setDogErrorId('dogError')
        //     setDogErrorMessage("Please remove duplicate images.")
        //     return;
        // }

        const fullAddress = `${address.trim()}, ${city.trim()}, ${state}`

        const realAddress = await getCoordinates(fullAddress)


        if (realAddress.coordinates.length === 1 && realAddress.coordinates[0].geometry.location_type !== "APPROXIMATE") {
            const latitude = realAddress.coordinates[0].geometry.location.lat
            const longitude = realAddress.coordinates[0].geometry.location.lng
            const data = await dispatch(addNewDog(user?.id, name, breed, description, weight, address, city, state, "USA", latitude, longitude));

            if (data[0] === "Error") {
                setDogErrorId("dogError")
                setDogErrorMessage("Please fill out all fields.")
                return;
            } else {
                // return <Redirect to={`/dogs/${data.id}`} />
                await addImages(cleanImages, data[1].id)
                // history.push(`/dogs/${data[1].id}`)
            }
        } else {
            setAddressErrorId("addressError")
            setAddressErrorBackground("classYesAddressError")
            setDogErrorMessage("Invalid Address")
            setDogErrorId("dogError")
            return;
        }
    }

    const addImages = async (images, dog_id) => {
        setShowModal(true)
        for (let x = 0; x < images.length; x++) {
            const obj = {
                file: images[x],
                dog_id: dog_id,
                newFile: true
              };

              await dispatch(uploadFile(obj));
        }

        history.push(`/dogs/${dog_id}`)
        setShowModal(false)
    }

    const clearForm = (e) => {
        e.preventDefault();
        setName('')
        setBreed('')
        setDescription('')
        setSetWeight('')
        setAddress('')
        setCity('')
        setState('')
        setImages('')
        setAddressErrorId('noAddressError')
        setAddressErrorBackground('classNoAddressError')
        setDogErrorId('noDogError')
        setDogErrorMessage('')
    }

    // const checkDuplicateImages = images => {
    //     let map = {}

    //     for (let x = 0; x < images.length; x++) {
    //         let image = images[x]

    //         let stringTime = String(image.lastModified);
    //         let name = image.name
    //         let size = image.size
    //         let duplicateString = stringTime + name + size

    //         if (map[duplicateString]) {
    //             return true
    //         } else {
    //             map[duplicateString] = 1;
    //         }
    //     }

    //     return false;
    // }

  return (
    <div className="puploadContainer">
        <h1>Post a Pup</h1>
        <div className="formAndIntro">
            <h2>Fill out the form to add a shelter dog to ChihuaWalk. Dogs on ChihuaWalk have higher visibility to the public and are more likely to get adopted. Walking with people improves dog behavior, uses up their energy, and shows people what a dog in an animal rescue can be like beyond the shelter walls. Not to mention, dogs love being outside and walking!</h2>
            <div className="puploadFormsContainer">
                <div >
                    <form className="puploadForm" autoComplete="off" onSubmit={addDog}>
                        <div className="formInputSection">
                            <div className="fieldSection">
                                <h3>Dog Information</h3>
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
                        <div className="puploadButtons">
                            <button type="submit">Add Dog</button>
                            <button className="formButton" id="clearPuploadForm" onClick={clearForm}>Clear Form</button>
                        </div>
                        <div className="addDogError" id={dogErrorId}>
                            <div>!</div>
                            <span>{dogErrorMessage}</span>
                        </div>
                    </form>
                </div>
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
  );
}

export default Pupload;
