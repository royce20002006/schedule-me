import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSchedulesThunk } from '../../redux/schedule';
import NewDayModal from './NewDayModal';
import './Splash.css'
import OpenModalButtonTwo from '../OpenModalButtonTwo/OpenModalButtonTwo';
import LoginFormPage from '../LoginFormPage';
import { Navigate } from 'react-router-dom';



const Splash = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const session = useSelector(state => state.session.user);
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

  if (!session) {
    return (
    <div >
      <div className='background-not-logged-in'></div>
      <div className='not-logged-in'>Welcome to schedule me</div>
      <div className='not-logged-in'>You must be logged in to check schedules</div>
      
    </div>
    )
  }
  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }





  return (
    <div>
      <h1 className='header'>Weekly Schedule List</h1>
      {session && session.role === 'Supervisor' ?
        <div className='center-div'>
          <OpenModalButtonTwo
            className='submit'
            buttonText="New Day"
            modalComponent={<NewDayModal />}
            preventDefault
            stopPropagation
          />
        </div>
        : ''

      }

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
