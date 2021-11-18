import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addNewDog } from '../../store/dog';
import { getKey } from '../../store/map';

import './pupload.css'

const Pupload = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const key = useSelector((state) => state.maps.key);
    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setSetWeight] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [addressErrorId, setAddressErrorId] = useState("noAddressError")
    const [dogErrorId, setDogErrorId] = useState("noDogError")

    useEffect(() => {
        if (!key) {
          dispatch(getKey());
        }
      }, [dispatch, key]);


    //Get the longitude/latitude coordinates of the address by calling a google API
    const getGeoCoordinates = async (address) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
        const data = await response.json();
        return data;
    }

    const addDog = async (e) => {
        e.preventDefault();

        if (!image1 || !image2 || !image3 ) {
            setDogErrorId('dogError')
            return;
        }

        const fullAddress = `${address.trim()}, ${city.trim()}, ${state.trim()} ${country.trim()}`
        const encodedAddress = encodeURI(fullAddress)

        const realAddress = await getGeoCoordinates(encodedAddress)
        console.log(realAddress)

        if (realAddress.status === "OK") {
            const latitude = realAddress.results[0].geometry.location.lat
            const longitude = realAddress.results[0].geometry.location.lng
            const data = await dispatch(addNewDog(user?.id, name, breed, description, weight, address, city, state, country, latitude, longitude, image1, image2, image3));

            if (data[0] === "Error") {
                setDogErrorId("dogError")
                return;
            } else {
                // return <Redirect to={`/dogs/${data.id}`} />
                history.push(`/dogs/${data[1].id}`)
            }
        } else {
            setAddressErrorId("addressError")
            return;
        }
    }

  return (
    <div className="puploadContainer">
        <h1>Post a Pup</h1>
        <h2>Fill out the form below to add a shelter dog to ChihuaWalk. Dogs on ChihuaWalk have higher visibility to the public and are more likely to get adopted. Walking with people improves dog behavior, uses up their energy, and shows people what a dog in an animal rescue can be like beyond the shelter walls. Not to mention, dogs love being outside and walking!</h2>
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
                                <span>Please fill out all fields.</span>
                            </div>
                        </div>
                        <div className="fieldSection">
                            <h3>Shelter Information</h3>
                            <div className="pupLoadField">
                                <label>Street Address</label>
                                <input
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
                                    name='city'
                                    type="input"
                                    required
                                    maxLength="50"
                                    autoComplete="off"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="pupLoadField">
                                <label>State</label>
                                <input
                                    name='state'
                                    type="input"
                                    required
                                    autoComplete="off"
                                    maxLength="50"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className="pupLoadField">
                                <label>Country</label>
                                <input
                                    name='password'
                                    type="input"
                                    required
                                    autoComplete="off"
                                    maxLength="50"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className="addDogError" id={addressErrorId}>
                                <div>!</div>
                                <span>Invalid address.</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button type="submit">Add Dog</button>
                        <button className="formButton">Clear Form</button>
                    </div>
                </form>
            </div>
            <img className="dogHoldingLeash" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637196506/Capstone/dogPosting_tzdtv1.png" alt="Dog Holding Leash" />
    </div>

    </div>
  );
}

export default Pupload;
