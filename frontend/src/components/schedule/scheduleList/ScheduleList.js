import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSchedule} from '../../../store/schedules/actions'
import './ScheduleList.scss'

function ScheduleList() {
    const mySchedules=useSelector(state=>state.schedules.schedules);
    const [selected,setSelected]=useState(0)
    const dispatch = useDispatch()

    const setSelectedSchedule=(index)=>{
        dispatch(setSchedule(mySchedules[index]))
        setSelected(index)
    }

    const mapScheduleList=mySchedules.map((el,index)=>(
        <div className={`scheduleList__item scheduleList__item${selected===index?"--selected":""}`} key={index} onClick={()=>setSelectedSchedule(index)}>
            <button className="scheduleList__item__delete"><img src={require('../../../assets/icons/delete.svg')}/></button>
            <h2 className="scheduleList__item__title">{el.title}</h2>
            <p className="scheduleList__item__description">{el.description}</p>
            <span className="scheduleList__item__arrow">&gt;</span>
        </div>
    ))

  return (
    <div className="scheduleList">

      <button className="scheduleList__add"><img src={require('../../../assets/icons/add.svg')} alt="Add new schedule"/></button>

      {mapScheduleList}
    </div>
  )
}

export default ScheduleList
