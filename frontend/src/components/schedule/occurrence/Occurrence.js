import React from 'react'
import './Occurrence.scss'
import { getHash } from '../../../util/events/events'

function Ocurrence(props) {
  const approvedColors = ['#a27744', '#f5b504', '#7f72ce', '#288d7f', '#54a1e7']
  console.log(Math.abs(getHash(props.el.type)) % approvedColors.length)
  return (
    <div
      className={`occurrence occurrence--color${Math.abs(getHash(props.el.type)) % approvedColors.length}`}
    >
      <h4 className="occurrence__title">{props.el.title}</h4>
      <h6 className="occurrence__type">{props.el.type}</h6>
    </div>
  )
}

export default Ocurrence
