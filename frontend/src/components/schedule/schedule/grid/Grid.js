import React from 'react'
import './Grid.scss'

import Occurrence from '../../occurrence/Occurrence'
import {useSelector} from 'react-redux';

function Grid() {

  const currentSchedule=useSelector(state=>state.schedules.schedule)
  const rowGap=3;
  const colGap=1;

  const items=currentSchedule.collegeEvents?currentSchedule.collegeEvents.map(el=>{(
      <div style={{
        gridRowStart:el.indexStart+rowGap,
        gridRowEnd:el.indexEnd+rowGap,
        gridColumnStart:el.days[0]+colGap
      }} key={el._id}>
        <div>{el.title}</div>
      </div>
    )}):[]

    return (
      <div className="grid">
        {items}
      </div>
    )
}

export default Grid
