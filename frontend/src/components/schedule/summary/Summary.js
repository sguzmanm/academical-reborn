import React from "react";
import "./Summary.scss";
import { useSelector } from "react-redux";

function Summary() {

  const useSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useSchedule();

  let codes={};
  let summary=[];  
  currentSchedule.courses.map((element) => {
    if(!codes[element.code]){
      summary.push(
        <div className="summary__item" key={element.code}>
          <p>{element.title}</p>
          <p>{element.credits}</p>
          <p>{element.code}</p>
        </div>      
      );
      codes[element.code]=true;
    }
  });
  return (
    <div className="summary">
      <div className="summary__grid">
        <div className="summary__header">
          <p>Nombre</p>
          <p>Créditos</p>
          <p>CRN</p>
        </div>
        {summary}
      </div>
      <div className="summary__codes">

      </div>
    </div>
  );
}


export default Summary;
