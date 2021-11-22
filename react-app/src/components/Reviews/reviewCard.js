import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSingleReview } from '../../store/review';

import './reviewCard.css'

const ReviewCard = ({ review, monthFormatter, user }) => {
    const dispatch = useDispatch();

    const [showDelete, setShowDelete] = useState(false);

    const reviewMonth = monthFormatter[review.date.slice(8,11)];
    const reviewYear = review.date.slice(12,16)

    const deleteWalk = async () => {
        dispatch(deleteSingleReview(review.id))
        setShowDelete(false)
    }

  return (
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
                        <div>Edit</div>
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
                    <div id="confirmWalkDeletionCancelButton" onClick={deleteWalk}>Delete Review</div>
                    <div id="cancelDogDelete" onClick={() => setShowDelete(false)}>Go Back</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
