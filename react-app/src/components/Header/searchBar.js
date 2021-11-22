import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './searchBar.css'

const SearchBar = () => {


  return (
    <div className="searchBarContainer">
        <div className="fakeSearchBar">
            <div className="searchCategories">
                <div>Address</div>
                <div>Breed</div>
                <div>Weight</div>
            </div>
            <div className="searchMagGlassIcon">
                <i className="fas fa-search"></i>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
