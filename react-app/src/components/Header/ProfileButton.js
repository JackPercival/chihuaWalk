import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import { login, logout } from '../../store/session';

import './ProfileButton.css'
import './login.css'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();


    const [showMenu, setShowMenu] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    useEffect(() => {
        if (showSignUpModal || showLoginModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [showSignUpModal, showLoginModal])

      const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
          setErrors(data);
        } else {
            setShowLoginModal(false)
        }
      };

      const demoLogin = async (e) => {

        const demoEmail = 'demo@aa.io';
        const demoPassword = 'password'

        setEmail(demoEmail)
        setPassword(demoPassword)

        await dispatch(login('demo@aa.io', 'password'));
        setShowLoginModal(false)
      };

      const onLogout = async (e) => {
        await dispatch(logout());
      };

    return (
        <>
            <div className="profileButtonAndDropDown">
                <div className="profileButton" onClick={() => setShowMenu(!showMenu)}>
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
                {showMenu && (
                    <div className="profileDropDown">
                        {user? (
                            <div className="loggedInProfileDropDown">
                                <Link to="/your-walks">
                                    <div className="profileDropDownLinks">Walks</div>
                                </Link>
                                <Link to="/your-dogs">
                                    <div className="profileDropDownLinks">Post a pup</div>
                                </Link>
                                <Link to="/account-settings">
                                    <div className="profileDropDownLinks">Account</div>
                                </Link>
                                <div className="dropDownLine"></div>
                                <div className="logOutButton" onClick={onLogout}>Log out</div>
                            </div>
                        ) : (
                            <div className="loggedOutProfileDropDown">
                                <div onClick={() => setShowLoginModal(true)}>Log in</div>
                                <div>Sign up</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showLoginModal && (
                <div className="loginModal">
                    <div className="loginFormContainer">
                        <div className="topRowForm">
                            <div className="xToClose" onClick={() => setShowLoginModal(false)}>
                                <i className="fas fa-times"></i>
                            </div>
                            <h3>Login or sign up</h3>
                            <div></div>
                        </div>
                        <h2>Welcome to chihuaWalk</h2>

                        <form id="signUpForm" autoComplete="off" onSubmit={onLogin}>
                            <div className="formField">
                                <input
                                    name='email'
                                    type="text"
                                    required
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>
                                    Email
                                </label>
                                </div>
                            <div className="formField">
                                <input
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label>Password</label>
                            </div>
                            {errors.length > 0 && (
                                <span className="loginError"> Email or password is invalid.</span>
                            )}
                            <div className="loginButtons">
                                <button className="formButton" type="submit">Login</button>
                                <button id="demoLoginButton" className="formButton" onClick={demoLogin}>Demo Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
