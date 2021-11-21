//constants
const LOAD = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEWS'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEWS'

const loadReviews = (reviews) => ({
    type: LOAD,
    reviews
})

// const addWalk = walk => ({
//     type: ADD_WALK,
//     walk
// })

// const updateWalk = walk => {
//     return {
//         type: UPDATE_WALK,
//         walk
//     }
// }

// const deleteWalk = walkId => {
//   return {
//       type: DELETE_WALK,
//       walkId
//   }
// }

export const loadDogsReviews = (dogId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/dog/${dogId}`)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews))
    }
}

// export const loadUsersWalks = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/walks/user/${userId}`)

//     if (response.ok) {
//         const walks = await response.json();
//         dispatch(loadWalks(walks))
//     }
// }

// export const addNewWalk = (user_id, dog_id, walk_date) => async (dispatch) => {
//     const response = await fetch(`/api/walks/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_id,
//         dog_id,
//         walk_date
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(addWalk(data))
//       return ["Created", data];
//     } else if (response.status < 500) {
//       const data = await response.json();
//       if (data.errors) {
//         return ["Error", data.errors];
//       }
//     } else {
//       return["Error"]
//     }
// }

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

// export const deleteSingleWalk = (walk_id) => async (dispatch) => {
//   const response = await fetch(`/api/walks/${walk_id}`, {
//       method: 'DELETE',
//       body: JSON.stringify({walk_id})
//   });

//   if (response.ok) {
//     dispatch(deleteWalk(walk_id))
//     return null;
//   } else {
//     alert('An error occurred. Please refresh the page and try again.')
//   }
// }

let initialState = {reviews: null};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allReviews = {};

            for (let review of action.reviews.reviews) {
                allReviews[review.id] = review
            }
            return {...allReviews }
        // case ADD_WALK:
        //     return {
        //         ...state,
        //         [action.walk.id]: action.walk,
        //     }
        // case UPDATE_WALK:
        //     return {
        //         ...state,
        //         [action.walk.id]: action.walk,
        //     }
        // case DELETE_WALK:
        //     const newState = {...state}
        //     delete newState[action.walkId];
        //     return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
