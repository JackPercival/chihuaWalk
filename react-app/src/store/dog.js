//constants
const LOAD = 'dogs/LOAD_DOGS'
const ADD_DOG = 'dogs/ADD_DOG'
const UPDATE_DOG = 'dogs/UPDATE_DOG'
const DELETE_DOG = 'dogs/DELETE_DOG'

const loadDogs = (dogs) => ({
    type: LOAD,
    dogs
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


export const loadAllDogs = () => async (dispatch) => {
    const response = await fetch(`/api/dogs/`)

    if (response.ok) {
        const dogs = await response.json();
        dispatch(loadDogs(dogs))
    }
}

export const addNewDog = (user_id, name, breed, description, weight, address, city, state, country, latitude, longitude) => async (dispatch) => {
    const response = await fetch(`/api/dogs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        name,
        breed,
        description,
        weight,
        address,
        city,
        state,
        country,
        latitude,
        longitude,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      // for (let x = 0; x < cleanImages.length; x++) {

      //   const form = new FormData();
      //   form.append('image', cleanImages[x])
      //   form.append('dog_id', data.id)
      //   console.log("Inside this if statement")

      //   const res = await fetch('/api/dogs/images', {
      //     method: "POST",
      //     body: form
      //   });
      // }


      dispatch(addDog(data))
      return ["Created", data];
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return ["Error", data.errors];
      }
    } else {
      alert('An error occurred. Please refresh the page and try again.')
      return["Error"]
    }
}

export const uploadFile = (fileForm) => async (dispatch) => {
  const {
      dog_id,
      file,
      newFile
  } = fileForm

  const form = new FormData();
  form.append("file", file);
  form.append("dog_id", dog_id);
  form.append("newFile", newFile);

  const res = await fetch("/api/dogs/images", {
    method: "POST",
    body: form,
  });

}

export const updatedExistingDog = (dog_id, user_id, name, breed, description, weight, address, city, state, country, latitude, longitude, image1, image2, image3) => async (dispatch) => {
  const response = await fetch(`/api/dogs/${dog_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      name,
      breed,
      description,
      weight,
      address,
      city,
      state,
      country,
      latitude,
      longitude,
      image1,
      image2,
      image3,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateDog(data))
    return ["Created", data];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    alert('An error occurred. Please refresh the page and try again.')
    return["Error"]
  }
}

export const deleteSingleDog = (dog_id) => async (dispatch) => {
  const response = await fetch(`/api/dogs/${dog_id}`, {
      method: 'DELETE',
      body: JSON.stringify({dog_id})
  });

  if (response.ok) {
    dispatch(deleteDog(dog_id))
    return null;
  } else {
    alert('An error occurred. Please refresh the page and try again.')
  }
}

let initialState = {dogs: null};

const dogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allDogs = {};

            for (let dog of action.dogs.dogs) {
                allDogs[dog.id] = dog
            }
            return {...allDogs }
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

export default dogsReducer;
