import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';

import { deleteSingleWalk, updatedExistingWalk } from '../../store/walk';
import { loadWalkDogsWalks } from '../../store/walk_dog';

import DatePicker from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';

import './dogWalkCard.css'

const DogWalkCard = ({ walk, upcoming, user }) => {
  const dispatch = useDispatch();

  const dogsWalks = useSelector(state => Object.values(state.dogsWalks));

  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showError, setShowError] = useState(false)
  const [date, setDate] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow)
  }, [])

  //Function to check if two dates are equal
  const equalDates = (date1, date2) => {
    return differenceInCalendarDays(date1, date2) === 0;
  }

  //Function to disable dates that already have a walk scheduled for the dog
  const tileDisabled = ({ date, view }) => {
      let walkDates = [];
      for (let walk of dogsWalks) {
          let date1 = new Date(walk.date.slice(5,16))
          walkDates.push(date1)
      }

      if (view === 'month') {
          return walkDates.find(theDate => equalDates(theDate, date))
      }
  }

  const formatDate = () => {
    const newDate = walk.date.slice(0,16).split(" ")
    const correct = []
    correct.push(newDate[0])
    correct.push(newDate[2])
    correct.push(newDate[1])
    correct.push(`${newDate[3]}`)
    return correct.join(" ")
  }

  const showChangeDatePopUp = async (e) => {
    e.preventDefault()
    await dispatch(loadWalkDogsWalks(walk.dog.id))
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

  const updateWalk = async () => {
    const data = await dispatch(updatedExistingWalk(walk.id, date.toISOString().split('T')[0]))
    if (data[0] === "Updated") {
      setDate(null)
      setShowUpdate(false)
    } else {
      setShowError(true)
    }

  }

  const cleanUpCalendarClose = () => {
    setDate(null)
    setShowError(false)
    setShowUpdate(false)
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
          {showError && (
              <div className="addDogError" id="updateDogError">
                <span>An error occured. Please refresh the page and try again.</span>
              </div>
            )}
            <div className="changeWalkFormEverythingButButtons">
              <div className="xToClose" onClick={cleanUpCalendarClose}>
                  <i className="fas fa-times"></i>
              </div>
              <div className="areYouSureDogDelete" id="selectNewDateHeader">Select a New Date</div>
              <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={tomorrow} tileDisabled={tileDisabled}/>
            </div>
              <div className="dogDeleteConfirmButtons" id="walkDeleteConfirmButtons">
                <>
                  {date !== null && (
                    <div id="changeDateConfimButton" onClick={updateWalk}>{`Change Date to ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</div>
                  )}
                </>
                  <div id="cancelDogDelete" onClick={cleanUpCalendarClose}>Go Back</div>
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
