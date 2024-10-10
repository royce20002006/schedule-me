import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { createShiftThunk, updateShiftThunk } from "../../../redux/shift";
import { getSchedulesThunk } from '../../../redux/schedule';
import { createCommentThunk, readCommentThunk, updateCommentThunk } from "../../../redux/comment";
import './NewCommentModal.css'


function NewCommentModal({shift, comment}) {
  const dispatch = useDispatch();
  const {id} = useParams()
  const [body, setBody] = useState('')
   

 
  
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
useEffect(() => {
    if(comment) {
        
        setBody(comment.body)
        
      }
}, [comment])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment) {
        const updateComment = {
            id: comment.id,
            body
        }

        const serverResponse = await dispatch(
            
            updateCommentThunk(
              updateComment
            )
          );
      
          if (serverResponse.ok) {
              
             await dispatch(getSchedulesThunk())
              closeModal();
            
          } else {    
              console.log(serverResponse)
              
           
          }


    } else {

        const comment = {
            body
        }
        
    
        const serverResponse = await dispatch(
            
          createCommentThunk(
            id,
            shift.id,
            comment
          )
        );
    
        if (serverResponse.ok) {
            const goodResponse = async () => {
                
                await dispatch(getSchedulesThunk())
                closeModal();

            }
            goodResponse()
           
        } else {    
            
            console.log(serverResponse)
            
            
         
        }
    }
  };

  return (
    <>
      <h1 className="title">Comment</h1>
      
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          What do you Want to say: 
          <input className="input-body"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        
        <button className="submit" type="submit">Submit</button>
      </form>
    </>
  );
}

export default NewCommentModal;
