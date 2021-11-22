import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import { addNewReview } from '../../store/review';


const ReviewForm = ({ userId, dogId }) => {

  const dispatch = useDispatch();

  const [behaviorRating, setBehaviorRating] = useState(0);
  const [kindessRating, setKindessRating] = useState(0);
  const [quietnessRating, setQuietnessRating] = useState(0);
  const [energyRating, setEnergyRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);

  //Clean up function
  useEffect(() => {
    return () => {
        setBehaviorRating(0);
        setKindessRating(0);
        setQuietnessRating(0);
        setEnergyRating(0);
        setComment('');
        setShowError(false)
    }
  }, [])


  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!behaviorRating || !kindessRating || !quietnessRating || !energyRating || !comment) {
      setShowError(true)
      return;
    }

    const data = await dispatch(addNewReview(userId, dogId, comment, behaviorRating, kindessRating, quietnessRating, energyRating))

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
      document.querySelector("#reviewStarHeader").scrollIntoView({behavior: 'smooth' });

    }
  }

  return (
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
  )
}

export default ReviewForm;
