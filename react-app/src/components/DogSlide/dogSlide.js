import React from 'react';
import { Slide } from 'react-slideshow-image';
import {  Link } from 'react-router-dom';

const DogSlide = ({dog}) => {
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
        </div>
    );
}

export default DogSlide;
