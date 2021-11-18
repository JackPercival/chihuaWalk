import React from 'react';
import { Slide } from 'react-slideshow-image';
import {  Link } from 'react-router-dom';

import 'react-slideshow-image/dist/styles.css'
import './dogHolder.css'

const DogHolder = ({dog}) => {
    const imageArray = (Object.values(dog.images));
  return (
    <div className="singleDogHolder">
        <Slide easing="ease" indicators={true} autoplay={false} cssClass="dogSlide" transitionDuration={500}>
            {imageArray.map(image =>
            <Link to={`/dogs/${dog.id}`} key={`Dog_slide_${image.id}`}>
                <div style={{backgroundImage: `url(${image})`}} className="dogImageSlide"></div>
            </Link>
            )}
        </Slide>
        <Link to={`/dogs/${dog.id}`}>
            <div className="dogInfo">
                <p className="dogName">{dog.name}</p>
                <div className='dogStats'>
                    <p>{dog.breed}</p>
                    <p>{`${dog.weight} lbs`}</p>
                </div>
            </div>
        </Link>
    </div>
  );
}

export default DogHolder;
