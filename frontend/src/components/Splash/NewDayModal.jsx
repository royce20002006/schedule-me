import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createScheduleThunk } from '../../redux/schedule';




export default function NewDayModal() {
    const [day, setDay] = useState('')
    const [errors, setErrors] = useState({});
    
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
      <div className='label'>
        <h1 className='delete'>Create a new schedule</h1>
        {errors.day && <div className='error'>{errors.day}</div>}
        <div className='day-select' >Select a day</div>
        <input  className='input margin' type="date"
        value={day}
        onChange={e => setDay(e.target.value)} />

      </div>
        <div className='buttons'>
        <button className='submit'  onClick={(e) => newDay(e)}>Create new Day</button>
        <button className='submit'  onClick={closeModal}>Cancel</button>

        </div>
    </div>
  )
}
