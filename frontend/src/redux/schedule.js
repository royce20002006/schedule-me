const GET_ALL_SCHEDULES = 'schedules/getAllSchedules';
const CREATE_SCHEDULE = 'schedules/createSchedule'

const getAllSchedules = (schedules) => ({
    type: GET_ALL_SCHEDULES,
    payload: schedules
})

const createSchedule = (schedule) => ({
    type: CREATE_SCHEDULE,
    payload: schedule
})

export const getSchedulesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/schedules');
        if (res.ok) {
            const data = await res.json();

            dispatch(getAllSchedules(data))
            return data;

        }

    } catch (error) {
        return error;
    }
}
export const createScheduleThunk = (day) => async (dispatch) => {
    try {

        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ day: day })
        }


        const res = await csrfFetch('/api/schedules', options);
        console.log(res, 'res in thunk')
        if (res.ok) {
            const data = await res.json();

            dispatch(createSchedule(data))
            return res;
        }


    } catch (error) {
        return error;
    }
}

const initialState = {
    allSchedules: [],
    byId: {},

};

function schedulesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SCHEDULES: {
            newState = { ...state }
            newState.allSchedules = action.payload.Schedules;



            for (let schedule of action.payload.Schedules) {
                newState.byId[schedule.id] = schedule;
            }

            return newState;
        }

        // case GET_USER_SPOTS: {
        //     newState = { ...state };
        //     newState.currentUser = action.payload.Spots;
        //     return newState;
        // }
        case CREATE_SCHEDULE: {
            newState = { ...state }
            newState.allSchedules = [...newState.allSchedules, action.payload]
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }

        // case DELETE_SPOT: {
        //     newState = { ...state }

        //     const filteredSpots = newState.allSpots.filter(spot => {

        //         return spot.id !== action.payload.id
        //     })

        //     newState.allSpots = filteredSpots

        //     const newById = { ...newState.byId };
        //     delete newById[action.payload.id];
        //     newState.byId = newById;

        //     const filteredUserSpots = newState.currentUser.filter(spot => {

        //         return spot.id !== action.payload.id
        //     })
        //     newState.currentUser = filteredUserSpots;
        //     return newState
        // }
        // case UPDATE_SPOT: {
        //     newState = { ...state }

        //     const spotId = action.payload.id;

        //     const newAllSpots = [];
        //     for (let i = 0; i < newState.allSpots.length; i++) {
        //         let currSpot = newState.allSpots[i];
        //         if (currSpot.id === spotId) {
        //             newAllSpots.push(action.payload);
        //         } else {
        //             newAllSpots.push(currSpot)
        //         }
        //     }

        //     newState.allSpots = newAllSpots;
        //     newState.byId = { ...newState.byId, [spotId]: action.payload };
        //     return newState;
        // }


        default:
            return state;
    }
}

export default schedulesReducer;