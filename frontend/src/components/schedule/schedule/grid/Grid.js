import React, { useRef, createRef, forwardRef } from 'react'
import './Grid.scss'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Occurrence from './occurrence/Occurrence'

import { setCurrentSchedule } from '../../../../store/schedules'

function Grid(props) {
  // Put op
  const url = useSelector(state => state.root.url)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const myRef = useRef(null)

  // Redux
  const dispatch = useDispatch()
  const useCurrentSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule = useCurrentSchedule()


  const updateCurrentSchedule = async () => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      }
      await axios.put(`${url}users/${user._id}/schedules/${currentSchedule._id}`,
        currentSchedule, options);
      dispatch(setCurrentSchedule(currentSchedule));
    }
    catch (error) {
      console.error(error)
    }
  }

  const eliminateOccurrence = (id) => {
    const index = currentSchedule.collegeEvents.findIndex(el => el._id === id)
    currentSchedule.collegeEvents.splice(index, 1);
    updateCurrentSchedule()
  }

  // Render items
  const items = currentSchedule.collegeEvents ?
    currentSchedule.collegeEvents.map(el => (
      <Occurrence key={el._id} ref={myRef} element={el} eliminateOccurrence={() => eliminateOccurrence(el._id)} />))
    : <div></div>

  const tempEvent = useSelector(state => state.schedules.tempEvent);

  let tempOccurrence = null
  if (tempEvent) {
    tempOccurrence =
      <Occurrence key={tempEvent._id}
        ref={myRef}
        element={tempEvent}
        eliminateOccurrence={() => eliminateOccurrence(tempEvent._id)} />

  }

  // Render
  let resp= (
    <div className="grid">
      {items}
      {tempOccurrence}
    </div>
  )

  setTimeout(()=>props.scrollToElement(myRef),10)
  

  return resp;
}

export default Grid
