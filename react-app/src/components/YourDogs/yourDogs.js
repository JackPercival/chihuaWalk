import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DogSlide from '../DogSlide/dogSlide';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';

import MapContainer from '../Maps';

import './yourDogs.css'

function YourDogs() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const dogs = useSelector(state => Object.values(state.dogs).filter(dog => dog?.user_id === Number(user.id)));
    console.log(dogs)

    // const dog = useSelector(state => state.dogs[dogId]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

    const GMapSetting = {
		width: "400px",
		height: "400px",
		lat: 37.0902,
		lng: -95.7129,
		zoom: 4.4,
	};

    return (
        <>
            {isLoaded && (
                <div className="yourDogsContainer">
                    <div className="yourDogsInfoAndMapContainer">
                        <div className="yourDogList">
                            <h1>Your Dogs</h1>
                            {dogs.map(dog =>
                                <div className="yourDogSingleDogContainer">
                                    <DogSlide dog={dog} key={`Your_dog_${dog.id}`} />
                                    <div className="yourDogSingleDogInfo">
                                        <div className="singleDogName">{dog.name}</div>
                                        <div className="dogInfoSingleDog">{dog.breed}</div>
                                        <div className="dogInfoSingleDog">{dog.description}</div>
                                        <div className="dogInfoSingleDog">{`${dog.weight} lbs.`}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="yourDogMap">
                            <MapContainer GMapSetting={GMapSetting}/>
                        </div>

                    </div>

                </div>
            )}
        </>
    )
}

export default YourDogs;
