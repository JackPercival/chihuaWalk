import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';

import './singleDog.css'

function SingleDog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { dogId } = useParams();

    const user = useSelector(state => state.session.user);

    const dog = useSelector(state => state.dogs[dogId]);
    console.log(dog)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
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
    })

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
                                <div className="ownerIcon" style={{backgroundImage: `url(${dog?.images[1]})`}}></div>
                            </div>
                        </div>
                        <div className="dogScheduleWalkForm">Space for sign up form here</div>
                    </div>

                </div>
            )}
        </>
    )
}

export default SingleDog;
