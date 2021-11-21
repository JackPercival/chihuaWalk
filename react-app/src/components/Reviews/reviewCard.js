import React from 'react';

import './reviewCard.css'

const ReviewCard = ({ review, monthFormatter }) => {

    const reviewMonth = monthFormatter[review.date.slice(8,11)];
    const reviewYear = review.date.slice(12,16)
    console.log(reviewYear)

  return (
    <div className="singleReviewContainer">
        <div className="topRowSingleReview">
            <div className="reviewerIcon" style={{backgroundImage: `url(${review.user.profile_pic}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637102034/Capstone/noProfPic_uxrkv7.png)`}}></div>
            <div className="reviewNameAndDate">
                <div className="reviewerName">{review.user.first_name}</div>
                <div className="reviewDate">{`${reviewMonth} ${reviewYear}`}</div>
            </div>
        </div>
        <div className="reviewComment">
            {review.comment}
        </div>
    </div>
  );
}

export default ReviewCard;
