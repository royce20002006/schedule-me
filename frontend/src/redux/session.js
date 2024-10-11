import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ALL_USERS = 'session/allUsers'

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

const allUsers = (users) => ({
    type: ALL_USERS,
    payload: users
})



// export const allUsersThunk = () => async(dispatch) => {
//     try {
//         const response = await csrfFetch('api/users/all')
//         if(response.ok) {
           
//             const data = await response.json();
            
//             dispatch(allUsers(data))
//         }
        
//     } catch (error) {
//         return error
//     }
// }
export const thunkAuthenticate = () => async (dispatch) => {
    try{
        const response = await csrfFetch("/api/restore-user");
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        }
    } catch (e){
        return e
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    
    const {email, password} = credentials
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({credential: email, password})
    });

    if (response.ok) {

        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {

        const errorMessages = await response.json();
        
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    console.log(user, 'user in thunk')
    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    console.log(response.status, 'status')

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        console.log(errorMessages, 'inthunk')
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};


const initialState = { user: null, allUsers: [], byId: {} };

function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case ALL_USERS:
            newState = {...state}
            newState.allUsers = action.payload
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
