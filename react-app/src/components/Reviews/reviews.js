import React from 'react';
import ReviewCard from './reviewCard';

import './reviews.css'

const Reviews = ({ user, dog, reviews }) => {

  const calculateAvgRatings = () => {

    let totalBehavior = 0;
    let totalKindness = 0;
    let totalQuietness = 0;
    let totalEnergy = 0;

    reviews.forEach(review => {
      totalBehavior += review.behavior
      totalKindness += review.kindness
      totalQuietness += review.quietness
      totalEnergy += review.energy
    })

    const length = reviews.length

    const avgBehavior = (totalBehavior / length).toFixed(1)
    const avgKindness = (totalKindness / length).toFixed(1)
    const avgQuietness = (totalQuietness / length).toFixed(1)
    const avgEnergy = (totalEnergy / length).toFixed(1)
    const avgTotal = ((totalBehavior + totalKindness + totalQuietness + totalEnergy) / (length * 4)).toFixed(2)

    const avgArray = [avgTotal, length, avgBehavior, avgKindness, avgQuietness, avgEnergy]
    return avgArray
  }

  const monthFormatter = {
    'Jan' : 'January',
    'Feb' : 'February',
    'Mar' : 'March',
    'Apr' : 'April',
    'May' : 'May',
    'Jun' : 'June',
    'Jul' : 'July',
    'Aug' : 'August',
    'Sep' : 'September',
    'Oct' : 'October',
    'Nov' : 'November',
    'Dec' : 'December'
}

  const avgRatings = calculateAvgRatings();

  return (
    <div className="reviewsContainer">
      {avgRatings[1] > 0? (
        <>
          <div className="reviewsHeader">
            <div id="reviewStarHeader">
              <i className="fas fa-star"></i>
            </div>
            <div>{avgRatings[0]}</div>
            <div id="reviewPeriod">
              <i className="fas fa-circle"></i>
            </div>
            {avgRatings[1] > 1? (
              <div>{`${avgRatings[1]} reviews`}</div>
            ) : (
              <div>{`1 review`}</div>
            )}
          </div>
          <div className="avgRatingsContainer">
              <div className="avgRatingsRow1">
                <div className="singleAvgRating">
                  <div className="reviewCategory">Behavior</div>
                  <div className="reviewBar">
                  <div className="fullReviewBar">
                      <div className="dynamicReviewBar" style={{width: `${avgRatings[2] * 24}px`}}></div>
                    </div>
                    <div className="avgRatingPerCategory">{avgRatings[3]}</div>
                  </div>
                </div>
                <div className="emptySpace"></div>
                <div className="singleAvgRating">
                  <div className="reviewCategory">Kindess</div>
                  <div className="reviewBar">
                    <div className="fullReviewBar">
                      <div className="dynamicReviewBar" style={{width: `${avgRatings[3] * 24}px`}}></div>
                    </div>
                    <div className="avgRatingPerCategory">{avgRatings[3]}</div>
                  </div>
                </div>
              </div>
              <div className="avgRatingsRow2">
                <div className="singleAvgRating">
                  <div className="reviewCategory">Quietness</div>
                  <div className="reviewBar">
                    <div className="fullReviewBar">
                      <div className="dynamicReviewBar" style={{width: `${avgRatings[4] * 24}px`}}></div>
                    </div>
                    <div className="avgRatingPerCategory">{avgRatings[4]}</div>
                  </div>
                </div>
                <div className="emptySpace"></div>
                <div className="singleAvgRating">
                  <div className="reviewCategory">Energy Level</div>
                  <div className="reviewBar">
                    <div className="fullReviewBar">
                      <div className="dynamicReviewBar" style={{width: `${avgRatings[5] * 24}px`}}></div>
                    </div>
                    <div className="avgRatingPerCategory">{avgRatings[5]}</div>
                  </div>
                </div>
              </div>
          </div>
          <div className="allReviews">
              {reviews.map(review =>
                <ReviewCard review={review} key={review.id} monthFormatter={monthFormatter}/>
              )}
          </div>
        </>
      ) : (
        <div className="reviewsHeader">
          <div id="reviewStarHeader">
            <i className="fas fa-star"></i>
          </div>
          <div className="noReviews">0 reviews</div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
