import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { deleteShiftThunk } from "../../../redux/shift";
import { getSchedulesThunk } from "../../../redux/schedule";


function DeleteCommentModal({shift}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const {id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    const serverResponse = await dispatch(
          deleteShiftThunk(id, shift)
          
    );
    
    if (serverResponse.ok) {
        closeModal();
        await dispatch(getSchedulesThunk())
        
    } else {
        setErrors(serverResponse);
    }
};

  return (
    <>
      <h1>Delete This Shift</h1>
      {errors.server && <p>{errors.server}</p>}
        <button onClick={e => handleSubmit(e)}>Yes Delete the Shift</button>
        <button onClick={e => closeModal()}>No Keep the Shift</button>
      
    </>
  );
}

export default DeleteCommentModal