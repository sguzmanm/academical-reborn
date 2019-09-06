import React, { useEffect } from 'react'
import Side from '../side/Side'
import Schedule from '../schedule/Schedule'
import './Main.scss'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setEvents } from '../../../store/events'
import { setSchedule,addSchedules } from '../../../store/schedules'

function Main() {
  const url = useSelector(state => state.root.url)
  const token=useSelector(state=>state.auth.token)
  const user=useSelector(state=>state.auth.user)
  const dispatch = useDispatch()

  // Get events at mount, passed params to avoid infinite loop
  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`${url}events`)
        dispatch(setEvents(res.data))

        res = await axios.get(`${url}users/${user._id}/schedules`,{headers:{Authorization:`Bearer ${token}`}})
        dispatch(addSchedules(res.data))
        dispatch(setSchedule(res.data[0]))
  
      } catch (err) {
        console.log(err)
        console.log(err.response)
      }
    }

    getData()
  }, [dispatch,url])

  return (
    <div className="main">
      <Side></Side>
      <Schedule></Schedule>
    </div>
  )
}

export default Main
