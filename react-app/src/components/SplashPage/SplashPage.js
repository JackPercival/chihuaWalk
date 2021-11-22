import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

import './SplashPage.css'

const SplashPage = () => {

    const {setShowSearch, setShowSearchClass} = useSearch();

    //Clean up search bar
    useEffect(() => {
        setShowSearch(false)
        setShowSearchClass('noExpand')
    }, [])


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
            <Link to="/browse">
                <div className="inspirationCard">
                    <div className="inspirationImage"></div>
                    <div className="inspirationContent">
                        <div>Small Dogs</div>
                    </div>
                </div>
            </Link>
            <Link to="/browse">
                <div className="inspirationCard" id="mediumDog">
                    <div className="inspirationImage"></div>
                    <div className="inspirationContent">
                        <div>Medium Dogs</div>
                    </div>
                </div>
            </Link>
            <Link to="/browse">
                <div className="inspirationCard" id="largeDog">
                    <div className="inspirationImage"></div>
                    <div className="inspirationContent">
                        <div>Large Dogs</div>
                    </div>
                </div>
            </Link>
            <Link to="/browse">
                <div className="inspirationCard" id="xlargeDog">
                    <div className="inspirationImage"></div>
                    <div className="inspirationContent">
                        <div>Extra Large Dogs</div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
  );
}

export default SplashPage;
