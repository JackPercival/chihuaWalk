import React, { useState, useEffect } from 'react';
import DogHolder from '../DogHolder/dogHolder';

import './browse.css'

const DogBrowseContainer = ({dogs}) => {

    const [dogList, setDogList] = useState(dogs);
    const [isLoaded, setIsLoaded] = useState(false);
    const [haveUserDistance, setHaveUserDistance] = useState(false);
    const [sortBy, setSortBy] = useState('breed-a')

    const [breedAClass, setBreedAClass] = useState('')
    const [breedZClass, setBreedZClass] = useState('')
    const [weightLClass, setWeightLClass] = useState('')
    const [weightHClass, setWeightHClass] = useState('')
    const [distanceClass, setDistanceClass] = useState('')

    const success = async (pos) => {
        let crd = pos.coords;

        const dogsWithDistance = dogs?.map(dog => ({...dog, distance: distance(crd.latitude, crd.longitude, dog.latitude, dog.longitude)}))
        dogsWithDistance.sort((a,b) => a.distance - b.distance)
        await setDogList(dogsWithDistance)
        await setHaveUserDistance(true)
        setIsLoaded(true)

    }

    const error = () => {
        setIsLoaded(true)
    }

    //Get distance between two sets of coordinates
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula?rq=1
    // Took from stackoverflow and modified last line to convert to miles instead of Kilometers
    function distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p))/2;

        return 7917.5 * Math.asin(Math.sqrt(a));
      }

    const sortByBreedA = async () => {
        const sortedByBreed = dogList.sort(function(a, b) {
            a = a.breed.toLowerCase()
            b = b.breed.toLowerCase()
            if (a < b) {
                return -1
            }
            if (a > b) {
                return 1
            }
            return 0;

        })
        await setDogList(sortedByBreed)
        setIsLoaded(true)
    }

    const sortByBreedZ = async () => {
        const sortedByBreed = dogList.sort(function(a, b) {
            a = a.breed.toLowerCase()
            b = b.breed.toLowerCase()
            if (b < a) {
                return -1
            }
            if (b > a) {
                return 1
            }
            return 0;

        })
        await setDogList(sortedByBreed)
        setIsLoaded(true)
    }

    const sortByWeightLow = async () => {
        const sortedByWeight = dogList.sort((a,b) => a.weight - b.weight)
        await setDogList(sortedByWeight)
        setIsLoaded(true)
    }

    const sortByWeightHigh = async () => {
        const sortedByWeight = dogList.sort((a,b) => b.weight - a.weight)
        await setDogList(sortedByWeight)
        setIsLoaded(true)
    }

    const sortByDistance = async () => {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    const resetClasses = async () => {
        setBreedAClass('')
        setBreedZClass('')
        setWeightLClass('')
        setWeightHClass('')
        setDistanceClass('')
    }

    useEffect(() => {
        setIsLoaded(false)
        resetClasses()
        setHaveUserDistance(false)

        if (sortBy === 'breed-a') {
            sortByBreedA();
            setBreedAClass('sortSelected')
        } else if (sortBy === 'breed-z') {
            sortByBreedZ();
            setBreedZClass('sortSelected')
        } else if (sortBy === 'weight-l') {
            sortByWeightLow();
            setWeightLClass('sortSelected')
        } else if (sortBy === 'weight-h') {
            sortByWeightHigh();
            setWeightHClass('sortSelected')
        } else {
            sortByDistance();
            setDistanceClass('sortSelected')
        }
    }, [sortBy])

  return (
    <>
        <div className="sortByContainer">
            <div className="sortHeader">Sort by:</div>
            <div className={`sortCategory ${breedAClass}`} onClick={() => setSortBy('breed-a')}>Breed (a - z)</div>
            <div className={`sortCategory ${breedZClass}`} onClick={() => setSortBy('breed-z')}>Breed (z - a)</div>
            <div className={`sortCategory ${distanceClass}`} onClick={() => setSortBy('distance')}>Distance</div>
            <div className={`sortCategory ${weightLClass}`} onClick={() => setSortBy('weight-l')}>Weight (low - high)</div>
            <div className={`sortCategory ${weightHClass}`} onClick={() => setSortBy('weight-h')}>Weight (high - low)</div>
        </div>
        {!isLoaded && (
            <img className="fetchGif" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637790962/Capstone/loadingGif_hgflu6.gif" alt="fetching gif"/>
        )}
        {isLoaded && (
            <div className="allDogsContainer">
                {dogList.map(dog =>
                    <DogHolder dog={dog} key={`Dog_Browse_${dog?.id}`} haveUserDistance={haveUserDistance}/>
                )}
            </div>
        )}
    </>
  );
}

export default DogBrowseContainer;
