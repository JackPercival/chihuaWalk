import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUserName } from '../../store/session';

import './accountSettings.css'

const AccountSettings = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [showNameForm, setShowNameForm] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
    }, [user])

    const resetNameForm = () => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setShowNameForm(false)
    }

    const updateName = async (e) => {
        e.preventDefault();
        await dispatch(updateUserName(user.id, firstName, lastName))
        setShowNameForm(false)
    }

    return (
        <div className="accountSettingsContainer">
            <h1>Account</h1>
            {showNameForm? (
                <div className="accountFormContainer">
                    <div className="topRowAccount">
                        <div className="accountHeader">Legal Name</div>
                        <div className="editAccountButton" onClick={resetNameForm}>Cancel</div>
                    </div>
                    <div className="accountInfo">This is the name on your government issued ID, which could be a license or a passport.</div>
                    <form className="accountForm" onSubmit={updateName}>
                        <div className="nameInputs">
                            <div className="accountFormInputContainer">
                                <label>First Name</label>
                                <input
                                    name='first_name'
                                    type="input"
                                    maxLength="60"
                                    required
                                    autoComplete="off"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="accountFormInputContainer">
                                <label>Last Name</label>
                                <input
                                    name='first_name'
                                    type="input"
                                    maxLength="60"
                                    required
                                    autoComplete="off"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            ) : (
                <div className="accountFormContainer">
                    <div className="topRowAccount">
                        <div className="accountHeader">Legal Name</div>
                        <div className="editAccountButton" onClick={() => setShowNameForm(true)}>Edit</div>
                    </div>
                    <div className="accountInfo">{`${user?.first_name} ${user?.last_name}`}</div>
                </div>
            )}
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
                    <div className="userPhoto accountInfo" style={{backgroundImage: `url(${user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
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
