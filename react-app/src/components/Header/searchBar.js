import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

import './searchBar.css'

const SearchBar = () => {

    const {showSearch, setShowSearch, setShowSearchClass} = useSearch();


    const showRealSearch = () => {
        setShowSearchClass('expanded')
        setTimeout(function() {
            setShowSearch(true)
          }, 100);
    }

    return (
        <div className="searchBarContainer">
            {!showSearch && (
                <div className="fakeSearchBar" id="searchBar" onClick={showRealSearch}>
                    <div className="searchCategories">
                        <div>Address</div>
                        <div>Breed</div>
                        <div>Weight</div>
                    </div>
                    <div className="searchMagGlassIcon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            )}
            {showSearch && (
                <div className="realSearchBar">
                    <div className="searchDogsHeader">Search Dogs</div>
                    <div className="realSearchFormContainer">
                        <div className="searchFormInputContainer">

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
