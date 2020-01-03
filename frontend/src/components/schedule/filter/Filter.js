/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React,{ useState,useEffect,useRef } from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";
import { useSelector } from "react-redux";

function Filter(props) {
  const MAX_ITEM_SIZE=20;
  const diff=200;
  
  let currentMax= MAX_ITEM_SIZE;

  const items = useSelector(state => state.items[props.itemType]);

  const [currentItems,setCurrentItems]=useState(items);
  const [itemFilter, setItemFilter] = useState(currentItems.slice(0,MAX_ITEM_SIZE));
  const [filtered, setFiltered] = useState(true);

  const listElmRef = useRef();

  useEffect(()=>{
    let listElm=listElmRef.current;
    listElm.addEventListener("scroll", function() {
      if (listElm.scrollTop + listElm.clientHeight +diff>= listElm.scrollHeight) {
        loadMore();
      }
    });
  },[]);

  const loadMore=()=>{
    console.log("Current items",currentItems.length,currentMax);
    setFiltered(true);
    currentMax*=2;
    setItemFilter(currentItems.slice(0,currentMax));
  };

  const filter=(item)=>{
    setFiltered(true);
    let tempFilter=items.filter((ev)=>{
      let val=item.target.value;
      return ev.title.includes(val) || ev.type.includes(val) || (ev.code && ev.code.includes(val));
    });
    setCurrentItems(tempFilter);
    currentMax=MAX_ITEM_SIZE;
    setItemFilter(tempFilter.slice(0,MAX_ITEM_SIZE));
    listElmRef.current.scrollTop=0;
  };

  const mapitems=(data)=>{
    if(!data || data.length===0){
      return null;
    }

    return data.map(el =><SearchItem key={"IT"+el._id?el._id:el.key} element={el} itemType={props.itemType}></SearchItem>);
  };
  

  return (
    <div className="filter">
      <div className="filter__searchBar">
        <img
          className="filter__searchBar__searchIcon"
          src={require("../../../assets/icons/magnifying-glass.svg")}
          alt="search-icon"
        />
        <input className="filter__searchBar__searchInput" type="text" placeholder="Buscar..." onChange={filter}/>
      </div>


      <div className="filter__items" ref={listElmRef}>
        {filtered || itemFilter.length>0?mapitems(itemFilter):mapitems(items.slice(0,MAX_ITEM_SIZE))}
      </div>
      
    </div>
  );
}

Filter.propTypes={
  itemType:PropTypes.string
};

export default Filter;
