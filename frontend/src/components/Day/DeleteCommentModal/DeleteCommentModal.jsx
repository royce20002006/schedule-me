import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { deleteShiftThunk } from "../../../redux/shift";
import { getSchedulesThunk } from "../../../redux/schedule";
import { deleteCommentThunk, readCommentThunk } from "../../../redux/comment";


function DeleteCommentModal({comment}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const {id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    const serverResponse = await dispatch(
          deleteCommentThunk( comment)
          
    );
    
    if (serverResponse.ok) {
        closeModal();
        await dispatch(readCommentThunk())
        
    } else {
        setErrors(serverResponse);
    }
};

  return (
    <>
      <h1>Delete This Comment</h1>
      
        <button onClick={e => handleSubmit(e)}>Yes Delete the Comment</button>
        <button onClick={e => closeModal()}>No Keep the Comment</button>
      
    </>
  );
}

export default DeleteCommentModal