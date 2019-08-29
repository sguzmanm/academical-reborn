import React from 'react'
import Side from '../side/Side'
import Schedule from '../schedule/Schedule'
import './Main.scss'

function Main() {

  return (
    <div className="main">
        <Side></Side>
        <Schedule></Schedule>
    </div>
  )
}

export default Main