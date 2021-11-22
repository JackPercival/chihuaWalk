import React, { useState } from 'react';
import ReviewCard from './reviewCard';
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import { addNewReview } from '../../store/review';

import './reviews.css'

const Reviews = ({ user, dog, reviews }) => {

  const dispatch = useDispatch();

  const [behaviorRating, setBehaviorRating] = useState(0);
  const [kindessRating, setKindessRating] = useState(0);
  const [quietnessRating, setQuietnessRating] = useState(0);
  const [energyRating, setEnergyRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);

  const calculateAvgRatings = () => {
    if (reviews[0] === null) {
      break;
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!behaviorRating || !kindessRating || !quietnessRating || !energyRating || !comment) {
      setShowError(true)
      return;
    }

    const data = await dispatch(addNewReview(user.id, dog.id, comment, behaviorRating, kindessRating, quietnessRating, energyRating))

    if (data[0] === "Error") {
      setShowError(true)
    } else {

      //Reset the form in case the user deletes their comment right after creating it
      setBehaviorRating(0);
      setKindessRating(0);
      setQuietnessRating(0);
      setEnergyRating(0);
      setComment('');
      setShowError(false)

      //Scroll to the top of the reviews so you can see your review
      let location = document.querySelector("#reviewStarHeader").scrollIntoView({behavior: 'smooth' });

    }
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
              {reviews.map(review =>
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
          <div className="addReviewContainer">
            <div className="addAReview">Add a Review</div>
            <div className="avgRatingsContainer">
              <div className="avgRatingsRow1">
                <div className="singleAvgRating addRatingCategory">
                  <div className="reviewCategory">Behavior</div>
                  <Rating onClick={(rating) => setBehaviorRating(rating)} ratingValue={behaviorRating} fillColor={'rgb(255,56,93)'}/>
                </div>
                <div className="emptySpace"></div>
                <div className="singleAvgRating addRatingCategory">
                  <div className="reviewCategory">Kindess</div>
                  <Rating onClick={(rating) => setKindessRating(rating)} ratingValue={kindessRating} fillColor={'rgb(255,56,93)'}/>
                </div>
              </div>
              <div className="avgRatingsRow2">
                <div className="singleAvgRating addRatingCategory">
                  <div className="reviewCategory">Quietness</div>
                  <Rating onClick={(rating) => setQuietnessRating(rating)} ratingValue={quietnessRating} fillColor={'rgb(255,56,93)'}/>
                </div>
                <div className="emptySpace"></div>
                <div className="singleAvgRating addRatingCategory">
                  <div className="reviewCategory">Energy Level</div>
                  <Rating onClick={(rating) => setEnergyRating(rating)} ratingValue={energyRating} fillColor={'rgb(255,56,93)'}/>
                </div>
              </div>
              <div className="commentBox">
                <form className="commentForm" onSubmit={handleSubmitReview}>
                  <div className="commentHolder">
                    <label>Comment</label>
                    <textarea
                      className="commentBoxInput"
                      name='description'
                      type="input"
                      required
                      autoComplete="off"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="reviewButtonContainer">
                    <div>
                      {showError && (
                        <div className="addReviewError">Please fill out all fields</div>
                      )}
                    </div>
                    <button type="submit">Submit Review</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
