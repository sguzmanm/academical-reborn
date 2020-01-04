import React from "react";
import "./SearchItem.scss";
import { setTempEvent } from "../../../store/schedules";
import { setMonday } from "../../../store/week";
import { getHash, ItemTypes } from "../../../util/items/items";
import { getMonday } from "../../../util/date/date";
import { useSelector, useDispatch } from "react-redux";


import PropTypes from "prop-types";


function SearchItem(props) {

  const dispatch = useDispatch();
  const useSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useSchedule();


  /*
  const isAdded=(itemType)=>{
    if(!currentSchedule || !currentSchedule[itemType])
      return false;
    return currentSchedule[itemType].some(el=>el._id && el._id.toString()===props.element._id);
  };
  */

  const changeWeek=()=>{
    const dateStart= props.element.dateStart;
    const newMonday= getMonday(dateStart);
    dispatch(setMonday(newMonday));
  };

  const addItem= async (itemType) =>{
    if(!currentSchedule) return;

    let tempSchedule={...currentSchedule,[itemType]:currentSchedule[itemType]?currentSchedule[itemType].slice():[]};

    tempSchedule[itemType].push(props.element);
    await props.searchSameCode(tempSchedule);
    changeWeek();
  };

  const addTempItem= () =>{
    changeWeek();
    props.element.itemType=props.itemType; // Add different item type
    dispatch(setTempEvent({...props.element,isTemp:true}));
  };

  const removeTempItem= () =>{
    /*  if(!isAdded(props.itemType))
      dispatch(reselectCurMonday());*/
    dispatch(setTempEvent(null));
  };

  const isDescriptionAllowed=(itemType)=>{
    if(itemType===ItemTypes.COURSE){
      return true;
    }
    return false;
  };

  const colorsLength=6;
  if (!props.element.days || props.element.days.length===0)
    return <div></div>;
  
  return (
    <div onClick={()=>addItem(props.itemType)} onMouseEnter={addTempItem} onMouseLeave={removeTempItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <p className="search-item__title">{props.element.title}</p>
      {props.element.limit?<p className="search-item__header">{props.element.limit - props.element.enrolled} de {props.element.limit} cupos</p>:null}
      {props.element.code?<p className="search-item__word"><span className="search-item__header">CRN</span> {props.element.code}</p>:null}
      {props.element.credits?<p className="search-item__word"><span className="search-item__header">Créditos</span> {props.element.credits}</p>:null}
      {isDescriptionAllowed(props.itemType)?<p className="search-item__word">{props.element.description}</p>:null}
      <p className="search-item__type">{props.element.type}</p>
    </div>
  );
}

SearchItem.propTypes={
  element:PropTypes.object,
  eliminateOccurrence:PropTypes.func,
  searchSameCode: PropTypes.func,
  itemType: PropTypes.string
};

export default SearchItem;
