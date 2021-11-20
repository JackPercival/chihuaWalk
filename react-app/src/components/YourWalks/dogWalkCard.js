import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';

import './dogWalkCard.css'

const DogWalkCard = ({ walk, upcoming }) => {

  const [showCalendar, setShowCalendar] = useState(false)
  const [showDelete, setShowDelete] = useState(false);

  const formatDate = () => {
    const newDate = walk.date.slice(0,16).split(" ")
    const correct = []
    correct.push(newDate[0])
    correct.push(newDate[2])
    correct.push(newDate[1])
    correct.push(`${newDate[3]}`)
    return correct.join(" ")
  }

  const showDeleteConfirmation = (e) => {
    e.preventDefault()
    setShowDelete(true)
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
                <div className="walConfirmJustDetails">
                  <div className="walkConfirmDetails">
                      <div className="walkConfirmDetailHeader">Dog Name:</div>
                      <div className="walkConfirmeDetailInfo">{walk.dog?.name}</div>
                  </div>
                  <div className="walkConfirmDetails" id="walkLocationContainer">
                      <div className="walkConfirmDetailHeader" id="walkLocation">Location:</div>
                      <div className="walkConfirmeDetailInfo">{`${walk.dog?.address}, ${walk.dog?.city}, ${walk.dog?.state}`}</div>
                  </div>
                </div>
                {upcoming && (
                  <div className="editDeleteDogButtons" id="editDeleteWalkButtons">
                    <div id="editWalkButton">Change Date</div>
                    <div id="deleteDogButton" onClick={showDeleteConfirmation}>Cancel Walk</div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </Link>
      {showDelete && (
        <div className="loginModal">
            <div className="deleteDogForm">
                <div className="xToClose" onClick={() => setShowDelete(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="areYouSureDogDelete">{`Are you sure you want to delete your walk with ${walk.dog.name} on ${formattedDate}?`}</div>
                <div className="dogDeleteConfirmButtons">
                    <div>Delete</div>
                    <div id="cancelDogDelete" onClick={() => setShowDelete(false)}>Cancel</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default DogWalkCard;
