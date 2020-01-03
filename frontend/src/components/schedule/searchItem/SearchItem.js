import React from "react";
import axios from "axios";
import "./SearchItem.scss";
import { setCurrentSchedule, setTempEvent } from "../../../store/schedules";
import { setMonday, reselectCurMonday } from "../../../store/week";
import { getHash } from "../../../util/items/items";
import { getMonday } from "../../../util/date/date";
import { useSelector, useDispatch } from "react-redux";


import PropTypes from "prop-types";


function SearchItem(props) {

  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  
  const dispatch = useDispatch();
  const useSchedule = () =>
    useSelector(state => state.schedules.schedule, []);
  const currentSchedule=useSchedule();

  const updateCurrentSchedule = async (schedule) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`${url}users/${user._id}/schedules/${schedule._id}`,
        schedule, options);
      dispatch(setCurrentSchedule(schedule));
    }
    catch (error) {
      console.error(error);
    }
  };

  const isAdded=(itemType)=>{
    if(!currentSchedule || !currentSchedule[itemType])
      return false;
    return currentSchedule[itemType].some(el=>el._id && el._id.toString()===props.element._id);
  };

  const changeWeek=()=>{
    const dateStart= props.element.dateStart;
    const newMonday= getMonday(dateStart);
    dispatch(setMonday(newMonday));
  };

  const addItem= (itemType) =>{
    if(!currentSchedule) return;
    if(!currentSchedule[itemType])
    {
      currentSchedule[itemType]=[];
    }

    currentSchedule[itemType].push(props.element);
    updateCurrentSchedule(currentSchedule);
    changeWeek();
  };

  const addTempItem= () =>{
    changeWeek();
    props.element.itemType=props.itemType; // Add different item type
    dispatch(setTempEvent({...props.element,isTemp:true}));
  };

  const removeTempItem= () =>{
    if(!isAdded(props.itemType))
      dispatch(reselectCurMonday());
    dispatch(setTempEvent(null));
  };

  const colorsLength=6;
  if (!props.element.days || props.element.days.length===0)
    return <div></div>;
  return (
    <div onClick={()=>addItem(props.itemType)} onMouseEnter={addTempItem} onMouseLeave={removeTempItem}
      className={`search-item search-item--color${Math.abs(getHash(props.element.type)) % colorsLength}`}
    >
      <h4 className="search-item__title">{props.element.title}</h4>
      <h6 className="search-item__type">{props.element.type}</h6>
    </div>
  );
}

SearchItem.propTypes={
  element:PropTypes.object,
  eliminateOccurrence:PropTypes.func,
  itemType: PropTypes.string
};

export default SearchItem;
