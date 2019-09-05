import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import './ScheduleList.scss'

function ScheduleList() {
    const mySchedules=useSelector(state=>state.auth.user.schedules);
    const [selected,setSelected]=useState(0)

    const mapScheduleList=mySchedules.map((el,index)=>(
        <div className={`scheduleList__item scheduleList__item${selected===index?"--selected":""}`} key={index} onClick={()=>setSelected(index)}>
            <h2 className="scheduleList__item__title">{el.title}</h2>
            <p className="scheduleList__item__description">{el.description}</p>
            <span className="scheduleList__item__arrow">></span>
        </div>
    ))
  return (
    <div className="scheduleList">
      {mapScheduleList}
    </div>
  )
}

export default ScheduleList
