import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { loadAllDogs } from '../../store/dog';

import 'react-slideshow-image/dist/styles.css'
import './dogHolder.css'

const DogHolder = ({dog}) => {
    const imageArray = (Object.values(dog.images));
  return (
    <div className="singleDogHolder">
        <Slide easing="ease" indicators={true} autoplay={false} cssClass="dogSlide" transitionDuration={500}>
            {imageArray.map(image =>
            <Link to={`/dogs/${dog.id}`}>
                <div style={{backgroundImage: `url(${image})`}} className="dogImageSlide"></div>
            </Link>
            )}
        </Slide>
        <p>{dog.name}</p>
    </div>
  );
}

export default DogHolder;
