import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';
import DogHolder from '../DogHolder/dogHolder';

import './browse.css'

const Browse = () => {

    const dispatch = useDispatch();
    const dogs = useSelector(state => Object.values(state.dogs));
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
            <div className="browseDogContainer">
                <h1>Browse all dogs</h1>
                <div className="allDogsContainer">
                    {dogs?.map(dog =>
                        <DogHolder dog={dog} key={`Dog_Browse_${dog?.id}`}/>
                    )}
                </div>
            </div>

        )}
    </>
  );
}

export default Browse;
