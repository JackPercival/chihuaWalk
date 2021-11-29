import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { useSearch } from '../context/SearchContext';
import { getGeoCoordinates } from '../../store/map';
import { loadAllDogs, updatedExistingDog } from '../../store/dog';

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
        setImage1(dog?.images[0])
        setImage2(dog?.images[1])
        setImage3(dog?.images[2])
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

    const validateURL = (imageArray) => {
        let validImageUrl = true;
        const regex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        for (let i = 0; i < imageArray.length; i++) {
            if (regex.test(imageArray[i]) === false) {
                validImageUrl = false;
                break;
            }
        }

        return validImageUrl
    }

    const updateDog = async (e) => {
        e.preventDefault();

        if (!image1 || !image2 || !image3 ) {
            setDogErrorId('dogError')
            setDogErrorMessage("Please fill out all fields.")
            return;
        }

        const validImages = validateURL([image1, image2, image3])
        if (!validImages) {
            setDogErrorId('dogError')
            setDogErrorMessage("Please add valid Image URLs.")
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
                // return <Redirect to={`/dogs/${data.id}`} />
                history.push(`/dogs/${data[1].id}`)
            }
        } else {
            setAddressErrorId("addressError")
            setAddressErrorBackground("classYesAddressError")
            return;
        }
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

  return (
      <>
      {isLoaded && (
        <div className="puploadContainer">
            <h1 id="editYourPup">{`Edit ${dog?.name}`}</h1>
                <div className="puploadFormsContainer">
                    <div >
                        <form className="puploadForm" autoComplete="off" onSubmit={updateDog}>
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
                                    <div className="pupLoadField">
                                        <label>Images (URL)</label>
                                        <input
                                            name='breed'
                                            type="input"
                                            required
                                            autoComplete="off"
                                            value={image1}
                                            onChange={(e) => setImage1(e.target.value)}
                                        />
                                    </div>
                                    <div className="pupLoadField">
                                        <input
                                            name='breed'
                                            type="input"
                                            required
                                            autoComplete="off"
                                            value={image2}
                                            onChange={(e) => setImage2(e.target.value)}
                                        />
                                    </div>
                                    <div className="pupLoadField">
                                        <input
                                            name='breed'
                                            type="input"
                                            required
                                            autoComplete="off"
                                            value={image3}
                                            onChange={(e) => setImage3(e.target.value)}
                                        />
                                    </div>
                                    <div className="addDogError" id={dogErrorId}>
                                        <div>!</div>
                                        <span>{dogErrorMessage}</span>
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
                                    <img className="dogHoldingLeash" src={dog?.images[0]} alt="Dog Holding Leash" onError={(e)=>{e.target.onerror = null; e.target.src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png"}}/>
                                </div>
                            </div>
                            <div className="puploadButtons">
                                <button type="submit">Edit Dog</button>
                                <button className="formButton" id="clearPuploadForm" onClick={cancelEdit}>Cancel Edit</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
      )}
      </>
  );
}

export default EditDog;
