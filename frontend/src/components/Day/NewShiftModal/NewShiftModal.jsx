import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { createShiftThunk, updateShiftThunk } from "../../../redux/shift";
import { getSchedulesThunk } from '../../../redux/schedule';
import './NewShiftModal.css'

function NewShiftModal({shift}) {
  const dispatch = useDispatch();
  const {id} = useParams()
  const [userId, setUserId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [value, setValue] = useState(true)
  const [shiftForm, setShiftForm] = useState({
    userId: '',
    startTime: '',
    endTime: ''
  })

 
  
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
useEffect(() => {
    if(shift) {
        setUserId(shift.userId)
        setStartTime(shift.startTime)
        setEndTime(shift.endTime)
      }
}, [shift])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shift) {
        const updateShift = {
            id: shift.id,
            userId,
            startTime,
            endTime,
        }

        const serverResponse = await dispatch(
            
            updateShiftThunk(
              id,
              updateShift
            )
          );
      
          if (serverResponse.ok) {
              
             await dispatch(getSchedulesThunk())
              closeModal();
            
          } else {    
              let data = await serverResponse.json()
              console.log(data)
              setErrors(data.errors);
              
           
          }


    } else {

        const shift = {
            userId,
            startTime,
            endTime,
        }
        
    
        const serverResponse = await dispatch(
            
          createShiftThunk(
            id,
            shift
          )
        );
    
        if (serverResponse.ok) {
            
           await dispatch(getSchedulesThunk())
            closeModal();
          
        } else {    
            let data = await serverResponse.json()
            console.log(data)
            setErrors(data.errors);
            
         
        }
    }
  };

  return (
    <>
      <h1 className="title">Create a new Shift</h1>
      
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          UserId
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Start Time
          <input
          className="input"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value + ':00')}
            required
          />
        </label>
        <label className="label">
          End Time
          <input className="input"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value + ':00')}
            required
          />
          </label>
        <button className="submit" type="submit">Submit</button>
      </form>
    </>
  );
}

export default NewShiftModal;
