import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DogHolder from '../DogHolder/dogHolder';
import DogSlide from '../DogSlide/dogSlide';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';

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

    return (
        <>
            {isLoaded && (
                <div className="yourDogsContainer">
                    <div className="yourDogList">
                        <h1>Your Dogs</h1>
                        {dogs.map(dog =>
                            <DogSlide dog={dog} key={`Your_dog_${dog.id}`} />
                        )}
                    </div>

                    <div className="youDogMap">

                    </div>

                </div>
            )}
        </>
    )
}

export default YourDogs;
