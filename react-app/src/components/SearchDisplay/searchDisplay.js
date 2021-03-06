import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DogSlide from '../DogSlide/dogSlide';

import MapContainer from '../Maps';

import './searchDisplay.css'

function SearchDisplay() {

    const dogs = useSelector(state => Object.values(state.search));
    const [isLoaded] = useState(true);

    useEffect(() => {
        document.title = `Search · ChihuaWalk`;
    }, []);

    //Scroll to the top of page
    document.documentElement.scrollTop = 0;

    return (
        <>
            {isLoaded && (
                <div className="yourDogsContainer">
                    {dogs?.length > 0 && dogs[0] !== null && (
                        <div className="yourDogsInfoAndMapContainer" id="searchResultHeader">
                            <div className="yourDogList">
                                <div className="yourDogsAndAddButton">
                                    {dogs?.length === 1? (
                                        <h1>{`Search Results - 1 dog`}</h1>
                                    ) : (
                                        <h1>{`Search Results - ${dogs?.length} dogs`}</h1>
                                    )}
                                </div>
                                {dogs?.map(dog =>
                                    <div className="yourDogSingleDogContainer" key={`Your_Dog_holder_${dog?.id}`}>
                                        <DogSlide dog={dog} key={`Your_dog_${dog?.id}`} />
                                        <div className="yourDogSingleDogInfo">
                                            <div className="singleDogName">{dog?.name}</div>
                                            <div className="dogDetailsNoButtons searchDogHolder">
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
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="yourDogMap">
                                <MapContainer zoom={5} dogs={dogs}/>
                            </div>
                        </div>
                    )}
                    {dogs.length === 0 &&  (
                        <div className="yourDogsInfoAndMapContainer">
                            <div className="yourDogList">
                                <div className="yourDogsAndAddButton">
                                    <h1>No Search Results</h1>
                                </div>
                            </div>
                            <div className="yourDogMap">
                                <MapContainer zoom={4}/>
                            </div>
                        </div>
                    )}
                    {dogs[0] === null && (
                        <div className="yourDogsInfoAndMapContainer">
                            <div className="yourDogList">
                                <div className="yourDogsAndAddButton">
                                    <h1>Enter a Search</h1>
                                </div>
                            </div>
                            <div className="yourDogMap">
                                <MapContainer zoom={4}/>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SearchDisplay;
