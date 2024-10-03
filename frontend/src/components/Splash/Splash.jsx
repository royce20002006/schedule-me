import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSchedulesThunk } from '../../redux/schedule';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';
import NewDayModal from './NewDayModal';



const Splash = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const schedules = useSelector(state => state.scheduleState.allSchedules)
  useEffect(() => {
    //grab data

    const getData = async () => {
      await dispatch(getSchedulesThunk());


      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded])

  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }

  

  

  return (
    <div>
      <h1>Weekly Schedule List</h1>
      <div>
      <OpenModalButton
                  
                  buttonText="New Day"
                  modalComponent={<NewDayModal />}
                  preventDefault
                  stopPropagation
                />
     
      </div>
      {schedules.length > 0 ? (
       schedules.map((day, idx) => (
          <NavLink
            to={`/schedules/${day.id}`} 
            key={`${day}--${idx}`} 
          >
            <div>
              
              {new Date(day.day).toDateString()}
            </div>
          </NavLink>
        ))
      ) : (
        <div>No Schedules to Display</div>
      )}
    </div>
  );
}

export default Splash;
