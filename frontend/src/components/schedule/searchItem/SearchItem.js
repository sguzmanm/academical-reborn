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

  const updateCurrentSchedule = async (schedule) => {
    try {
      console.log(schedule)
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      }
      await axios.put(`${url}users/${user._id}/schedules/${schedule._id}`,
      schedule, options);
      dispatch(setCurrentSchedule(schedule));
    }
    catch (error) {
      console.error(error)
    }
  }

  const dispatch = useDispatch()
  const currentSchedule= useSelector(state => state.schedules.schedule, []);
  const addItem= () =>{
    const curSchedule= {...currentSchedule}
    curSchedule.collegeEvents.push(props.element);
    updateCurrentSchedule(curSchedule)
  }
  const colorsLength=5;
  return (
    <div onClick={addItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="search-item__title">{props.element.title}</h4>
      <h6 className="search-item__type">{props.element.type}</h6>
    </div>
  )
}

export default Ocurrence
