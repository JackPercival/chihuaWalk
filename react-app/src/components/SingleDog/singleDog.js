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
                <div className="singleDogContainer">
                    <p>{dog?.name}</p>

                </div>
            )}
        </>
    )
}

export default SingleDog;
