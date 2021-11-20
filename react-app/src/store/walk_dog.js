//constants
const ADD_WALKS = 'walks/ADD_WALKS'

const addWalks = (walks, dogId) => ({
    type: ADD_WALKS,
    walks,
    dogId
})

// const deleteWalk = walkId => {
//   return {
//       type: DELETE_WALK,
//       walkId
//   }
// }


export const addWalkDogsWalks = (dogId) => async (dispatch) => {
    console.log("*****************")
    const response = await fetch(`/api/walks/dog/${dogId}`)
    if (response.ok) {
        const walks = await response.json();
        dispatch(addWalks(walks, dogId))
    }
}

let initialState = {dogsWalks: null};

const dogsWalksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WALKS:
            if (action.dogId in state) {
                return state;
            } else {
                return {
                    ...state,
                    [action.dogId]: action.walks,
                }
            }
        default:
            return state;
    }
}

export default dogsWalksReducer;
