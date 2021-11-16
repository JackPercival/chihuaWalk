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
            <div className="threeLines">
                <div></div>
                <div></div>
                <div></div>
            </div>
            {user? (
                <div className="profileButtonUserIcon" style={{backgroundImage: `url(${user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
            ) : (
                <div className="profileButtonUserIcon" style={{backgroundImage: `url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
            )}
        </div>
        {showProfileDropDown && (
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
        )}
    </div>
  );
}

export default ProfileButton;
