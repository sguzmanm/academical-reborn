import React from 'react'
import './Grid.scss'

import {useSelector} from 'react-redux';
import Occurrence from './occurrence/Occurrence'

function Grid() {

  const currentSchedule=useSelector(state=>state.schedules.schedule)

  let items=[]
  if(currentSchedule.collegeEvents)
  {
    items=currentSchedule.collegeEvents.map(el=>(
      <Occurrence key={el._id} element={el}/>      
    ))
  }

    return (
      <div className="grid">
        {items}
      </div>
    )
}

export default Grid
