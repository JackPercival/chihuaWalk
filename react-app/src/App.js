import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/footer';
import SplashPage from './components/SplashPage/SplashPage';
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
                <SplashPage />
              </Route>
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
