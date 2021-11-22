import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import SearchBar from './searchBar';
import ProfileButton from './ProfileButton';
import { useSearch } from '../context/SearchContext';

import './Header.css'

const Header = () => {

  const user = useSelector(state => state.session.user);
  const {showSearchClass, setShowSearchClass} = useSearch();

  return (
    <header>
        <Link to='/' className="mainLogoTitle">
          <div className="mainLogo">cW</div>
        </Link>
        <SearchBar />
        <ProfileButton user={user}/>
    </header>
  );
}

export default Header;
