import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { addNewDog } from '../../store/dog';
import { getKey } from '../../store/map';

import './pupload.css'

const Pupload = () => {
    const dispatch = useDispatch();

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
    const [addressError, setAddressError] = useState('Invalid address.');

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

        // const fullAddress = `${address}, ${city}, ${state} ${country}`
        // const encodedAddress = encodeURI(fullAddress)

        // const realAddress = await getGeoCoordinates(encodedAddress)

        // if (realAddress.status === "OK") {
        //     const latitude = realAddress.results[0].geometry.location.lat
        //     const longitude = realAddress.results[0].geometry.location.lng
        //     const data = await dispatch(addNewDog(user?.id, name, breed, description, weight, address, city, state, country, latitude, longitude));
        // } else {
        //     setAddressError("Invalid address.")
        //     return;
        // }
        setAddressError("Invalid address.")
    }

  return (
    <div className="puploadContainer">
        <h1>Post a Pup</h1>
        <h2>Fill out the form below to add a shelter dog to the ChihuaWalk. Dogs on ChihuaWalk have higher visibility to the public and are more likely to get adopted. Walking with people improves dog behavior, uses up their energy, and shows people what a dog in an animal rescue can be like outside the shelter walls. Not to mention, dogs love being outside and walking!</h2>
        <div className="puploadFormsContainer">
            <div >
                <form className="puploadForm" autoComplete="off" onSubmit={addDog}>
                    <div className="formInputSection">
                        <div className="fieldSection">
                            <h3>Dog Information</h3>
                            <div className="pupLoadField">
                                <label>Name</label>
                                <input
                                    // className={borderError}
                                    name='name'
                                    type="input"
                                    required
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </div>
                            <div className="pupLoadField">
                                <label>Breed</label>
                                <input
                                    // className={borderError}
                                    name='breed'
                                    type="input"
                                    required
                                    autoComplete="off"
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                />
                            </div>
                            <div className="pupLoadField">
                                <label>Weight (lbs)</label>
                                <input
                                    // className={borderError}
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
                                    // className={borderError}
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
                                    // className={borderError}
                                    name='address'
                                    type="input"
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
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            {addressError.length > 0 && (
                                <div className="loginError" id="pupLoadError">
                                    <div>!</div>
                                <span>{addressError}</span>
                            </div>
                            )}
                        </div>

                    </div>
                    <div>
                        <button type="submit">Add Dog</button>
                        <button className="formButton">Clear Form</button>
                    </div>
                </form>
            </div>
    </div>

    </div>
  );
}

export default Pupload;
