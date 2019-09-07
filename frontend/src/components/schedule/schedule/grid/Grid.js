import React from 'react'
import './Grid.scss'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import Occurrence from './occurrence/Occurrence'

import { setCurrentSchedule } from '../../../../store/schedules'

function Grid() {
  // Put op
  const url = useSelector(state => state.root.url)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

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

  const eliminateOccurrence = async (id) => {
    const index = currentSchedule.collegeEvents.findIndex(el => el._id === id)
    currentSchedule.collegeEvents.splice(index, 1);
    await updateCurrentSchedule()
  }

  // Render items
  const items = currentSchedule.collegeEvents ?
    currentSchedule.collegeEvents.map(el => (
      <Occurrence key={el._id} element={el} eliminateOccurrence={() => eliminateOccurrence(el._id)} />))
    : <div></div>

  // Render
  return (
    <div className="grid">
      {items}
    </div>
  )
}

export default Grid
