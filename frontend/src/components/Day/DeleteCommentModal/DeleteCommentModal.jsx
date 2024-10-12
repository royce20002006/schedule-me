
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

import { deleteCommentThunk, readCommentThunk } from "../../../redux/comment";
import { useState } from "react";


function DeleteCommentModal({comment}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({})
 

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
      <div className="buttons">

        <button className='submit'  onClick={e => handleSubmit(e)}>Yes</button>
        <button className="submit" onClick={() => closeModal()}>No</button>
      </div>
      
    </>
  );
}

export default DeleteCommentModal