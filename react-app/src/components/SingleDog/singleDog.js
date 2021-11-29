import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSearch } from '../context/SearchContext';
import { loadAllDogs } from '../../store/dog';
import { loadDogsWalks, addNewWalk } from '../../store/walk';
import { loadDogsReviews } from '../../store/review';
import Reviews from '../Reviews/reviews';
import MapContainer from '../Maps';
import DatePicker from 'react-calendar';

import { differenceInCalendarDays } from 'date-fns';

import './singleDog.css'
import './calendar.css'
import './walkForm.css'

function SingleDog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { dogId } = useParams();

    const user = useSelector(state => state.session.user);
    const dog = useSelector(state => state.dogs[dogId]);
    const walks = useSelector(state => Object.values(state.walks));
    const reviews = useSelector(state => Object.values(state.reviews));
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState(null)
    const [formattedDate, setFormattedDate] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)
    const [showSucces, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [tomorrow, setTomorrow] = useState(null)

    useEffect(() => {
        if (isLoaded) {
            document.title = `${dog?.name} · ChihuaWalk`;
        }
    }, [isLoaded, dog?.name]);

    //Clean up search bar
    useEffect(() => {
        setShowSearch(false)
        setSearchCity('')
        setSearchState('')
        setSearchBreed('')
        setSearchMinWeight('')
        setSearchMaxWeight('')
    }, [setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight])

    useEffect(() => {
        dispatch(loadDogsWalks(dogId))
        dispatch(loadDogsReviews(dogId))
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch, dogId]);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTomorrow(tomorrow)
    }, [])

    //Redirect if the dog does not exist
    useEffect(() => {
        if (isLoaded && !dog) {
            history.push('/')
        }
    }, [dog, isLoaded, history])

    //Set formatted date to display to user
    useEffect(() => {
        if (date) {
            const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            setFormattedDate(displayDate)
        }
    }, [date])


    const createWalk = async (e) => {
        e.preventDefault();
        setShowError(false)

        if (!date) {
            return;
        }

        const data = await dispatch(addNewWalk(user?.id, dogId, date.toISOString().split('T')[0]))
        if (data[0] === "Created") {
            setShowSuccess(true)
        } else {
            setShowError(true)
        }
    }


    //Function to check if two dates are equal
    const equalDates = (date1, date2) => {
        return differenceInCalendarDays(date1, date2) === 0;
    }

    //Function to disable dates that already have a walk scheduled for the dog
    const tileDisabled = ({ date, view }) => {
        let walkDates = [];
        for (let walk of walks) {
            let date1 = new Date(walk?.date.slice(5,16))
            walkDates.push(date1)
        }

        if (view === 'month') {
            return walkDates.find(theDate => equalDates(theDate, date))
        }
    }

    return (
        <>
            {isLoaded && (
                <>
                <div className="singleDogContainer">
                    <h1>{dog?.name}</h1>
                    <h3>{`${dog?.city}, ${dog?.state}, ${dog?.country}`}</h3>
                    <div className="dogImageContainer">
                        <div className="mainDogImage" style={{backgroundImage: `url(${dog?.images[0]}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}}></div>
                        <div className="smallerDogImageContainer">
                            <div className="smallDogImage" id="firstSmallImage" style={{backgroundImage: `url(${dog?.images[1]}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}}></div>
                            <div className="smallDogImage" id="secondSmallImage" style={{backgroundImage: `url(${dog?.images[2]}), url("https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637621047/Capstone/dogFallBack_zbctxj.png")`}}></div>
                        </div>
                    </div>
                    <div className="dogInfoAndCreateWalkContainer">
                        <div className="fullDogInfo">
                            <div className="ownerInfo">
                                <h3>{`Shelter owned by ${dog?.user.first_name} ${dog?.user.last_name}`}</h3>
                                {dog?.user.profile_pic? (
                                    <div className="ownerIcon" style={{backgroundImage: `url(${dog?.user.profile_pic})`}}></div>
                                ) : (
                                    <div className="ownerIcon" style={{backgroundImage: 'url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png'}}></div>
                                )}
                            </div>
                            <div className="dogBreedWeightDescriptionContainer">
                                <div className="dogDataContainer">
                                    <div className="dogDataIcon">
                                        <i className="fas fa-dog"></i>
                                    </div>
                                    <div className="dogData">
                                        <div className="breedHeader">Breed</div>
                                        <div className="breedInfo">{dog?.breed}</div>
                                    </div>
                                </div>
                                <div className="dogDataContainer">
                                    <div className="dogDataIcon">
                                        <i className="fas fa-weight"></i>
                                    </div>
                                    <div className="dogData" id="weightHeader">
                                        <div className="breedHeader">Weight</div>
                                        <div className="breedInfo">{`${dog?.weight} pounds`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dogDescription">{dog?.description}</div>
                            <div className="selectADate">Select a Date</div>
                            <div>
                                <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={tomorrow} view={"month"} prev2Label={null} next2Label={null} tileDisabled={tileDisabled}/>
                            </div>
                        </div>
                        <div className="dogScheduleWalkForm">
                            <form className="dogWalkForm" onSubmit={createWalk}>
                                <div className="walkDateContainer">
                                    <h3 id="walksFree">All Walks are Free</h3>
                                    <div className="walkDateInput">
                                        <label onClick={(e) => setShowCalendar(true)}>WALK DATE</label>
                                        <input
                                        type="text"
                                        value={formattedDate}
                                        placeholder="Add date"
                                        required
                                        onClick={(e) => setShowCalendar(true)}
                                        onFocus={(e) => setShowCalendar(true)}
                                        onChange={() => setFormattedDate(formattedDate)}
                                        />
                                    </div>
                                </div>
                                <p>Dogs are limited to 1 walk per day. Walkers may pick up the dog anytime after 12:00 PM and must return the dog by 5:00 PM the same day.</p>
                                {user?.id && user?.id !== dog?.user_id ? (
                                    <button type="submit">Reserve</button>
                                ) : (
                                    <>
                                        {user?.id? (
                                            <Link to={`/dogs/${dog.id}/edit`}>
                                                <div className="pleaseLogin" id="userOwnPostEdit">Edit your Posting</div>
                                            </Link>

                                        ) : (
                                            <div className="pleaseLogin">Please Login to Reserve a Walk</div>
                                        )}
                                    </>
                                )}
                                {showError && (
                                    <div className="addDogError" id="showErrorAlready">
                                        <span>An error occured. Please refresh the page and try again.</span>
                                    </div>
                                )}
                            </form>
                            {showCalendar && (
                                <div className="popUpCalendar">
                                    <div className="topRowPopUp">
                                        <h3 id="selectDate">Select a Date</h3>
                                        <div className="walkDateInput" id="popUpDateInput">
                                            <label>WALK DATE</label>
                                            <input
                                            type="text"
                                            value={formattedDate}
                                            placeholder="Add date"
                                            onChange={() => setFormattedDate(formattedDate)}
                                            />
                                        </div>
                                    </div>
                                    <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={tomorrow} view={"month"} showFixedNumberOfWeeks={true} prev2Label={null} next2Label={null} tileDisabled={tileDisabled}/>
                                    <div className="closeDateContainer">
                                        <div onClick={(e) => setShowCalendar(false)}>Close</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Reviews user={user} dog={dog} reviews={reviews}/>
                    <div className="selectADate" id="wherePickUpHeader">{`Where you'll pick up ${dog?.name}`}</div>
                    <div className="singleDogMap">
                        <MapContainer zoom={11} dogs={[dog]}/>
                    </div>
                </div>
                {showSucces && (
                    <div className="loginModal">
                        <div className="deleteDogForm" id="walkConfirmedPopUp">
                            <div className="walkedConfirmedText">Walk Confirmed!</div>
                            <div className="walkConfirmDetails">
                                <div className="walkConfirmDetailHeader">Dog Name:</div>
                                <div className="walkConfirmeDetailInfo">{dog?.name}</div>
                            </div>
                            <div className="walkConfirmDetails">
                                <div className="walkConfirmDetailHeader">Pick Up Spot:</div>
                                <div className="walkConfirmeDetailInfo">{`${dog?.address}, ${dog?.city}, ${dog?.state}`}</div>
                            </div>
                            <div className="walkConfirmDetails">
                                <div className="walkConfirmDetailHeader">Date:</div>
                                <div className="walkConfirmeDetailInfo">{`${date.toString().slice(0,15)} between 12 PM and 5 PM`}</div>
                            </div>
                            <div className="walkConfirmButtonContainer">
                                <Link to='/your-walks'>
                                    <div className="walkConfirmButton">View Your Walks</div>
                                </Link>
                                <Link to='/browse'>
                                    <div className="walkConfirmButton">Browse Dogs</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                </>
            )}
        </>
    )
}

export default SingleDog;
