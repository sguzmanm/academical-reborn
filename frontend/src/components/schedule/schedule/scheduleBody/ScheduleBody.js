import React,{useState} from 'react'
import './ScheduleBody.scss'
import { maxRows,maxCols } from '../../../../util/grid/grid'

import '../../../actions/actionModal/ActionModal.scss'
import axios from 'axios'

import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

function ScheduleBody() {


  const [customEvent,setCustomEvent]=useState({})
  const [activeModal,setActiveModal]=useState(false)
  const [errorMsg,setErrorMsg]=useState('')


  const activateModal=(i,j)=>{
    setCustomEvent({
      indexStart:i,
      days:[j],
      type:'Custom'
    })

    setActiveModal(true)
  }

  const validDates=(startDate,endDate)=>{
    if(startDate.getFullYear()!==endDate.getFullYear())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo año")
      return false
    }
    
    if(startDate.getMonth()!==endDate.getMonth())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo mes")
      return false
    }

    if(startDate.getDate()!==endDate.getDate())
    {
      setErrorMsg("Los eventos deben hacerse en el mismo día")
      return false
    }

    if(startDate.getHours()===endDate.getHours() && startDate.getMinutes()===endDate.getMinutes())
    {
      setErrorMsg("Los horarios deben ser diferentes")
      return false
    }

    return true
  }

  const addCustomEvent=(e)=>{
    e.preventDefault();

    if(!customEvent.title || customEvent.title==="")
      return setErrorMsg("Por favor colócale un título a tu evento")
    
    if(!customEvent.dateStart)
      return setErrorMsg("Por favor asigna una fecha de inicio a tu evento")
    
    if(!customEvent.dateEnd)
      return setErrorMsg("Por favor asigna una fecha de fin a tu evento")

    if(!validDates(customEvent.dateStart,customEvent.dateEnd))
      return
    
    customEvent.timeStart=customEvent.dateStart.getHours()+":"+customEvent.dateStart.getMinutes()
    customEvent.timeEnd=customEvent.dateEnd.getHours()+":"+customEvent.dateEnd.getMinutes()

    console.log(customEvent);
  }

  const addCustomEventModal=(
    <div className="modal">
        <div className="modal__content">
            <div className="modal__header">
                <button className="modal__header__close" onClick={()=>setActiveModal(false)}>&times;</button>
                <h4 className="modal__header__title">Agregar mi evento</h4>
            </div>
            <div className="modal__body">
              <form className="modal__form" noValidate onSubmit={addCustomEvent}>
                <input
                  type="text"
                  placeholder="Nombre del evento"
                  value={customEvent.title}
                  onChange={e => {customEvent.title=e.target.value;setCustomEvent(customEvent)}}
                  className="modal__form__input"
                />
                <textarea
                  placeholder="Descripción"
                  rows={4}
                  value={customEvent.description}
                  onChange={e => {customEvent.description=e.target.value;setCustomEvent(customEvent)}}
                  className="modal__form__input modal__form__input"
                />
                <input
                  type="text"
                  placeholder="Lugar del evento"
                  value={customEvent.place}
                  onChange={e => {customEvent.place=e.target.value;setCustomEvent(customEvent)}}
                  className="modal__form__input"
                />
                <Flatpickr data-enable-time
                  placeholder="Fecha de inicio"
                  options={{minDate:'2019-01-01',minuteIncrement:30}}
                  value={customEvent.dateStart}
                  onChange={date => { customEvent.dateStart=new Date(date);setCustomEvent(customEvent) }} 
                  className="modal__form__input modal__form__input--calendar"
                  />

                <Flatpickr data-enable-time
                  placeholder="Fecha de fin"
                  options={{minDate:'2019-01-01',minuteIncrement:30}}
                  value={customEvent.dateEnd}
                  onChange={date => { customEvent.dateEnd=new Date(date);setCustomEvent(customEvent) }} 
                  className="modal__form__input modal__form__input--calendar"
                  />

                {errorMsg ? <p className="modal__form__errorMsg">{errorMsg}</p> : null}
                <button
                  className="modal__form__button modal__form__button--ok"
                  type="submit"
                >
                  Crear
                </button>
                <button
                  onClick={()=>setActiveModal(false)}
                  className="modal__form__button modal__form__button--cancel"
                >
                  Cancelar
                </button>
              </form>
            </div>
        </div>
    </div>
  )

  return (
    <div className="scheduleBodyContainer">
      <div className="scheduleBody">
        {Array.apply(null, { length: maxRows }).map((_, i) => (
          <div className="scheduleBody__row" key={i}>
            {Array.apply(null, { length: maxCols }).map((_, j) => (
              <div className="scheduleBody__cell" key={j} onClick={()=>activateModal(i,j)} >
                {j === 0 && i % 2 === 0 ? <p className="scheduleBody__hour">{i / 2 + 6}</p> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      {activeModal?addCustomEventModal:null}
    </div>
    
  )
}

export default ScheduleBody
