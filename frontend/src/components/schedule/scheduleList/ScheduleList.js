import React,{useState,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSchedules,setCurrentSchedule} from '../../../store/schedules/actions'
import './ScheduleList.scss'

import ActionModal from '../../actions/actionModal/ActionModal'
import '../../actions/actionModal/ActionModal.scss'

import axios from 'axios'


function ScheduleList() {
    // Delete op
    const url = useSelector(state => state.root.url)
    const token=useSelector(state=>state.auth.token)
    const user=useSelector(state=>state.auth.user)
    
    // Schedules
    const useSchedules = () =>
        useSelector(state => state.schedules.schedules, []);
    let mySchedules=useSchedules();
    const [selected,setSelected]=useState(0)
    const dispatch = useDispatch()
 
    const setSelectedSchedule=(index)=>{
        dispatch(setCurrentSchedule(mySchedules[index]))
        setSelected(index)
    }

    // Actions

    const [error,setError]=useState({})
    const errorModal=useRef(null);

    const deleteModal = useRef(null);
    const showDeleteModal = (index) => {
      setSelected(index)
      // `current` apunta al elemento de entrada de texto montado
      deleteModal.current.toggle();
    }; 

    const deleteSchedule=async ()=>{
      try
      {
        console.log("INDEX",selected)
        const id=mySchedules[selected]._id
        const tempSchedules=[...mySchedules]
        tempSchedules.splice(selected,1)

        const options={
          headers:{Authorization:`Bearer ${token}`}
        }
        const res=await axios.delete(`${url}users/${user._id}/schedules/${id}`,
              options);
        dispatch(setSchedules(tempSchedules));
        setSelectedSchedule(0);
      }
      catch(e)
      {
        console.log(e);
        setError(e);
        errorModal.current.toggle();
      }
    }

    // Render
    const mapScheduleList=mySchedules.map((el,index)=>(
      <div className={`scheduleList__item scheduleList__item${selected===index?"--selected":""}`} key={index} onClick={()=>setSelectedSchedule(index)}>
          <button className="scheduleList__item__delete">
            <img alt="Delete icon" 
              src = {require('../../../assets/icons/delete.svg')}
              onMouseOver={e => e.currentTarget.src = require('../../../assets/icons/delete-red.svg')}
              onMouseOut={e => e.currentTarget.src = require('../../../assets/icons/delete.svg')}
              onClick={()=>showDeleteModal(index)}
              />
          </button>
          <h2 className="scheduleList__item__title">{el.title}</h2>
          <p className="scheduleList__item__description">{el.description}</p>
          <span className="scheduleList__item__arrow">&gt;</span>
      </div>
  ))

  return (
    <div className="scheduleListContainer">

      {/*Schedule list sidebar*/}
      <div className="scheduleList">
        <button className="scheduleList__add"><img src={require('../../../assets/icons/add.svg')} alt="Add new schedule"/></button>
        {mapScheduleList}
      </div>

      {/*Delete Schedule*/}
      <ActionModal ref={deleteModal}
          modalHeaderBg="#EE2E31"
          modalHeaderColor="white"
          modalHeaderTitle="Borrar Horario"
          modalBody="¿Estás seguro de que quieres borrar este horario?"
          okCBK={()=>deleteSchedule(selected)}
          okText="Sí"
          cancelCBK={()=>{}}
          cancelText="No"/>

      {/*Error*/}
      <ActionModal ref={errorModal}
          modalHeaderBg="#EE2E31"
          modalHeaderColor="white"
          modalHeaderTitle="Error"
          modalBody="Hubo un error ejecutando la app, por favor intente más tarde"
          okCBK={()=>{}}
          okText="OK"/>
    </div>
  )
}

export default ScheduleList
