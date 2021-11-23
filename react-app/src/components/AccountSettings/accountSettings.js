import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUserName, updateUserEmail, updateUserPicture } from '../../store/session';
import { useSearch } from '../context/SearchContext';

import './accountSettings.css'

const AccountSettings = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    const [showNameForm, setShowNameForm] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [nameErrorId, setNameErrorId] = useState('noUpdateNameError')
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('')
    const [emailErrorId, setEmailErrorId] = useState('noUpdateEmailError')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [showPicForm, setShowPicForm] = useState(false);
    const [profilePic, setProfilePic] = useState('')
    const [profiePicErrorId, setProfilePicErrorId] = useState('noUpdatePicError')
    const [picErrorMessage, setPicErrorMessage] = useState('')

    //Clean up search bar
    useEffect(() => {
        setShowSearch(false)
        setSearchCity('')
        setSearchState('')
        setSearchBreed('')
        setSearchMinWeight('')
        setSearchMaxWeight('')
    }, [setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight])

    useEffect(() => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setEmail(user?.email)
        setProfilePic(user?.profile_pic)
    }, [user])

    const resetNameForm = () => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setNameErrorId("noUpdateNameError")
        setShowNameForm(false)
    }

    const updateName = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setNameErrorId("updateNameError")
            return
        }
        const data = await dispatch(updateUserName(user.id, firstName, lastName))

        if (data[0] === 'Error') {
            setNameErrorId("updateNameError")
            return
        } else {
            setNameErrorId("noUpdateNameError")
            setShowNameForm(false)
        }
    }

    const resetEmailForm = () => {
        setEmail(user?.email)
        setShowEmailForm(false)
        setEmailErrorId('noUpdateEmailError')
        setEmailErrorMessage('')
    }

    const updateEmail = async (e) => {
        e.preventDefault();
        if (!email) {
            setEmailErrorMessage("Please fill out the Email field.")
            setEmailErrorId("updateEmailError")
            return
        }
        if (email === user?.email) {
            setShowEmailForm(false)
            return
        }
        const data = await dispatch(updateUserEmail(user.id, email))

        if (data[0] === 'Error') {
            setEmailErrorId("updateEmailError")
            setEmailErrorMessage(data[1][0].split("email : ").join(''))
            return
        } else {
            setEmailErrorId("noUpdateEmailError")
            setEmailErrorMessage('')
            setShowEmailForm(false)
        }
    }

    const resetPictureForm = () => {
        setProfilePic(user?.profile_pic)
        setProfilePicErrorId('noUpdatePicError')
        setPicErrorMessage('')
        setShowPicForm(false)
    }

    const updateProfilePic = async (e) => {
        e.preventDefault();

        const regex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        if ((profilePic.length > 0) && !regex.test(profilePic)) {
            setProfilePicErrorId('updatePicError')
            setPicErrorMessage('Please add a valid Image URL.')
            return
        }

        const data = await dispatch(updateUserPicture(user.id, profilePic))
        if (data[0] === 'Error') {
            setProfilePicErrorId('updatePicError')
            setPicErrorMessage('An error occured. Refresh the page and try again.')
            return
        } else {
            setProfilePicErrorId('noUpdatePicError')
            setPicErrorMessage('')
            setShowPicForm(false)
        }
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
                        <div className="accountFormUpdateErrorContainer">
                            <button type="submit">Save</button>
                            <div className="updateAccountError" id={nameErrorId}>Please fill out the First and Last Name fields.</div>
                        </div>
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
            {showEmailForm? (
                <div className="accountFormContainer">
                    <div className="topRowAccount">
                        <div className="accountHeader">Email</div>
                        <div className="editAccountButton" onClick={resetEmailForm}>Cancel</div>
                    </div>
                    <div className="accountInfo">Use an address you’ll always have access to.</div>
                    <form className="accountForm" onSubmit={updateEmail}>
                        <div className="nameInputs">
                            <div className="accountFormInputContainer">
                                <label>Email</label>
                                <input
                                    name='email'
                                    type="email"
                                    maxLength="255"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="accountFormUpdateErrorContainer">
                            <button type="submit">Save</button>
                            <div className="updateAccountError" id={emailErrorId}>{emailErrorMessage}</div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="accountFormContainer">
                    <div className="topRowAccount">
                        <div className="accountHeader">Email</div>
                        <div className="editAccountButton" onClick={() => setShowEmailForm(true)}>Edit</div>
                    </div>
                    <div className="accountInfo">{`${user?.email}`}</div>
                </div>
            )}
            {showPicForm? (
                <div className="accountFormContainer">
                <div className="topRowAccount">
                    <div className="accountHeader">Profile Picture</div>
                    <div className="editAccountButton" onClick={resetPictureForm}>Cancel</div>
                </div>
                <div className="accountInfo">Enter a valid Image URL.</div>
                <form className="accountForm" onSubmit={updateProfilePic}>
                    <div className="nameInputs">
                        <div className="accountFormInputContainer">
                            <label>Image URL</label>
                            <input
                                name='image_url'
                                type="input"
                                maxLength="255"
                                value={profilePic}
                                onChange={(e) => setProfilePic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="accountFormUpdateErrorContainer">
                        <button type="submit">Save</button>
                        <div className="updateAccountError" id={profiePicErrorId}>{picErrorMessage}</div>
                    </div>
                </form>
            </div>
            ) : (
                <div className="accountFormContainer">
                {user?.profile_pic? (
                    <>
                        <div className="topRowAccount" id="profilePicAccount">
                            <div className="accountHeader">Profile Picture</div>
                            <div className="editAccountButton" onClick={() => setShowPicForm(true)}>Edit</div>
                        </div>
                        <div className="userPhoto accountInfo" style={{backgroundImage: `url(${user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
                    </>
                ) : (
                    <>
                        <div className="topRowAccount">
                            <div className="accountHeader">Profile Picture</div>
                            <div className="editAccountButton" onClick={() => setShowPicForm(true)}>Edit</div>
                        </div>
                        <div className="accountInfo">Not set</div>
                    </>
                    )}
                </div>
            )}
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
