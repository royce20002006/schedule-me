import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { deleteShiftThunk } from "../../../redux/shift";
import { getSchedulesThunk } from "../../../redux/schedule";


function DeleteShiftModal({shift}) {
  const dispatch = useDispatch();
 
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
      <div className="buttons">

        <button className="submit red" onClick={e => handleSubmit(e)}>Yes</button>
        <button className="submit" onClick={()=> closeModal()}>No</button>
      </div>
      
    </>
  );
}

export default DeleteShiftModal