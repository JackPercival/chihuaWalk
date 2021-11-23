import React from 'react';
import { useSelector } from 'react-redux';

import './accountSettings.css'

const AccountSettings = () => {

  const user = useSelector(state => state.session.user);

  return (
    <div className="accountSettingsContainer">
        <h1>Account</h1>
        <div className="accountFormContainer">
            <div className="topRowAccount">
                <div className="accountHeader">Legal Name</div>
                <div className="editAccountButton">Edit</div>
            </div>
            <div className="accountInfo">{`${user?.first_name} ${user?.last_name}`}</div>
        </div>
        <div className="accountFormContainer">
            <div className="topRowAccount">
                <div className="accountHeader">Email</div>
                <div className="editAccountButton">Edit</div>
            </div>
            <div className="accountInfo">{`${user?.email}`}</div>
        </div>
        <div className="accountFormContainer">
        {user?.profile_pic? (
            <>
                <div className="topRowAccount" id="profilePicAccount">
                    <div className="accountHeader">Profile Picture</div>
                    <div className="editAccountButton">Edit</div>
                </div>
                <div className="accountInfo">{`${user?.profile_pic}`}</div>
            </>
        ) : (
            <>
                <div className="topRowAccount">
                    <div className="accountHeader">Profile Picture</div>
                    <div className="editAccountButton">Edit</div>
                </div>
                <div className="accountInfo">Not set</div>
            </>
            )}
        </div>
        <div className="accountFormContainer">
            <div className="topRowAccount">
                <div className="accountHeader">Password</div>
                <div className="editAccountButton">Edit</div>
            </div>
            <div className="accountInfo">***************</div>
        </div>
    </div>
  );
}

export default AccountSettings;
