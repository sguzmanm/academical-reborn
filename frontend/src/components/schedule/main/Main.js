import React, { useEffect } from 'react'
import Side from '../side/Side'
import Schedule from '../schedule/Schedule'
import './Main.scss'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setEvents } from '../../../store/events'
import { setSchedules } from '../../../store/schedules'

function Main(props) {
  const url = useSelector(state => state.root.url)
  const auth=useSelector(state=>state.auth)
  console.log(auth)
  const token=useSelector(state=>state.auth.token)
  const dispatch = useDispatch()

  // Get events at mount, passed params to avoid infinite loop
  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`${url}events`)
        dispatch(setEvents(res.data))
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
