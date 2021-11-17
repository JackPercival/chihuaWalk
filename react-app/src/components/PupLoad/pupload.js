import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './pupload.css'

const Pupload = () => {

  const user = useSelector(state => state.session.user);

  return (
    <div className="puploadContainer">
        <h1>Post a Pup</h1>
        <h2>Fill out the form below to add a shelter dog to the ChihuaWalk. Dogs on ChihuaWalk have higher visibility to the public and are more likely to get adopted. Walking with people improves dog behavior, uses up their energy, and shows people what a dog in an animal rescue can be like outside the shelter walls. Not to mention, dogs love being outside and walking!</h2>
        <div className="puploadFormsContainer">
            <div >
                <form className="puploadForm" autoComplete="off">
                    <div className="formInputSection">
                        <div className="dogSection">
                            <h3>Dog Information</h3>
                            <div className="pupLoadField">
                                <label>Password</label>
                                <input
                                    // className={borderError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="pupLoadField">
                                <label>Password</label>
                                <input
                                    // className={borderError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="shelterSection">
                            <h3>Shelter Information</h3>
                            <div className="pupLoadField">
                                <label>Password</label>
                                <input
                                    // className={borderError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>
                            <div className="pupLoadField">
                                <label>Password</label>
                                <input
                                    // className={borderError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div>
                        <button type="submit">Add Dog</button>
                        <button className="formButton">Cancel</button>
                    </div>
                </form>
            </div>
    </div>

    </div>
  );
}

export default Pupload;
