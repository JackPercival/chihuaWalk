import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import SearchBar from './searchBar';
import ProfileButton from './ProfileButton';

import './Header.css'

const Header = () => {

  const user = useSelector(state => state.session.user);

  return (
    <header>
        <div className="mainHeaderContent">
          <Link to='/' className="mainLogoTitle">
            <div className="mainLogo">cW</div>
            <div className="mainTitle">chihuaWalk</div>
          </Link>
          <SearchBar />
          <div className="profBarContainer">
            <ProfileButton user={user}/>
          </div>
        </div>
    </header>
  );
}

export default Header;
