import React from 'react';
// import { useSelector } from 'react-redux';
// import {  Link } from 'react-router-dom';

import './reviews.css'

const Reviews = ({ user, dog, reviews }) => {

  const calculateAvgRatings = () => {

    let totalBehavior = 0;
    let totalKindness = 0;
    let totalQuietness = 0;
    let totalEnergy = 0;
    let totalAvg = 0;

    reviews.forEach(review => {
      totalBehavior += review.behavior
      totalKindness += review.kindness
      totalQuietness += review.quietness
      totalEnergy += review.energy
      totalAvg += review.avgRating
    })

    const length = reviews.length

    const avgBehavior = (totalBehavior / length).toFixed(2)
    const avgKindness = (totalKindness / length).toFixed(2)
    const avgQuietness = (totalQuietness / length).toFixed(2)
    const avgEnergy = (totalEnergy / length).toFixed(2)
    const avgTotal = (totalAvg / length).toFixed(2)

    const avgArray = [avgTotal, length, avgBehavior, avgKindness, avgQuietness, avgEnergy]
    return avgArray
  }

  const avgRatings = calculateAvgRatings();

  return (
    <div className="reviewsContainer">
      <div className="reviewsHeader">
        <div id="reviewStarHeader">
          <i className="fas fa-star"></i>
        </div>
        <div>{avgRatings[0]}</div>
        <div id="reviewPeriod">
          <i className="fas fa-circle"></i>
        </div>
        <div>{`${avgRatings[1]} reviews`}</div>
      </div>
    </div>
  );
}

export default Reviews;
