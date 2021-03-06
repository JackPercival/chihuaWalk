import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import DogSlide from '../DogSlide/dogSlide';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs, deleteSingleDog } from '../../store/dog';

import MapContainer from '../Maps';

import './yourDogs.css'

function YourDogs() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const dogs = useSelector(state => Object.values(state.dogs).filter(dog => dog?.user_id === Number(user.id)));
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [dogToDelete, setDogToDelete] = useState('')
    const [dogNameToDelete, setDogNameToDelete] = useState('')

    useEffect(() => {
        document.title = `Your Dogs · ChihuaWalk`;
      }, []);

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
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);


    const showDeleteForm = (e, dog_id, name) => {
        e.preventDefault(e)
        setDogToDelete(dog_id)
        setDogNameToDelete(name)
        setShowDelete(true)
    }

    const handleDogDelete = (e) => {
        dispatch(deleteSingleDog(dogToDelete))
        setShowDelete(false)
        setDogToDelete('')
        setDogNameToDelete('')
    }

    return (
        <>
            {isLoaded && (
                <div className="yourDogsContainer">
                    {dogs?.length > 0 && (
                        <div className="yourDogsInfoAndMapContainer">
                            <div className="yourDogList">
                                <div className="yourDogsAndAddButton">
                                    <h1>Your Dogs</h1>
                                    <Link to="/pupload">
                                        <div id="addMoreDogsButton" className="pupLoadFromYourDogsButton">Add another Dog</div>
                                    </Link>
                                </div>
                                {dogs.map(dog =>
                                    <div className="yourDogSingleDogContainer" key={`Your_Dog_holder_${dog.id}`}>
                                        <DogSlide dog={dog} key={`Your_dog_${dog.id}`} />
                                        <div className="yourDogSingleDogInfo">
                                            <div className="singleDogName">{dog.name}</div>
                                            <div className="dogDetailsNoButtons">
                                                <div className="dogCardData">
                                                    <div className="dogDataIcon">
                                                        <i className="fas fa-dog"></i>
                                                    </div>
                                                    <div className="dogInfoSingleDog">{dog?.breed}</div>
                                                </div>
                                                <div className="dogCardData">
                                                    <div className="dogDataIcon">
                                                        <i className="fas fa-info-circle"></i>
                                                    </div>
                                                    <div className="dogInfoSingleDog">{dog?.description}</div>
                                                </div>
                                                <div className="dogCardData">
                                                    <div className="dogDataIcon">
                                                        <i className="fas fa-weight"></i>
                                                    </div>
                                                    <div className="dogInfoSingleDog">{`${dog?.weight} lbs.`}</div>
                                                </div>
                                                <div className="dogCardData">
                                                    <div className="dogDataIcon">
                                                        <i className="fas fa-home"></i>
                                                    </div>
                                                    <div className="dogInfoSingleDog">{`${dog?.city}, ${dog?.state}`}</div>
                                                </div>
                                            </div>
                                            {dog.user_id === Number(user.id) && (
                                                <div className="editDeleteDogButtons">
                                                    <Link to={`/dogs/${dog.id}/edit`}>
                                                        <div>Edit</div>
                                                    </Link>
                                                    <div id="deleteDogButton" onClick={(e) => showDeleteForm(e, dog.id, dog.name)}>Delete</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="yourDogMap">
                                <MapContainer zoom={6} dogs={dogs}/>
                            </div>
                        </div>
                    )}
                    {dogs?.length === 0 && (
                        <div className="noDogsToShow">
                            <h1>You have not uploaded any shelter dogs yet.</h1>
                            <p>Any dogs you add to ChihuaWalk will show up here.</p>
                            <img className="noDogsPosted" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_713/v1637271815/Capstone/yellowdog_k2aeex.jpg" alt="Yellow Dog" />
                            <div className="noDogsButtons">
                                <Link to="/pupload">
                                    <div className="pupLoadFromYourDogsButton">Add a Dog</div>
                                </Link>
                                <Link to="/browse">
                                    <div className="pupLoadFromYourDogsButton">Browse</div>
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            )}
            {showDelete && (
                <div className="loginModal">
                    <div className="deleteDogForm">
                        <div className="xToClose" onClick={() => setShowDelete(false)}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="areYouSureDogDelete">{`Are you sure you want to delete ${dogNameToDelete}?`}</div>
                        <div className="dogDeleteConfirmButtons">
                            <div onClick={handleDogDelete}>Delete</div>
                            <div id="cancelDogDelete" onClick={() => setShowDelete(false)}>Cancel</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default YourDogs;
