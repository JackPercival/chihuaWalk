import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import { login, logout } from '../../store/session';

import './ProfileButton.css'

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
            {showLoginModal && (
                <div className="loginModal">
                    <div className="formContainer">
                        <h1>Welcome back!</h1>
                        <h2>We're so excited to see you again!</h2>

                        <form id="signUpForm" autoComplete="off" onSubmit={onLogin}>
                            <div className="formField">
                            <label id={loginError}>
                                Email
                            </label>
                            <input

                                name='email'
                                type="text"
                                required
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>
                            {errors.length > 0 && (
                                <span className="loginError"> - Login or password is invalid.</span>
                            )}
                            <div className="formField">
                            <label id={loginError}>
                                Password
                            </label>
                            <input

                                name='password'
                                type="password"
                                required
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                            {errors.length > 0 && (
                                <span className="loginError"> - Login or password is invalid.</span>
                            )}
                            <div className="loginButtons">
                                <button className="formButton" type="submit">Login</button>
                                <button id="demoLoginButton" className="formButton" onClick={demoLogin}>Demo Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileButton;
