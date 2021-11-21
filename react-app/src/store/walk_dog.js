//constants
const LOAD = 'dogsWalks/LOAD_WALKS'

const loadDogsWalks = (walks) => ({
    type: LOAD,
    walks
})

export const loadWalkDogsWalks = (dogId) => async (dispatch) => {
    const response = await fetch(`/api/walks/dog/${dogId}`)
    if (response.ok) {
        const walks = await response.json();
        dispatch(loadDogsWalks(walks))
    }
}

let initialState = {dogsWalks: null};

const dogsWalksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allWalks = {};

            for (let walk of action.walks.walks) {
                allWalks[walk.id] = walk
            }
            return {...allWalks }
        default:
            return state;
    }
}

export default dogsWalksReducer;
