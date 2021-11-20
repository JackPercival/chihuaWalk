import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';
import { deleteSingleWalk } from '../../store/walk';
import { addWalkDogsWalks } from '../../store/walk_dog';
import DatePicker from 'react-calendar';

import './dogWalkCard.css'

const DogWalkCard = ({ walk, upcoming }) => {
  const dispatch = useDispatch();

  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [date, setDate] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);

  // useEffect(() => {
  //   dispatch(addWalkDogsWalks(walk.dog.id))
  // })

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow)
  }, [])

  const formatDate = () => {
    const newDate = walk.date.slice(0,16).split(" ")
    const correct = []
    correct.push(newDate[0])
    correct.push(newDate[2])
    correct.push(newDate[1])
    correct.push(`${newDate[3]}`)
    return correct.join(" ")
  }

  const showChangeDatePopUp = (e) => {
    e.preventDefault()
    setShowUpdate(true)
  }

  const showDeleteConfirmation = (e) => {
    e.preventDefault()
    setShowDelete(true)
  }

  const deleteWalk = () => {
    dispatch(deleteSingleWalk(walk.id))
    setShowDelete(false)
  }

  const updateWalk = () => {

  }



  const formattedDate = formatDate();

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
                    <div id="editWalkButton" onClick={showChangeDatePopUp}>Change Date</div>
                    <div id="deleteDogButton" onClick={showDeleteConfirmation}>Cancel Walk</div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </Link>
      {showUpdate && (
        <div className="loginModal">
          <div className="deleteDogForm" id="changeWalkDateForm">
            <div className="changeWalkFormEverythingButButtons">
              <div className="xToClose" onClick={() => setShowUpdate(false)}>
                  <i className="fas fa-times"></i>
              </div>
              <div className="areYouSureDogDelete">Select a New Date</div>
              <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={tomorrow}/>
            </div>
              <div className="dogDeleteConfirmButtons" id="walkDeleteConfirmButtons">
                  <div id="confirmWalkDeletionCancelButton" onClick={updateWalk}>Change Date</div>
                  <div id="cancelDogDelete" onClick={() => setShowUpdate(false)}>Go Back</div>
              </div>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="loginModal">
            <div className="deleteDogForm">
                <div className="xToClose" onClick={() => setShowDelete(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="areYouSureDogDelete">{`Are you sure you want to cancel your walk with ${walk.dog.name} on ${formattedDate}?`}</div>
                <div className="dogDeleteConfirmButtons" id="walkDeleteConfirmButtons">
                    <div id="confirmWalkDeletionCancelButton" onClick={deleteWalk}>Cancel Walk</div>
                    <div id="cancelDogDelete" onClick={() => setShowDelete(false)}>Go Back</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default DogWalkCard;
