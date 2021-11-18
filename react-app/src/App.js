import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Footer from './components/Footer/footer';
import SplashPage from './components/SplashPage/SplashPage';
import Browse from './components/Browse/browse';
import Pupload from './components/PupLoad/pupload';
import ProtectedRoute from './components/auth/ProtectedRoute';

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


  return (
    <>
      {isLoaded && (
        <BrowserRouter>
          <div className="pageContainer" id="pageContainer">
            <Header />
            <div className="mainContent">
              <Switch>
                <Route path='/' exact={true} >
                  <SplashPage />
                </Route>
                <Route path='/browse' exact={true} >
                  <Browse />
                </Route>
                <ProtectedRoute path='/pupload' exact={true}>
                  <Pupload />
                </ProtectedRoute>
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
