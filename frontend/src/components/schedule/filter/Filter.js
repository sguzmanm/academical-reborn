/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React,{ useState,useEffect,useRef, useCallback } from "react";
import axios from "axios";

import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";
import { useSelector,useDispatch } from "react-redux";
import { setCurrentSchedule } from "../../../store/schedules";


function Filter(props) {
  const url = useSelector(state => state.root.url);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  
  const dispatch = useDispatch();

  const MAX_ITEM_SIZE=20;
  const diff=200;
  
  const items = useSelector(state => state.items[props.itemType]);

  const [currentMax,setCurrentMax]=useState(MAX_ITEM_SIZE);
  const [filterString, setFilterString] = useState("");
  const [currentItems,setCurrentItems]=useState(items);
  const [itemFilter, setItemFilter] = useState(currentItems.slice(0,MAX_ITEM_SIZE));

  const listElmRef = useRef();

  const filter= useCallback(()=>{
    if(currentMax===MAX_ITEM_SIZE){
      listElmRef.current.scrollTop=0;
    }

    let val=filterString.trim().toLowerCase();
    let tempFilter=items.filter((ev)=>{
      return ev.title.toLowerCase().includes(val) || ev.type.toLowerCase().includes(val) || (ev.code && ev.code.toLowerCase().includes(val));
    });

    setCurrentItems(tempFilter);
    setItemFilter(tempFilter.slice(0,currentMax));
  },[filterString,currentMax]);

  useEffect(()=>{
    const loadMore=()=>{
      if(currentItems.length>currentMax){
        setCurrentMax(currentMax*2);
      }
    };
  
    let listElm=listElmRef.current;
    listElm.addEventListener("scroll", function() {
      if (listElm.scrollTop + listElm.clientHeight +diff>= listElm.scrollHeight) {
        loadMore();
      }
    });
    filter();

  },[filter]);

  const mapitems=(data)=>{
    if(!data || data.length===0){
      return null;
    }

    return data.map(el =><SearchItem key={"IT"+el._id?el._id:el.key} element={el} itemType={props.itemType} searchSameCode={(schedule)=>{searchSameCode(el,props.itemType,schedule);}}></SearchItem>);
  };

  const reset=()=>{
    setFilterString(" ");
    setCurrentItems(items);
  };

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
      console.log("Error on search item");
      console.error(error);
    }
  };

  const searchSameCode=async (el,itemType,schedule)=>{
    setCurrentMax(MAX_ITEM_SIZE);
    if(!el.code){
      return;
    }

    let newItems=items.filter(item=>item.code===el.code && item._id!==el._id);
    newItems.forEach(element => {
      schedule[itemType].push(element);
    });

    try{
      await updateCurrentSchedule(schedule);
      reset();
    }
    catch(e){
      console.error(e);
    }

  };
  
  const filterHeader=(
    <div className="filter__searchBar">
      <img
        className="filter__searchBar__searchIcon"
        src={require("../../../assets/icons/magnifying-glass.svg")}
        alt="search-icon"
      />
      <input className="filter__searchBar__searchInput" type="text" placeholder="Buscar..." onChange={(e)=>{setCurrentMax(MAX_ITEM_SIZE);setFilterString(e.target.value);}}/>
    </div>
  );
  return (
    <div className="filter">
      {filterHeader}
      <div className="filter__items" ref={listElmRef}>
        {mapitems(itemFilter)}
      </div>
      
    </div>
  );
}

Filter.propTypes={
  itemType:PropTypes.string
};

export default Filter;
