import { useEffect } from 'react';
import {  Link } from 'react-router-dom';

import './pageNotFound.css'

function PageNotFound() {

    useEffect(() => {
        document.title = `Page not found · ChihuaWalk`;
    }, []);

    return (
        <div className="container404">
            <div className="content404">
                <div className="left404">
                    <h1>Oops!</h1>
                    <p className="cantFind">We can't seem to find the page you're looking for.</p>
                    <p>Here are some helpful links instead:</p>
                    <div className="suggestedPages">
                        <Link to="/">Home</Link>
                        <Link to="/search">Search</Link>
                    </div>
                </div>
                <img className="img404" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637624502/Capstone/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69_xbynqw.gif" alt="404 gif"/>
            </div>
        </div>
    )
}

export default PageNotFound;
