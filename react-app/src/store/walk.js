//constants
const LOAD = 'walks/LOAD_WALKS'
const ADD_DOG = 'dogs/ADD_DOG'
const UPDATE_DOG = 'dogs/UPDATE_DOG'
const DELETE_DOG = 'dogs/DELETE_DOG'

const loadWalks = (walks) => ({
    type: LOAD,
    walks
})

const addDog = dog => ({
    type: ADD_DOG,
    dog
})

const updateDog = dog => {
    return {
        type: UPDATE_DOG,
        dog
    }
}

const deleteDog = dogId => {
  return {
      type: DELETE_DOG,
      dogId
  }
}


export const loadDogsWalks = (dogId) => async (dispatch) => {
    console.log(dogId)
    const response = await fetch(`/api/walks/dog/${dogId}`)
    console.log(response)
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

// export const addNewDog = (user_id, name, breed, description, weight, address, city, state, country, latitude, longitude, image1, image2, image3) => async (dispatch) => {
//     const response = await fetch(`/api/dogs/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_id,
//         name,
//         breed,
//         description,
//         weight,
//         address,
//         city,
//         state,
//         country,
//         latitude,
//         longitude,
//         image1,
//         image2,
//         image3,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(addDog(data))
//       return ["Created", data];
//     } else if (response.status < 500) {
//       const data = await response.json();
//       if (data.errors) {
//         return ["Error", data.errors];
//       }
//     } else {
//       alert('An error occurred. Please refresh the page and try again.')
//       return["Error"]
//     }
// }

// export const updatedExistingDog = (dog_id, user_id, name, breed, description, weight, address, city, state, country, latitude, longitude, image1, image2, image3) => async (dispatch) => {
//   const response = await fetch(`/api/dogs/${dog_id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       user_id,
//       name,
//       breed,
//       description,
//       weight,
//       address,
//       city,
//       state,
//       country,
//       latitude,
//       longitude,
//       image1,
//       image2,
//       image3,
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(updateDog(data))
//     return ["Created", data];
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return ["Error", data.errors];
//     }
//   } else {
//     alert('An error occurred. Please refresh the page and try again.')
//     return["Error"]
//   }
// }

// export const deleteSingleDog = (dog_id) => async (dispatch) => {
//   const response = await fetch(`/api/dogs/${dog_id}`, {
//       method: 'DELETE',
//       body: JSON.stringify({dog_id})
//   });

//   if (response.ok) {
//     dispatch(deleteDog(dog_id))
//     return null;
//   } else {
//     alert('An error occurred. Please refresh the page and try again.')
//   }
// }

let initialState = {dogs: null};

const walksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allWalks = {};

            for (let walk of action.walks.walks) {
                allWalks[walk.id] = walk
            }
            return {...allWalks }
        case ADD_DOG:
            return {
                ...state,
                [action.dog.id]: action.dog,
            }
        case UPDATE_DOG:
            return {
                ...state,
                [action.dog.id]: action.dog,
            }
        case DELETE_DOG:
            const newState = {...state}
            delete newState[action.dogId];
            return newState;
        default:
            return state;
    }
}

export default walksReducer;
