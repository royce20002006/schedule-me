import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getSchedulesThunk } from '../../redux/schedule';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';

import NewShiftModal from './NewShiftModal/NewShiftModal';
import DeleteShiftModal from './DeleteShiftModal/DeleteShiftModal';
import { readShiftThunk } from '../../redux/shift';
import { readCommentThunk } from '../../redux/comment';
import NewCommentModal from './NewCommentModal/NewCommentModal';
import DeleteCommentModal from './DeleteCommentModal/DeleteCommentModal';
import './Day.css'
import OpenModalButtonTwo from '../OpenModalButtonTwo/OpenModalButtonTwo';
import { getAllUsersThunk } from '../../redux/users';

function Day() {
  const { id } = useParams();
  const schedule = useSelector(state => state.scheduleState.byId[id])
  const schedules = useSelector(state => state.scheduleState.allSchedules)
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState()
  const shifts = useSelector(state => state.shiftState.allShifts);
  const comments = useSelector(state => state.commentState.allComments);
  const session = useSelector(state => state.session.user);
  const Navigate = useNavigate()

  useEffect(() => {
    //grab data


    const getData = async () => {

      await dispatch(getSchedulesThunk());
      await dispatch(getAllUsersThunk());
      await dispatch(readShiftThunk(id))
      await dispatch(readCommentThunk())


      setIsLoaded(true);
    }
    if (!isLoaded || id) {
      getData();
    }

  }, [dispatch, isLoaded, session, id])

  let previousDay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (id > 1) {
      Navigate(`/schedules/${id - 1}`)
      
    } else {
      alert('This is the first Day')
    }
  }

  let nextDay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (parseInt(id) ===  schedules.length) {
      alert('This is the last Day')
      
      
    } else {
      Navigate(`/schedules/${parseInt(id) + 1}`)
    }
  }

  if (!session) {
    return (

      
      <div >
        <div className='background-not-logged-in'></div>
        <div className='not-logged-in'>Welcome to scheduleMe</div>
        <div className='not-logged-in'>Log in to check schedules</div>
        
      </div>
      )
  }
  if (!isLoaded) {
    return 'Loading'
  }
  return (
    <>
      <ul className="profile-navs round">
      <li>
        <button onClick={(e) => previousDay(e)} className='submit'>Previous Day</button>
      </li>
      <li>
        <button className='submit' onClick={(e) => nextDay(e)}>Next Day</button>
      </li>
      
    </ul>
      <h1 className='heading'>Schedule for {new Date(schedule.day).toDateString()}</h1>
      {session && session.role === 'Supervisor' ?
        <div className='center-div'>
          <OpenModalButtonTwo
            className='new-shift'
            buttonText='New Shift'
            modalComponent={<NewShiftModal />}
            preventDefault
            stopPropagation
          />
        </div>
        : ''}

      <div className='section-day'>
        {shifts.filter(shift => shift.scheduleId === schedule.id).map((shift, idx) => (
          <div className='container-two' key={`${shift.id}--${idx}`}>
            <div >
              <div className='shift' >{<div className='big'>{`${shift.User.firstName} ${shift.User.lastName} : ${shift.startTime} -- ${shift.endTime}`}</div>}
                {session && session.role === 'Supervisor' ?
                  <div className='buttons'>
                    <OpenModalButton
                      buttonText='Delete Shift'
                      modalComponent={<DeleteShiftModal shift={shift} />}
                      preventDefault
                      stopPropagation />

                    <OpenModalButton
                      buttonText='Edit Shift'
                      modalComponent={<NewShiftModal shift={shift} />}
                      preventDefault
                      stopPropagation
                    />
                  </div> : ''

                }
              </div>

              <div className='comments-header'>Comments</div>
                {session && session.id === shift.User.id || session && session.role === 'Supervisor'? 
              <div><OpenModalButton
                buttonText={'New comment'}
                modalComponent={<NewCommentModal shift={shift} />}
                preventDefault
                stopPropagation
              />
              </div> : ''
                
              }

              <div className='comments' >{comments.filter(comment => comment.shiftId === shift.id).map((comment, idx) => (
                <div className='container-two' key={`${comment.id}--${idx}`}>
                  {`${comment.User.firstName} ${comment.User.lastName}: ${comment.body}`}
                  {session && session.id === comment.userId ?
                    <div className='buttons'>
                      <OpenModalButton
                        className='red'
                        buttonText='Delete'
                        preventDefault
                        stopPropagation
                        modalComponent={<DeleteCommentModal comment={comment} />}
                      />
                      <OpenModalButton
                        buttonText={'Edit'}
                        modalComponent={<NewCommentModal comment={comment} />}
                        preventDefault
                        stopPropagation
                      />
                    </div>
                    : ''}
                </div>
              ))}</div>
            </div>
          </div>
        ))}
      </div>
    </>

  )
}

export default Day