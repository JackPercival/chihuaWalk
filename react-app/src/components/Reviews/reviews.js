import React, { useEffect, useState } from 'react';
import ReviewCard from './reviewCard';
import ReviewForm from './reviewForm';

import './reviews.css'

const Reviews = ({ user, dog, reviews }) => {

  const [sortedReviews, setSortedReviews] = useState([])

  //Sort reviews by most recent
  useEffect(() => {
    if (reviews[0] === null) {
      return;
    }

    const sortedReviews = reviews

    sortedReviews.sort(function(a,b) {
      return new Date(b.date) - new Date(a.date)
    })

    setSortedReviews(sortedReviews)

  }, [reviews])


  if (reviews[0] === null) {
    return null;
  }

  const calculateAvgRatings = () => {
    if (reviews[0] === null) {
      return;
    }

    let alreadyReviewed = false;
    let totalBehavior = 0;
    let totalKindness = 0;
    let totalQuietness = 0;
    let totalEnergy = 0;

    reviews?.forEach(review => {
      totalBehavior += review.behavior
      totalKindness += review.kindness
      totalQuietness += review.quietness
      totalEnergy += review.energy

      if (!alreadyReviewed && review.user_id === user?.id) {
        alreadyReviewed = true;
      }
    })

    const length = reviews.length

    const avgBehavior = (totalBehavior / length).toFixed(1)
    const avgKindness = (totalKindness / length).toFixed(1)
    const avgQuietness = (totalQuietness / length).toFixed(1)
    const avgEnergy = (totalEnergy / length).toFixed(1)
    const avgTotal = ((totalBehavior + totalKindness + totalQuietness + totalEnergy) / (length * 4)).toFixed(2)

    const avgArray = [avgTotal, length, avgBehavior, avgKindness, avgQuietness, avgEnergy, alreadyReviewed]
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
  const alreadyReviewed = avgRatings[6]

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
                    <div className="avgRatingPerCategory">{avgRatings[2]}</div>
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
              {sortedReviews.map(review =>
                <ReviewCard review={review} key={review.id} monthFormatter={monthFormatter} user={user}/>
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
      {user?.id && (
        <>
        {!alreadyReviewed && dog?.user_id !== user?.id && (
          <ReviewForm userId={user?.id} dogId={dog?.id} />
        )}
        {alreadyReviewed && dog?.user_id !== user?.id && (
          <div className="addReviewContainer">
            <div className="addAReview alreadyAdded">You have already submitted a review</div>
          </div>
        )}
        {dog?.user_id === user?.id && (
          <div className="addReviewContainer">
            <div className="addAReview alreadyAdded">You cannot add a review to your own dog</div>
          </div>
        )}
        </>
      )}
    </div>
  );
}

export default Reviews;
