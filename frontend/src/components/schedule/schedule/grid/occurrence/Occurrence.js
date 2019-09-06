import React from 'react'
import './Occurrence.scss'
import { getHash } from '../../../../../util/events/events'



function Ocurrence(props) {
  const colorsLength=5;
  const rowGap=3;
  const colGap=1;
  
  return (
    <div
      className={`occurrence occurrence--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
      style={{
        gridRowStart:props.element.indexStart+rowGap,
        gridRowEnd:props.element.indexEnd+rowGap,
        gridColumnStart:props.element.days[0]+colGap
      }}
    >
      <h4 className="occurrence__title">{props.element.title}</h4>
      <h6 className="occurrence__place">{props.element.place}</h6>
      <button className="occurrence__close" onClick={props.eliminateOccurrence}>X</button>
    </div>
  )
}

export default Ocurrence
