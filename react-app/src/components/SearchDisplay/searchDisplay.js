import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DogSlide from '../DogSlide/dogSlide';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs, deleteSingleDog } from '../../store/dog';

import MapContainer from '../Maps';

import './searchDisplay.css'

function SearchDisplay() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const dogs = useSelector(state => Object.values(state.search));

    const [isLoaded, setIsLoaded] = useState(true);

    // useEffect(() => {
    //     dispatch(loadAllDogs()).then(() => setIsLoaded(true));
    //     return () => {
    //         setIsLoaded()
    //     }
    // }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <div className="yourDogsContainer">
                    {dogs?.length > 0 && (
                        <div className="yourDogsInfoAndMapContainer">
                            <div className="yourDogList">
                                <div className="yourDogsAndAddButton">
                                    <h1>Your Dogs</h1>
                                </div>
                                {dogs.map(dog =>
                                    <div className="yourDogSingleDogContainer" key={`Your_Dog_holder_${dog.id}`}>
                                        <DogSlide dog={dog} key={`Your_dog_${dog.id}`} />
                                        <div className="yourDogSingleDogInfo">
                                            <div className="singleDogName">{dog.name}</div>
                                            <div className="dogDetailsNoButtons">
                                                <div className="dogInfoSingleDog">{dog.breed}</div>
                                                <div className="dogInfoSingleDog">{dog.description}</div>
                                                <div className="dogInfoSingleDog">{`${dog.weight} lbs.`}</div>
                                                <div className="dogInfoSingleDog">{`${dog.city}, ${dog.state}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="yourDogMap">
                                {/* <MapContainer zoom={6} dogs={dogs}/> */}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SearchDisplay;
