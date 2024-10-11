import { csrfFetch } from "./csrf";


const GET_ALL_USERS = 'users/getAllUsers';


const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users
  }
}



export const getAllUsersThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      await dispatch(getAllUsers(data))
    } else {
      throw res
    }
  } catch(error) {
    return error
  }
}

const initialState = {
  
  allUsers: []
}

const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    
    case GET_ALL_USERS:
      newState = {...state};
      newState.allUsers = action.payload;
      return newState;
    default:
      return state
  }
}

export default userReducer;