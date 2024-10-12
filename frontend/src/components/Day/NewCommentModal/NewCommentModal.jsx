import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";

import { getSchedulesThunk } from '../../../redux/schedule';
import { createCommentThunk, updateCommentThunk } from "../../../redux/comment";
import './NewCommentModal.css'


function NewCommentModal({shift, comment}) {
  const dispatch = useDispatch();
  const {id} = useParams()
  const [body, setBody] = useState('')
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
      
          if (serverResponse) {
              closeModal()
              console.log(serverResponse, 'hmmmm')
              
            } else {    
                console.log(closeModal)
                closeModal();
              await dispatch(getSchedulesThunk())
              
           
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
    
        if (serverResponse) {
            
                
            closeModal()
            
            
            
            
        } else {    
            console.log(closeModal)
            closeModal();
            await dispatch(getSchedulesThunk())
            
            
            
         
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
