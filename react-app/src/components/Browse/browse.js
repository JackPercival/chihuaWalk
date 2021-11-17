import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { loadAllDogs } from '../../store/dog';

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
            <>
                {dogs?.map(dog =>
                    <h1>{dog?.name}</h1>
                )}
            </>

        )}
    </>
  );
}

export default Browse;
