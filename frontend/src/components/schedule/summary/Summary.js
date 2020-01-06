import React from "react";
import "./Summary.scss";
import { useSelector } from "react-redux";

function Summary() {

  const useSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useSchedule();

  let codes={};
  let credits=0;
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
      credits+=parseInt(element.credits,10);
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
      <div className="summary__credits">
        <strong>Total de créditos</strong> {credits}
      </div>
    </div>
  );
}


export default Summary;
