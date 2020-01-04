import React, { useRef } from "react";
import "./Grid.scss";

import axios from "axios";
import {ItemTypes} from "../../../../util/items/items";

import { useSelector, useDispatch } from "react-redux";
import Occurrence from "./occurrence/Occurrence";

import { setCurrentSchedule } from "../../../../store/schedules";

function Grid(props) {
  // Put op
  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const monday = useSelector(state => {
    const curMonday = new Date(state.week.curMonday);
    return new Date(curMonday.getFullYear(), curMonday.getMonth(), curMonday.getDate());
  });
  const myRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const useCurrentSchedule = () =>
    useSelector(state => state.schedules.schedule) || {collegeEvents:[],courses:[]};
  const currentSchedule = useCurrentSchedule();


  const updateCurrentSchedule = async () => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      };
      console.log("GRID");
      await axios.put(`${url}users/${user._id}/schedules/${currentSchedule._id}`,
        currentSchedule, options);
      dispatch(setCurrentSchedule(currentSchedule));
    }
    catch (error) {
      console.log("Error on gri");
      console.error(error);
    }
  };

  const eliminateOccurrence = (id,code,itemType) => {
    let items=[];
    currentSchedule[itemType].forEach((el)=>{
      if (code && el.code!==code){
        items.push(el);
      }
      if (!code && el._id!==id){
        items.push(el);
      }
    });

    console.log("ITEMS",items,currentSchedule);
    currentSchedule[itemType]=items;
    updateCurrentSchedule();
  };

  const calcOverlap = (eventT) => {
    let itemType=eventT.itemType?eventT.itemType:"collegeEvents";
    let arr = currentSchedule[itemType] || [];
    arr=arr.filter(item=>{
      return !(item.dateEnd <= eventT.dateStart || item.dateStart >= eventT.dateEnd);
    });

    // eslint-disable-next-line no-unused-vars
    for(const day of eventT.days){
      // eslint-disable-next-line no-unused-vars
      for (const item of arr) {
        if (item.days.indexOf(day)!==-1 && !(eventT.indexEnd<=item.indexStart || eventT.indexStart>=item.indexEnd))
        {
          return true;
        }
      }
    }
    
    return false;
  };

  // Render items
  const nextMonday = new Date(monday.getTime() + 60 * 60 * 24 * 7 * 1000);
  let items=[];
  Object.keys(ItemTypes).forEach((itemKey)=>{
    let itemType=ItemTypes[itemKey];
    currentSchedule[itemType] ?
      currentSchedule[itemType].filter((el) => {
        return el.days && el.days.length>0 && !(new Date(el.dateStart) > nextMonday || new Date(el.dateEnd)<monday);
      }).forEach((el, index) => {
        el.days.forEach(day=>{
          items.push(
            <Occurrence key={`${itemType}_${el._id ? el._id : index}_${day}`} ref={myRef} 
              day={day}
              title={itemType===ItemTypes.COURSE?el.title.slice(0,10):undefined}
              element={el} eliminateOccurrence={() => eliminateOccurrence(el._id,el.code,itemType)} />
          );
        });
      })  
      : items.push(<div key={`${itemType}_${items}`}></div>);
  });  
  
  const tempEvent = useSelector(state => state.schedules.tempEvent);

  let tempOccurrences = [];
  if (tempEvent) {
    if (calcOverlap(tempEvent)) {
      tempEvent.overlap = true;
    }
    else {
      tempEvent.overlap = false;
    }
    tempEvent.days.forEach(day=>{
      tempOccurrences.push(<Occurrence key={"TEMP_"+tempEvent._id+"_"+day}
        ref={myRef}
        title={tempEvent.itemType===ItemTypes.COURSE?tempEvent.title.slice(0,10):undefined}
        day={day}
        element={tempEvent}
        eliminateOccurrence={() => eliminateOccurrence(tempEvent._id)} />);
    });
  }

  // Render
  let resp = (
    <div className="grid">
      {items}
      {tempOccurrences}
    </div>
  );

  setTimeout(() => props.scrollToElement(myRef), 10);


  return resp;
}

export default Grid;
