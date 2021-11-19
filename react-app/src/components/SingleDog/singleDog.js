import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';
import { loadDogsWalks } from '../../store/walk';
import Reviews from '../Reviews/reviews';
import MapContainer from '../Maps';
import DatePicker from 'react-calendar';
import './singleDog.css'

function SingleDog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { dogId } = useParams();

    const user = useSelector(state => state.session.user);
    const dog = useSelector(state => state.dogs[dogId]);
    const walks = useSelector(state => state.walks);

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState(null)
    const [formattedDate, setFormattedDate] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        dispatch(loadDogsWalks(dogId))
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    //Redirect if the dog does not exist
    useEffect(() => {
        if (isLoaded && !dog) {
            history.push('/')
        }
    }, [dog, isLoaded])

    useEffect(() => {
        if (date) {
            const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            setFormattedDate(displayDate)
        }
    }, [date])

    return (
        <>
            {isLoaded && (
                <div className="singleDogContainer">
                    <h1>{dog?.name}</h1>
                    <h3>{`${dog?.city}, ${dog?.state}, ${dog?.country}`}</h3>
                    <div className="dogImageContainer">
                        <div className="mainDogImage" style={{backgroundImage: `url(${dog?.images[0]})`}}></div>
                        <div className="smallerDogImageContainer">
                            <div className="smallDogImage" id="firstSmallImage" style={{backgroundImage: `url(${dog?.images[1]})`}}></div>
                            <div className="smallDogImage" id="secondSmallImage" style={{backgroundImage: `url(${dog?.images[2]})`}}></div>
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
                                <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={new Date()}/>
                            </div>
                        </div>
                        <div className="dogScheduleWalkForm">
                            <div className="walkDateContainer">
                                <h3 id="walksFree">All Walks are Free</h3>
                                {!showCalendar && (
                                    <div className="walkDateInput">
                                        <label>WALK DATE</label>
                                        <input
                                        type="text"
                                        value={formattedDate}
                                        placeholder="Add date"
                                        onClick={(e) => setShowCalendar(true)}
                                        />
                                    </div>
                                )}
                            </div>
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
                                            onClick={(e) => setShowCalendar(true)}
                                            />
                                        </div>
                                    </div>
                                    <DatePicker onChange={(picked) => setDate(picked)} value={date} minDate={new Date()}/>
                                    <div className="closeDateContainer">
                                        <div onClick={(e) => setShowCalendar(false)}>Close</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Reviews dog={dog}/>
                    <div className="selectADate">{`Where you'll pick up ${dog?.name}`}</div>
                    <div className="singleDogMap">
                        {/* <MapContainer zoom={11} dogs={[dog]}/> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleDog;
