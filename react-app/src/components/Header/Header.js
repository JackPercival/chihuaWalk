import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './Header.css'

const Header = () => {

  const user = useSelector(state => state.session.user);

  return (
    <header>
          <Link to='/' className="mainLogoTitle">
            <div className="mainLogo">cW</div>
            <div className="mainTitle">chihuaWalk</div>
          </Link>
          <ProfileButton user={user}/>
    </header>
  );
}

export default Header;
