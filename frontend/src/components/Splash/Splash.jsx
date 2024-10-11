import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSchedulesThunk } from '../../redux/schedule';
import NewDayModal from './NewDayModal';
import './Splash.css'
import OpenModalButtonTwo from '../OpenModalButtonTwo/OpenModalButtonTwo';



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
      <h1 className='header'>Weekly Schedule List</h1>
      <div className='center-div'>
      <OpenModalButtonTwo
                  className='submit'
                  buttonText="New Day"
                  modalComponent={<NewDayModal />}
                  preventDefault
                  stopPropagation
                />
     
      </div>
      <div className='section'>

      {schedules.length > 0 ? (
       schedules.map((day, idx) => (
        
          <NavLink 
            to={`/schedules/${day.id}`} 
            key={`${day}--${idx}`} 
          >
            
              
            <div >
              {
              <div className='container'>{new Date(day.day).toDateString()}
                </div>
              }
              
            </div>
          </NavLink>
          

        
          
        ))
      ) : (
        <div>No Schedules to Display</div>
      )}
      </div>

    </div>
  );
}

export default Splash;
