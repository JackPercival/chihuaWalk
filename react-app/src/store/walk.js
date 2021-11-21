//constants
const LOAD = 'walks/LOAD_WALKS'
const ADD_WALK = 'walks/ADD_WALK'
const UPDATE_WALK = 'walks/UPDATE_WALK'
const DELETE_WALK = 'walks/DELETE_WALK'

const loadWalks = (walks) => ({
    type: LOAD,
    walks
})

const addWalk = walk => ({
    type: ADD_WALK,
    walk
})

const updateWalk = walk => {
    return {
        type: UPDATE_WALK,
        walk
    }
}

const deleteWalk = walkId => {
  return {
      type: DELETE_WALK,
      walkId
  }
}

export const loadDogsWalks = (dogId) => async (dispatch) => {
    const response = await fetch(`/api/walks/dog/${dogId}`)
    if (response.ok) {
        const walks = await response.json();
        dispatch(loadWalks(walks))
    }
}

export const loadUsersWalks = (userId) => async (dispatch) => {
    const response = await fetch(`/api/walks/user/${userId}`)

    if (response.ok) {
        const walks = await response.json();
        dispatch(loadWalks(walks))
    }
}

export const addNewWalk = (user_id, dog_id, walk_date) => async (dispatch) => {
    const response = await fetch(`/api/walks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        dog_id,
        walk_date
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addWalk(data))
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

export const updatedExistingWalk = (walk_id, walk_date) => async (dispatch) => {
  const response = await fetch(`/api/walks//${walk_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      walk_id,
      walk_date
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(updateWalk(data))
    return ["Updated", data];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    return ["Error"]
  }
}

export const deleteSingleWalk = (walk_id) => async (dispatch) => {
  const response = await fetch(`/api/walks/${walk_id}`, {
      method: 'DELETE',
      body: JSON.stringify({walk_id})
  });

  if (response.ok) {
    dispatch(deleteWalk(walk_id))
    return null;
  } else {
    alert('An error occurred. Please refresh the page and try again.')
  }
}

let initialState = {walks: null};

const walksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allWalks = {};

            for (let walk of action.walks.walks) {
                allWalks[walk.id] = walk
            }
            return {...allWalks }
        case ADD_WALK:
            return {
                ...state,
                [action.walk.id]: action.walk,
            }
        case UPDATE_WALK:
            return {
                ...state,
                [action.walk.id]: action.walk,
            }
        case DELETE_WALK:
            const newState = {...state}
            delete newState[action.walkId];
            return newState;
        default:
            return state;
    }
}

export default walksReducer;
