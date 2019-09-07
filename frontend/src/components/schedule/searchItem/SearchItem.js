import React from 'react'
import './SearchItem.scss'
import { getHash } from '../../../util/events/events'



function Ocurrence(props) {
  const addItem= () =>{
    console.log(props.element)
  }
  const colorsLength=5;
  return (
    <div onClick={addItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="search-item__title">{props.element.title}</h4>
      <h6 className="search-item__type">{props.element.type}</h6>
    </div>
  )
}

export default Ocurrence
