import React,{useEffect} from 'react'
import './Grid.scss'

import {useSelector,useDispatch} from 'react-redux';
import Occurrence from './occurrence/Occurrence'


import { setSchedule,addSchedules } from '../../../../store/schedules'

function Grid() {

  const dispatch=useDispatch()
  const useCurrentSchedule = () =>
        useSelector(state => state.schedules.schedule, []);

  const currentSchedule=useCurrentSchedule()

  const schedules=useSelector(state=>state.schedules.schedules)

  const eliminateOccurrence=(id)=>{
    const index=currentSchedule.collegeEvents.findIndex(el=>el._id==id)
    currentSchedule.collegeEvents.splice(index,1)  
    dispatch(setSchedule(currentSchedule))
  }

  const items=currentSchedule.collegeEvents?
    currentSchedule.collegeEvents.map(el=>(
      <Occurrence key={el._id} element={el} eliminateOccurrence={()=>eliminateOccurrence(el._id)}/>))
    :<div></div>

    return (
      <div className="grid">
        {items}      
    )):<div></div>}
      </div>
    )
}

export default Grid
