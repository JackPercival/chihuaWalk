import React from 'react';
import { Slide } from 'react-slideshow-image';
import {  Link } from 'react-router-dom';

import './dogSlide.css'

const DogSlide = ({dog}) => {
    const imageArray = (Object.values(dog.images));

    return (
        <div className="singleDogHolder" id="dogSlideID">
            <Slide easing="ease" indicators={true} autoplay={false} cssClass="dogSlide2" transitionDuration={500}>
                {imageArray.map(image =>
                <Link to={`/dogs/${dog.id}`} key={`Dog_slide_${image.id}`}>
                    <div style={{backgroundImage: `url(${image}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}} className="dogImageSlide" id="dogImageSlideID"></div>
                </Link>
                )}
            </Slide>
        </div>
    );
}

export default DogSlide;
