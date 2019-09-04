import React from 'react'
import './Side.scss'
import Occurrence from '../occurrence/Occurrence'
import { useSelector } from 'react-redux'

function Side() {
  const events = useSelector(state => state.events.events)
  const testEvents = events.map(el => <Occurrence key={el._id} el={el}></Occurrence>)

  return (
    <div className="side">
      <div className="search-bar">Eventos</div>

      {testEvents}
    </div>
  )
}

export default Side
