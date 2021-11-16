import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './ProfileButton.css'

const ProfileButton = ({ user }) => {
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)


  return (
    <div className="profileButtonAndDropDown">
        <div className="profileButton">
            <div className="threeLines"></div>
            <div className="profileButtonUserIcon"></div>
        </div>
        <div className="profileDropDown">
            {user? (
                <>
                    <Link to="/your-dogs">Post a pup</Link>
                    <Link to="/account-settings">Account</Link>
                </>
            ) : (
                <>
                    <div>Log in</div>
                    <div>Sign up</div>
                </>
            )}
        </div>
    </div>
  );
}

export default ProfileButton;
