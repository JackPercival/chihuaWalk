import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, logout } from '../../store/session';
import { signUp } from '../../store/session';

import './ProfileButton.css'
import './login.css'
import './signup.css'

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    const [errors, setErrors] = useState([]);
    const [signUpErrors, setSignUpErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const [passwordLable, setPasswordLabel] = useState('passwordLable')
    const [emailLable, setEmailLabel] = useState('emailLable')
    const [firstNameLable, setFirstNameLabel] = useState('firstNameLable')
    const [lastNameLable, setLastNameLabel] = useState('lastNameLable')
    const [borderError, setBorderError] = useState('noBorderError')
    const [loginError, setLoginError] = useState('hidden')

    const [signUpEmailError, setSignUpEmailError] = useState('noEmailErrorYet')
    const [signUpEmailErrorMessaage, setSignUpEmailErrorMessage] = useState('')
    const [signUpEmailErrorVisible, setSignUpEmailErrorVisible] = useState('hidden')

    const [firstNameError, setFirstNameError] = useState('noFirstNameErrorYet')
    const [firstNameErrorMessaage, setFirstNameErrorMessage] = useState('')
    const [firstNameErrorVisible, setFirstNameErrorVisible] = useState('hidden')

    const [lastNameError, setLastNameError] = useState('noLastNameErrorYet')
    const [lastNameErrorMessaage, setLastNameErrorMessage] = useState('')
    const [lastNameErrorVisible, setLastNameErrorVisible] = useState('hidden')

    const [passwordError, setPasswordError] = useState('noPasswordErrorYet')
    const [passwordErrorMessaage, setPasswordErrorMessage] = useState('')
    const [passwordErrorVisible, setPasswordErrorVisible] = useState('hidden')

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

            //Hide the carrousel buttons
            const arrows = document.querySelectorAll(".react-slideshow-container .nav")

            for (let x = 0; x < arrows.length; x++) {
                arrows[x].style.zIndex = 0;
            }

        } else {
            document.body.style.overflowY = 'auto';
            const arrows = document.querySelectorAll(".react-slideshow-container .nav")

            for (let x = 0; x < arrows.length; x++) {
                arrows[x].style.zIndex = 10;
            }
        }

    }, [showSignUpModal, showLoginModal])

    useEffect(() => {
        if (password.length > 0) {
            setPasswordLabel('passwordSet')
        } else {
            setPasswordLabel('passwordLable')
        }
    }, [password.length])

    useEffect(() => {
        if (email.length > 0) {
            setEmailLabel('emailSet')
        } else {
            setEmailLabel('emailLable')
        }
    }, [email.length])

    useEffect(() => {
        if (firstName.length > 0) {
            setFirstNameLabel('firstNameSet')
        } else {
            setFirstNameLabel('firstNameLable')
        }
    }, [firstName.length])

    useEffect(() => {
        if (lastName.length > 0) {
            setLastNameLabel('lastNameSet')
        } else {
            setLastNameLabel('lastNameLable')
        }
    }, [lastName.length])

    useEffect(() => {
        if (errors.length > 0) {
            setLoginError('visible')
        }
    }, [errors])

    useEffect(() => {
        resetErrors();
        if (signUpErrors.length) {
            for (const error of signUpErrors) {
                let errorArray = error.split(" : ")
                if (errorArray[0] === "email") {
                    setSignUpEmailError("signUpEmailError")
                    setSignUpEmailErrorMessage(errorArray[1])
                    setSignUpEmailErrorVisible('visible')
                } else if (errorArray[0] === "first_name") {
                    setFirstNameError("firstNameError")
                    setFirstNameErrorMessage(errorArray[1])
                    setFirstNameErrorVisible('visible')
                } else if (errorArray[0] === "last_name") {
                    setLastNameError("lastNameError")
                    setLastNameErrorMessage(errorArray[1])
                    setLastNameErrorVisible('visible')
                } else if (errorArray[0] === "password") {
                    setPasswordError("passwordError")
                    setPasswordErrorMessage(errorArray[1])
                    setPasswordErrorVisible('visible')
                }
            }
        }
    }, [signUpErrors])

      const onLogin = async (e) => {
        e.preventDefault();
        const cleanEmail = email.toLowerCase()
        const data = await dispatch(login(cleanEmail, password));
        if (data) {
          setErrors(data);
          setBorderError('borderError')
        } else {
            resetLoginForm()
        }
      };

      const demoLogin = async (e) => {

        const demoEmail = 'demo@aa.io';
        const demoPassword = 'password'

        setEmail(demoEmail)
        setPassword(demoPassword)

        await dispatch(login('demo@aa.io', 'password'));
        resetLoginForm()
      };

      const onLogout = async (e) => {
        await dispatch(logout());
      };

      const resetLoginForm = () => {
        setShowLoginModal(false)
        setErrors([])
        setEmail('')
        setPassword('')
        setPasswordLabel('passwordLable')
        setEmailLabel('emailLable')
        setBorderError('noBorderError')
        setLoginError('hidden')
      }

      const onSignUp = async (e) => {
        e.preventDefault();
        const cleanEmail = email.toLocaleLowerCase()
          const data = await dispatch(signUp(firstName, lastName, cleanEmail, password));
          if (data) {
            setSignUpErrors(data)
        } else {
            resetSignUpForm()
        }
      };

      const resetSignUpForm = () => {
        setShowSignUpModal(false)
        setSignUpErrors([])
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        resetErrors()
      }

      const resetErrors = () => {
        setSignUpEmailError('noEmailErrorYet')
        setSignUpEmailErrorMessage('')
        setSignUpEmailErrorVisible('hidden')
        setFirstNameError("noFirstNameErrorYet")
        setFirstNameErrorMessage('')
        setFirstNameErrorVisible('hidden')
        setLastNameError("noLastNameErrorYet")
        setLastNameErrorMessage('')
        setLastNameErrorVisible('hidden')
        setPasswordError("noPasswordErrorYet")
        setPasswordErrorMessage(''[1])
        setPasswordErrorVisible('hidden')
      }

    return (
        <>
            <div className="profileButtonAndDropDown">
                <div className="profileButton" onClick={() => setShowMenu(!showMenu)}>
                    <div className="threeLines">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    {user ? (
                        <>
                        {user.profile_pic ? (
                            <div className="profileButtonUserIcon" style={{backgroundImage: `url(${user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
                        ) : (
                            <div className="profileButtonUserIcon" style={{backgroundImage: 'url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png'}}></div>
                        )}
                        </>
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
                                    <div className="profileDropDownLinks">Your dogs</div>
                                </Link>
                                <Link to="/pupload">
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
                                <div onClick={() => setShowSignUpModal(true)}>Sign up</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showLoginModal && (
                <div className="loginModal">
                    <div className="loginFormContainer">
                        <div className="topRowForm">
                            <div className="xToClose" onClick={resetLoginForm}>
                                <i className="fas fa-times"></i>
                            </div>
                            <h3>Login</h3>
                            <div></div>
                        </div>
                        <h2>Welcome to chihuaWalk</h2>
                        <form id="signUpForm" autoComplete="off" onSubmit={onLogin}>
                            <div className="formField">
                                <input
                                    className={borderError}
                                    name='email'
                                    type="text"
                                    required
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label id={emailLable}>Email</label>
                                </div>
                            <div className="formField">
                                <input
                                    className={borderError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label id={passwordLable}>Password</label>
                            </div>
                            <div className="loginError" style={{visibility: loginError}}>
                                <div>!</div>
                                <span> Email or password is invalid.</span>
                            </div>
                            <div className="loginButtons">
                                <button className="formButton" type="submit">Login</button>
                                <button id="demoLoginButton" className="formButton" onClick={demoLogin}>Demo Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showSignUpModal && (
                <div className="loginModal">
                    <div className="loginFormContainer">
                        <div className="topRowForm">
                            <div className="xToClose" onClick={resetSignUpForm}>
                                <i className="fas fa-times"></i>
                            </div>
                            <h3>Sign up</h3>
                            <div></div>
                        </div>
                        <h2>Welcome to chihuaWalk</h2>
                        <form id="signUpForm" autoComplete="off" onSubmit={onSignUp}>
                            <div className="formField">
                                <input
                                    id={firstNameError}
                                    name='email'
                                    type="text"
                                    required
                                    autoComplete="off"
                                    maxLength="60"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <label id={firstNameLable}>First Name</label>
                                <div className="loginError" style={{visibility: firstNameErrorVisible}}>
                                    <div>!</div>
                                    <span>{firstNameErrorMessaage}</span>
                                </div>
                            </div>
                            <div className="formField">
                                <input
                                    id={lastNameError}
                                    name='email'
                                    type="text"
                                    required
                                    autoComplete="off"
                                    maxLength="60"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <label id={lastNameLable}>Last Name</label>
                                <div className="loginError" style={{visibility: lastNameErrorVisible}}>
                                    <div>!</div>
                                    <span>{lastNameErrorMessaage}</span>
                                </div>
                            </div>
                            <div className="formField">
                                <input
                                    id={signUpEmailError}
                                    name='email'
                                    type="text"
                                    required
                                    autoComplete="off"
                                    maxLength="255"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label id={emailLable}>Email</label>
                            </div>
                            <div className="loginError" style={{visibility: signUpEmailErrorVisible}}>
                                <div>!</div>
                                <span>{signUpEmailErrorMessaage}</span>
                            </div>
                            <div className="formField">
                                <input
                                    id={passwordError}
                                    name='password'
                                    type="password"
                                    required
                                    autoComplete="off"
                                    maxLength="100"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label id={passwordLable}>Password</label>
                            </div>
                            <div className="loginError" style={{visibility: passwordErrorVisible}}>
                                <div>!</div>
                                <span>{passwordErrorMessaage}</span>
                            </div>
                            <div className="loginButtons">
                                <button className="formButton" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
