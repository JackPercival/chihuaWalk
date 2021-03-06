import React from 'react';
import { Slide } from 'react-slideshow-image';
import {  Link } from 'react-router-dom';

import 'react-slideshow-image/dist/styles.css'
import './dogHolder.css'

const DogHolder = ({dog, haveUserDistance}) => {
    const imageArray = (Object.values(dog.images));
  return (
    <div className="singleDogHolder">
        <Slide easing="ease" indicators={true} autoplay={false} cssClass="dogSlide" transitionDuration={500}>
            {imageArray.map(image =>
            <Link to={`/dogs/${dog.id}`} key={`Dog_slide_${image.id}`}>
                <div style={{backgroundImage: `url(${image}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}} className="dogImageSlide"></div>
            </Link>
            )}
        </Slide>
        <Link to={`/dogs/${dog.id}`}>
            <div className="dogInfo">
                <div className="dogInfoTopRowBrowse">
                    <p className="dogName">{dog.name}</p>
                    <p className="dogBreedBrowse">{dog.breed}</p>
                </div>
                <div className='dogStats'>
                    {haveUserDistance? (
                        <p className="dogAddress">{`${parseInt(dog.distance)} miles away`}</p>
                    ) : (
                        <p className="dogAddress">{`${dog.city}, ${dog.state}`}</p>
                    )}
                    <p>{`${dog.weight} lbs`}</p>
                </div>
            </div>
        </Link>
    </div>
  );
}

export default DogHolder;
