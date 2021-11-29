import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearch } from '../context/SearchContext';
import { loadAllDogs } from '../../store/dog';
import DogBrowseContainer from './dogContainer';

import './browse.css'

const Browse = () => {

    const dispatch = useDispatch();
    const dogs = useSelector(state => Object.values(state.dogs));
    const [isLoaded, setIsLoaded] = useState(false);
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    useEffect(() => {
        dispatch(loadAllDogs()).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

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
        document.title = "All Dogs · ChihuaWalk";
    }, []);

  return (
    <>
        {isLoaded && (
            <div className="browseDogContainer">
                <h1>Browse all dogs</h1>
                <DogBrowseContainer dogs={dogs} />
            </div>

        )}
    </>
  );
}

export default Browse;
