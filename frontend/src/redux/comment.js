const READ_COMMENT = 'comment/readComment'

const CREATE_COMMENT= 'comment/createComment'
const DELETE_COMMENT= 'comment/deleteComment'
const UPDATE_COMMENT = 'comment/updateComment'

const readComment = (comments) => ({
    type:READ_COMMENT,
    payload: comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})
const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    payload: comment
})
const updateComments = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

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

export const createCommentThunk = (id, shiftId,comment) => async (dispatch) => {
    try {

       
        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }

        

        const res = await csrfFetch(`/api/schedules/${id}/shifts/${shiftId}/comments`, options);
        
        if (res.ok) {
            const data = await res.json();

            dispatch(createComment(data))
            return res;
        }


    } catch (error) {
        return error;
    }
}
export const deleteCommentThunk = (comment) => async (dispatch) => {
    try {

       
        const options = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }

        

        const res = await csrfFetch(`/api/comments/${comment.id}`, options);
        
        if (res.ok) {
            const data = await res.json();

            dispatch(deleteComment(data))
            return res;
        }


    } catch (error) {
        return error;
    }
}

export const updateCommentThunk = (updateComment) => async (dispatch) => {
    try {

       
        const options = {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateComment)
        }
        
        

        const res = await csrfFetch(`/api/comments/${updateComment.id}`, options);
        
        if (res.ok) {
            
            const data = await res.json();
            console.log(data, 'think')
            dispatch(updateComments(data))
            return res;
        }


    } catch (error) {
        return error;
    }
}

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
        case CREATE_COMMENT: {
            newState = { ...state }
            newState.allComments = [action.payload, ...newState.allComments]
            newState.byCommentId[action.payload.id] = action.payload;
            return newState;
        }
        

        case DELETE_COMMENT: {
            newState = { ...state }

            const filteredComments = newState.allComments.filter(comment => {

                return comment.id !== action.payload.id
            })

            newState.allComments = filteredComments

            const newById = { ...newState.byCommentId };
            delete newById[action.payload.id];
            newState.byCommentId = newById;

            

            return newState
        }
        case UPDATE_COMMENT: {
            newState = { ...state }

            const commentId = action.payload.id;

            const newAllComments = [];
            for (let i = 0; i < newState.allComments.length; i++) {
                let currComment = newState.allComments[i];
                if (currComment.id === commentId) {
                    newAllComments.push(action.payload);
                } else {
                    newAllComments.push(currComment)
                }
            }

            newState.allComments = newAllComments;
            newState.byCommentId = { ...newState.byCommentId, [commentId]: action.payload };
            return newState;
        }


        default:
            return state;
    }
}

export default commentReducer;