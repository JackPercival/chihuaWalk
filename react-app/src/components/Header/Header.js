import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
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
          {/* <div>Seach Bar</div> */}
          <ProfileButton user={user}/>
    </header>
  );
}

export default Header;
