import React from 'react';
import { Slide } from 'react-slideshow-image';

import './dogSlide.css'

const DogSlide = ({dog}) => {
    const imageArray = (Object.values(dog.images));

    return (
        <div className="singleDogHolder" id="dogSlideID">
            <Slide easing="ease" indicators={true} autoplay={false} cssClass="dogSlide2" transitionDuration={500}>
                {imageArray.map(image =>
                    <div key={`Dog_slide_${image.id}`} style={{backgroundImage: `url(${image}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}} className="dogImageSlide" id="dogImageSlideID"></div>
                )}
            </Slide>
        </div>
    );
}

export default DogSlide;
