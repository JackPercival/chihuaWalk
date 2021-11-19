import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Footer from './components/Footer/footer';
import SplashPage from './components/SplashPage/SplashPage';
import Browse from './components/Browse/browse';
import Pupload from './components/PupLoad/pupload';
import SingleDog from './components/SingleDog/singleDog';
import YourDogs from './components/YourDogs/yourDogs';
import EditDog from './components/EditDog/editDog';
import YourWalks from './components/YourWalks/yourWalks';
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
                <Route exact path='/' >
                  <SplashPage />
                </Route>
                <Route exact path='/browse' >
                  <Browse />
                </Route>
                <ProtectedRoute exact path='/pupload' >
                  <Pupload />
                </ProtectedRoute>
                <ProtectedRoute exact path='/your-dogs' >
                  <YourDogs />
                </ProtectedRoute>
                <ProtectedRoute exact path='/your-walks' >
                  <YourWalks />
                </ProtectedRoute>
                <Route exact path='/dogs/:dogId' >
                  <SingleDog />
                </Route>
                <ProtectedRoute exact path='/dogs/:dogId/edit' >
                  <EditDog />
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
