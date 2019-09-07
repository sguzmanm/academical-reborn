import React from 'react'
import axios from 'axios'
import './SearchItem.scss'
import { setCurrentSchedule } from '../../../store/schedules'
import { getHash } from '../../../util/events/events'
import { useSelector, useDispatch } from 'react-redux'

function Ocurrence(props) {
  const url = useSelector(state => state.root.url)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

  
  const dispatch = useDispatch()

  const updateCurrentSchedule = async (events) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const schedule= {...currentSchedule}
      schedule.collegeEvents=events
      await axios.put(`${url}users/${user._id}/schedules/${schedule._id}`,
      schedule, options);
      console.log('llega A')
      dispatch(setCurrentSchedule(schedule));
    }
    catch (error) {
      console.error(error)
    }
  }

  const currentSchedule= useSelector(state => state.schedules.schedule);
  const addItem= () =>{
    const events= [...currentSchedule.collegeEvents]
    events.push(props.element);
    updateCurrentSchedule(events)
  }

  const addTempItem= () =>{
    console.log('hov')
  }

  const removeTempItem= () =>{
    console.log('unhov')
  }

  const colorsLength=5;
  return (
    <div onClick={addItem} onMouseEnter={addTempItem} onMouseLeave={removeTempItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="search-item__title">{props.element.title}</h4>
      <h6 className="search-item__type">{props.element.type}</h6>
    </div>
  )
}

export default Ocurrence
