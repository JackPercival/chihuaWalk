// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_NAME'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (first_name, last_name, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateUserName = (userId, first_name, last_name) => async (dispatch) => {
  const response = await fetch(`/api/users/name/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
    return ["Updated"];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    return ['Error','An error occurred. Please try again.']
  }
}

export const updateUserEmail = (userId, email) => async (dispatch) => {
  const response = await fetch(`/api/users/email/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
    return ["Updated"];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    return ['Error','email : An error occurred. Please try again.']
  }
}

export const updateUserPicture = (userId, profile_pic) => async (dispatch) => {
  const response = await fetch(`/api/users/picture/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profile_pic
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
    return ["Updated"];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    return ['Error','profile_pic : An error occurred. Please try again.']
  }
}

export const updateUserPassword = (userId, password) => async (dispatch) => {
  const response = await fetch(`/api/users/password/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password
    }),
  });
  if (response.ok) {
    return ["Updated"];
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return ["Error", data.errors];
    }
  } else {
    return ['Error','An error occurred. Please try again.']
  }
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case UPDATE_USER:
      return {user: action.payload}
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
