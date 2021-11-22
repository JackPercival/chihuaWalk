import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { deleteSingleReview, updatedExistingReview } from '../../store/review';

import './reviewCard.css'

const ReviewCard = ({ review, monthFormatter, user }) => {
    const dispatch = useDispatch();


    const [behaviorRating, setBehaviorRating] = useState(0);
    const [kindessRating, setKindessRating] = useState(0);
    const [quietnessRating, setQuietnessRating] = useState(0);
    const [energyRating, setEnergyRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showError, setShowError] = useState(false);

    const reviewMonth = monthFormatter[review.date.slice(8,11)];
    const reviewYear = review.date.slice(12,16)

    useEffect(() => {
        setBehaviorRating(review?.behavior);
        setKindessRating(review?.kindness);
        setQuietnessRating(review?.quietness);
        setEnergyRating(review?.energy);
        setComment(review?.comment);
    }, [review])

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

    const deleteReview = async () => {
        dispatch(deleteSingleReview(review.id))
        setShowDelete(false)
    }

    const updateReview = async (e) => {
        e.preventDefault();

        const data = await dispatch(updatedExistingReview(review.id, comment, behaviorRating, kindessRating, quietnessRating, energyRating))
        if (data[0] === "Updated") {
            setShowUpdate(false)
        } else {
            setShowError(true)
        }
    }

    const closeUpdateForm = () => {
        setBehaviorRating(review?.behavior);
        setKindessRating(review?.kindness);
        setQuietnessRating(review?.quietness);
        setEnergyRating(review?.energy);
        setComment(review?.comment);
        setShowUpdate(false)
    }

  return (
      <>
        <div className="singleReviewContainer">
            <div className="topRowSingleReview">
                {review.user.profile_pic? (
                    <div className="reviewerIcon" style={{backgroundImage: `url(${review.user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
                ) : (
                    <div className="reviewerIcon" style={{backgroundImage: `url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
                )}
                <div className="reivewNameDateAndButtons">
                    <div className="reviewNameAndDate">
                        <div className="reviewerName">{review.user.first_name}</div>
                        <div className="reviewDate">{`${reviewMonth} ${reviewYear}`}</div>
                    </div>
                    {review.user_id === user?.id && (
                        <div className="editDeleteReviewButtons">
                            <div onClick={() => setShowUpdate(true)}>Edit</div>
                            <div id="deleteReviewButton" onClick={() => setShowDelete(true)}>Delete</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="reviewComment">
                {review.comment}
            </div>
            {showDelete && (
            <div className="loginModal">
                <div className="deleteDogForm">
                    <div className="xToClose" onClick={() => setShowDelete(false)}>
                        <i className="fas fa-times"></i>
                    </div>
                    <div className="areYouSureDogDelete">{`Are you sure you want to delete your review?`}</div>
                    <div className="dogDeleteConfirmButtons" id="walkDeleteConfirmButtons">
                        <div id="confirmWalkDeletionCancelButton" onClick={deleteReview}>Delete Review</div>
                        <div id="cancelDogDelete" onClick={() => setShowDelete(false)}>Go Back</div>
                    </div>
                </div>
            </div>
            )}
            {showUpdate && (
                <div className="loginModal">
                    <div className="deleteDogForm" id="updateReviewForm">
                        <div className="xToClose" onClick={closeUpdateForm}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="areYouSureDogDelete" id="updateReviewHeader">Update Review</div>
                        <div className="avgRatingsContainer">
                            <div className="avgRatingsRow1">
                            <div className="singleAvgRating addRatingCategory">
                                <div className="reviewCategory">Behavior</div>
                                <Rating onClick={(rating) => setBehaviorRating(rating)} ratingValue={behaviorRating} fillColor={'rgb(255,56,93)'}/>
                            </div>
                            <div className="emptySpace" id="updateEmptySpace1"></div>
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
                            <div className="emptySpace" id="updateEmptySpace2"></div>
                            <div className="singleAvgRating addRatingCategory">
                                <div className="reviewCategory">Energy Level</div>
                                <Rating onClick={(rating) => setEnergyRating(rating)} ratingValue={energyRating} fillColor={'rgb(255,56,93)'}/>
                            </div>
                        </div>
                            <div className="commentBox">
                                <form className="commentForm" onSubmit={updateReview}>
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
                                        <button type="submit">Update Review</button>
                                        <button id="goBackUpdateReviewButton" type="button" onClick={closeUpdateForm}>Go Back</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </>
  );
}

export default ReviewCard;
