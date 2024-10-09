const READ_COMMENT = 'comment/readComment'

// const CREATE_SHIFT= 'shift/createShift'
// const DELETE_SHIFT= 'shift/deleteShift'
// const UPDATE_SHIFT = 'shift/updateShift'

const readComment = (comments) => ({
    type:READ_COMMENT,
    payload: comments
})

// const createShift = (shift) => ({
//     type: CREATE_SHIFT,
//     payload: shift
// })
// const deleteShift = (shift) => ({
//     type: DELETE_SHIFT,
//     payload: shift
// })
// const updateShifts = (shift) => ({
//     type: UPDATE_SHIFT,
//     payload: shift
// })

export const readCommentThunk = () => async (dispatch) => {
    try {

        

        const res = await csrfFetch(`/api/comments`);
        
        if (res.ok) {
            const data = await res.json();

            dispatch(readComment(data))
            return res;
        }


    } catch (error) {
        return error;
    }
}

// export const createShiftThunk = (id, shift) => async (dispatch) => {
//     try {

       
//         const options = {
//             method: 'POST',
//             header: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(shift)
//         }

        

//         const res = await csrfFetch(`/api/schedules/${id}/shifts`, options);
        
//         if (res.ok) {
//             const data = await res.json();

//             dispatch(createShift(data))
//             return res;
//         }


//     } catch (error) {
//         return error;
//     }
// }
// export const deleteShiftThunk = (id, shift) => async (dispatch) => {
//     try {

       
//         const options = {
//             method: 'DELETE',
//             header: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(shift)
//         }

        

//         const res = await csrfFetch(`/api/schedules/${id}/shifts/${shift.id}`, options);
        
//         if (res.ok) {
//             const data = await res.json();

//             dispatch(deleteShift(data))
//             return res;
//         }


//     } catch (error) {
//         return error;
//     }
// }

// export const updateShiftThunk = (id, updateShift) => async (dispatch) => {
//     try {

       
//         const options = {
//             method: 'PUT',
//             header: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updateShift)
//         }
//         console.log(updateShift.id)
        

//         const res = await csrfFetch(`/api/schedules/${id}/shifts/${updateShift.id}`, options);
//         console.log(res, 'thunk')
//         if (res.ok) {
            
//             const data = await res.json();
//             console.log(data, 'think')
//             dispatch(updateShifts(data))
//             return res;
//         }


//     } catch (error) {
//         return error;
//     }
// }

const initialState = {
    allComments: [],
    byCommentId: {},

};

function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        
        
        case READ_COMMENT: {
            newState = { ...state };
            newState.allComments = action.payload.Comments;
            for (let comment of action.payload.Comments) {
                newState.byCommentId[comment.id] = comment;
            }

            return newState;

        }
        // case CREATE_SHIFT: {
        //     newState = { ...state }
        //     newState.allShifts = [...newState.allShifts, action.payload]
        //     newState.byId[action.payload.id] = action.payload;
        //     return newState;
        // }
        

        // case DELETE_SHIFT: {
        //     newState = { ...state }

        //     const filteredShifts = newState.allShifts.filter(shift => {

        //         return shift.id !== action.payload.id
        //     })

        //     newState.allShifts = filteredShifts

        //     const newById = { ...newState.byShiftId };
        //     delete newById[action.payload.id];
        //     newState.byShiftId = newById;

            

        //     return newState
        // }
        // case UPDATE_SHIFT: {
        //     newState = { ...state }

        //     const shiftId = action.payload.id;

        //     const newAllShifts = [];
        //     for (let i = 0; i < newState.allShifts.length; i++) {
        //         let currShift = newState.allShifts[i];
        //         if (currShift.id === shiftId) {
        //             newAllShifts.push(action.payload);
        //         } else {
        //             newAllShifts.push(currShift)
        //         }
        //     }

        //     newState.allShifts = newAllShifts;
        //     newState.byShiftId = { ...newState.byShiftId, [shiftId]: action.payload };
        //     return newState;
        // }


        default:
            return state;
    }
}

export default commentReducer;