import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { loadAllDogs } from '../../store/dog';

const DogHolder = ({dog}) => {



  return (
    <>
        <h1>Dog</h1>
    </>
  );
}

export default DogHolder;
