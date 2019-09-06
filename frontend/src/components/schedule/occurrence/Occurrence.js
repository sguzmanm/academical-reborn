import React from 'react'
import './Occurrence.scss'
import { getHash } from '../../../util/events/events'



function Ocurrence(props) {
  const colorsLength=5;
  return (
    <div
      className={`occurrence occurrence--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="occurrence__title">{props.element.title}</h4>
      <h6 className="occurrence__type">{props.element.type}</h6>
    </div>
  )
}

export default Ocurrence
