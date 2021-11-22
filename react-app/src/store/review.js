//constants
const LOAD = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEWS'
// const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEWS'

const loadReviews = (reviews) => ({
    type: LOAD,
    reviews
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

// const updateWalk = review => {
//     return {
//         type: UPDATE_REVIEW,
//         review
//     }
// }

const deleteReview = reviewId => {
  return {
      type: DELETE_REVIEW,
      reviewId
  }
}

export const loadDogsReviews = (dogId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/dog/${dogId}`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews))
    }
}

export const addNewReview = (user_id, dog_id, comment, behavior, kindness, quietness, energy) => async (dispatch) => {
    const response = await fetch(`/api/reviews/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        dog_id,
        comment,
        behavior,
        kindness,
        quietness,
        energy
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addReview(data))
      return ["Created", data];
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return ["Error", data.errors];
      }
    } else {
      return["Error"]
    }
}

// export const updatedExistingWalk = (walk_id, walk_date) => async (dispatch) => {
//   const response = await fetch(`/api/walks/${walk_id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       walk_id,
//       walk_date
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(updateWalk(data))
//     return ["Updated", data];
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return ["Error", data.errors];
//     }
//   } else {
//     return ["Error"]
//   }
// }

export const deleteSingleReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
      body: JSON.stringify({reviewId})
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId))
    return null;
  } else {
    alert('An error occurred. Please refresh the page and try again.')
  }
}

let initialState = {reviews: null};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allReviews = {};

            for (let review of action.reviews.reviews) {
                allReviews[review.id] = review
            }
            return {...allReviews }
        case ADD_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review,
            }
        // case UPDATE_REVIEW:
        //     return {
        //         ...state,
        //         [action.review.id]: action.review,
        //     }
        case DELETE_REVIEW:
            const newState = {...state}
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
