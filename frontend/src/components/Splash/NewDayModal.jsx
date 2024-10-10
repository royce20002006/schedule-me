import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createScheduleThunk, getSchedulesThunk } from '../../redux/schedule';




export default function NewDayModal() {
    const [day, setDay] = useState('')
    const [errors, setErrors] = useState({});
    const schedules = useSelector(state => state.scheduleState.allSchedules)
    const session = useSelector(state => state.session)
    const dispatch = useDispatch();
    
    
    const {closeModal} = useModal();

    const newDay = async(e) => {
        e.preventDefault();
        e.stopPropagation();

        const current = new Date()
        if (session.role <= 'Supervisor') {
            setErrors({user: 'Only a Supervisor may make the schedule'})
        } else {

            let date = new Date(day.replace(/-/g, '\/'))
        
            if (date < current) {
                setErrors({day: 'You cannot make a schedule before the current date'
                }) 
            } else {
    
                let response = await dispatch(createScheduleThunk(date))
                
                if (response.ok) {
                    closeModal()
                } else {
                    let data = await response.json()
                    setErrors(data.errors)

                }
            }
        }
       
        
        
        
       
      }

  return (
    <div >
      <div >
        <h1 >Confirm Delete</h1>
        <div >Select a day</div>
        <input type="date"
        value={day}
        onChange={e => setDay(e.target.value)} />
        {errors.day && errors.day}

      </div>
        <div>
        <button   onClick={(e) => newDay(e)}>Create new Day</button>
        <button   onClick={closeModal}>Cancel</button>

        </div>
    </div>
  )
}
