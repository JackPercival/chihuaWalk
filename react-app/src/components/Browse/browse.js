import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { loadAllDogs } from '../../store/dog';
import DogHolder from '../DogHolder/dogHolder';

import './browse.css'

const Browse = () => {

    const dispatch = useDispatch();
    const dogs = useSelector(state => Object.values(state.dogs));
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // dispatch(loadUsers())
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
