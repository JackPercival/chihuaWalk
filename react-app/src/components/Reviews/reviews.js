import React from 'react';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';

import './reviews.css'

const Reviews = ({dog}) => {

  const user = useSelector(state => state.session.user);

  return (
    <div>Reviews Component Goes Here</div>
  );
}

export default Reviews;
