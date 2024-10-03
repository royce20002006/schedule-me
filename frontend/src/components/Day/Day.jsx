import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getSchedulesThunk } from '../../redux/schedule';

function Day() {
    const {id } = useParams();
    const schedule = useSelector(state => state.scheduleState.byId[id])
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState()
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
        return 'Loading'
      }
  return (
    <>
    <div>Day</div>
    <div>{new Date(schedule.day).toDateString()}</div>
    </>
    
  )
}

export default Day