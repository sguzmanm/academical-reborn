import React from "react";
import "./ScheduleHeader.scss";
import { useSelector } from "react-redux";

const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function ScheduleHeader() {
  const monday = useSelector(state => state.week.curMonday);
  return (
    <div className="scheduleHeader">
      <div className="scheduleHeader__cell scheduleHeader__cell--firstCol"></div>
      {dayNames.map((e, i) => (
        <div className="scheduleHeader__cell" key={e}>
          <p className="scheduleHeader__weekDay">{e.substring(0, 3)}</p>{" "}
          <h4 className="scheduleHeader__weekNumber">{monday.getDate() + i}</h4>
        </div>
      ))}
    </div>
  );
}

export default ScheduleHeader;
