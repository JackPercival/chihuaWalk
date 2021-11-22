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
                        <div className="searchFormField">
                            <label>City</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="What city?"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField">
                            <label>State</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="What state?"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField">
                            <label>Breed</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Add a breed"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField">
                            <label>Min Weight</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Minimum weight"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField lastSearchCat">
                            <label>Max Weight</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Maximum weight?"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="realSearchButtonContainer">
                            <div>
                                <i className="fas fa-search"></i>
                            </div>
                            <div className="searchWord">Search</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
