import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Header from './components/Header/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import './components/overall.css'

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // if (!loaded) {
  //   return 'null';
  // }

  return (
    <>
      {isLoaded && (
        <BrowserRouter>
          <div className="pageContainer" id="pageContainer">
            <Header />
            <Switch>
              <Route path='/' exact={true} >
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>
                <h1>Jack's Home Page</h1>

              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
