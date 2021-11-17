import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './SplashPage.css'

const SplashPage = () => {

//   const user = useSelector(state => state.session.user);

  return (
    <div className="splashPageContainer">
        <div className="topSpashPage">
            <div className="mainHeaderSlogan">
                <h1>ChihuaWalk</h1>
                <h2>Help Dog Adoption. Schedule a Walk with a Shelter Dog.</h2>
            </div>
        </div>
        <div className="notSureContainer">
            <div className="notSureContent">
                <h2>Not sure who to walk? Pawfect.</h2>
                <div className="flexibleButton">
                    <Link to='/browse'>
                        <div>I'm flexible</div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SplashPage;
