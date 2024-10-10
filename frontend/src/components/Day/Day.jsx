import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSchedulesThunk } from '../../redux/schedule';
import { allUsersThunk } from '../../redux/session';
import OpenModalButton from '../OpenModalButton/OpenModalButtton';

import NewShiftModal from './NewShiftModal/NewShiftModal';
import DeleteShiftModal from './DeleteShiftModal/DeleteShiftModal';
import { readShiftThunk } from '../../redux/shift';
import { readCommentThunk } from '../../redux/comment';
import NewCommentModal from './NewCommentModal/NewCommentModal';
import DeleteCommentModal from './DeleteCommentModal/DeleteCommentModal';
import './Day.css'
import OpenModalButtonTwo from '../OpenModalButtonTwo/OpenModalButtonTwo';
function Day() {
  const { id } = useParams();
  const schedule = useSelector(state => state.scheduleState.byId[id])
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState()
  const shifts = useSelector(state => state.shiftState.allShifts);
  const comments = useSelector(state => state.commentState.allComments);
  const session = useSelector(state => state.session.user);

  useEffect(() => {
    //grab data

    const getData = async () => {
      await dispatch(getSchedulesThunk());
      await dispatch(readShiftThunk(id))
      await dispatch(readCommentThunk())
      await dispatch(allUsersThunk())

      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded])

  if (!isLoaded) {
    return 'Loading'
  }
  return (
    <>

      <h1 className='heading'>Schedule for {new Date(schedule.day).toDateString()}</h1>
      {session && session.role === 'Supervisor' ?
        <OpenModalButtonTwo
          className='new-shift'
          buttonText='New Shift'
          modalComponent={<NewShiftModal />}
          preventDefault
          stopPropagation
        /> : ''}
      <div className='section'>
        {shifts.filter(shift => shift.scheduleId === schedule.id).map((shift, idx) => (
          <div className='container' key={`${shift.id}--${idx}`}>
            <div >
              <div className='shift' >{<div className='big'>{`${shift.User.firstName} ${shift.User.lastName} : ${shift.startTime} -- ${shift.endTime}`}</div>}
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
                </div>
              </div>

              <div className='comments-header'>Comments</div>

              <div><OpenModalButton
                buttonText={'New comment'}
                modalComponent={<NewCommentModal shift={shift} />}
                preventDefault
                stopPropagation
              />
              </div>

              <div className='comments' >{comments.filter(comment => comment.shiftId === shift.id).map((comment, idx) => (
                <div className='container' key={`${comment.id}--${idx}`}>
                  {`${comment.User.firstName} ${comment.User.lastName}: ${comment.body}`}
                  {session && session.id === comment.userId ?
                    <div className='buttons'>
                      <OpenModalButton
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