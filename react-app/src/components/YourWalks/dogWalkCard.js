import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';

import './dogWalkCard.css'

const DogWalkCard = ({ walk }) => {



  const formatDate = () => {
    const newDate = walk.date.slice(0,16).split(" ")
    const correct = []
    correct.push(newDate[0])
    correct.push(newDate[2])
    correct.push(newDate[1])
    correct.push(`${newDate[3]}`)
    return correct.join(" ")
  }

  const formattedDate = formatDate()

  return (
    <div className="outerDogCardContainer">
      <Link to={`/dogs/${walk.dog.id}`} className="dogWalkLinkToDog">
        <div className="dogWalkCard">
            <div className="walkDate">{formattedDate}</div>
            <div className="walkPicAndDogInfo">
              <div className="walkPic" style={{backgroundImage: `url(${walk.dog.images[0]})`}}></div>
              <div className="walkDogInfo">
                <div>{walk.dog.name}</div>
                <div>{`${walk.dog.address}, ${walk.dog.city}, ${walk.dog.state}`}</div>
              </div>
            </div>
        </div>
      </Link>
    </div>
  );
}

export default DogWalkCard;
