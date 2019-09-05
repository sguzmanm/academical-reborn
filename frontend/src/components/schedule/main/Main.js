import React, { useEffect } from 'react'
import Side from '../side/Side'
import Schedule from '../schedule/Schedule'
import './Main.scss'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setEvents } from '../../../store/events'

function Main(props) {
  const url = useSelector(state => state.root.url)
  const dispatch = useDispatch()

  // Get events at mount, passed params to avoid infinite loop
  useEffect(() => {
    async function getEvents() {
      try {
        const res = await axios.get(`${url}events`)
        dispatch(setEvents(res.data))
      } catch (err) {
        console.log(err)
        console.log(err.response)
      }
    }

    getEvents()
  }, [dispatch,url])

  return (
    <div className="main">
      <Side></Side>
      <Schedule></Schedule>
    </div>
  )
}

export default Main
