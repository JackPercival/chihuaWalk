import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useDispatch } from 'react-redux';
import { loadSearches } from '../../store/search';

import './SplashPage.css'

const SplashPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    //Clean up search bar
    useEffect(() => {
        setShowSearch(false)
        setSearchCity('')
        setSearchState('')
        setSearchBreed('')
        setSearchMinWeight('')
        setSearchMaxWeight('')
    }, [setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight])

    const searchSmall = async () => {
        await dispatch(loadSearches('','','', 1, 20))
        history.push('/search')
        setSearchMinWeight(1)
        setSearchMaxWeight(20)
        setShowSearch(true)
    }

    const searchMedium = async () => {
        await dispatch(loadSearches('','','', 21, 40))
        history.push('/search')
        setSearchMinWeight(21)
        setSearchMaxWeight(40)
        setShowSearch(true)
    }

    const searchLarge = async () => {
        await dispatch(loadSearches('','','', 41, 70))
        history.push('/search')
        setSearchMinWeight(41)
        setSearchMaxWeight(70)
        setShowSearch(true)
    }

    const searchExtraLarge = async () => {
        await dispatch(loadSearches('','','', 71, ''))
        history.push('/search')
        setSearchMinWeight(71)
        setShowSearch(true)
    }

  return (
    <div className="splashPageContainer">
        <div className="topSpashPage">
            <div className="mainHeaderSlogan">
                <h1>ChihuaWalk</h1>
                <h2>Help Dog Adoption. Schedule a Walk with a Shelter Dog.</h2>
            </div>
        </div>
        <div className="notSureContainer">
            <div className="notSureContent">
                <h2>Not sure who to walk? Pawfect.</h2>
                <div >
                    <Link to='/browse'>
                        <div className="flexibleButton">I'm flexible</div>
                    </Link>
                </div>
            </div>
        </div>
        <h3 className="inspiration">Inspiration for your next walk</h3>
        <div className="inspirationCardContainer">
            <div className="inspirationCard" onClick={searchSmall}>
                <div className="inspirationImage"></div>
                <div className="inspirationContent">
                    <div>Small Dogs</div>
                </div>
            </div>
            <div className="inspirationCard" id="mediumDog" onClick={searchMedium}>
                <div className="inspirationImage"></div>
                <div className="inspirationContent">
                    <div>Medium Dogs</div>
                </div>
            </div>
            <div className="inspirationCard" id="largeDog" onClick={searchLarge}>
                <div className="inspirationImage"></div>
                <div className="inspirationContent">
                    <div>Large Dogs</div>
                </div>
            </div>
            <div className="inspirationCard" id="xlargeDog" onClick={searchExtraLarge}>
                <div className="inspirationImage"></div>
                <div className="inspirationContent">
                    <div>Extra Large Dogs</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SplashPage;
