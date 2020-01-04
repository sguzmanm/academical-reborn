/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React,{ useState,useEffect,useRef, useCallback } from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";
import { useSelector } from "react-redux";

function Filter(props) {
  const MAX_ITEM_SIZE=20;
  const diff=200;
  
  const items = useSelector(state => state.items[props.itemType]);

  const [currentMax,setCurrentMax]=useState(MAX_ITEM_SIZE);
  const [tempItem,setTempItem]=useState(null);
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
      setCurrentMax(currentMax*2);
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

    return data.map(el =><SearchItem key={"IT"+el._id?el._id:el.key} element={el} itemType={props.itemType} searchSameCode={()=>{searchSameCode(el);}}></SearchItem>);
  };

  const reset=()=>{
    setFilterString(" ");
    setCurrentItems(items);
    setTempItem(null);
  };

  const searchSameCode=(el)=>{
    setCurrentMax(MAX_ITEM_SIZE);

    if(tempItem){
      setFilterString(" ");
      setTempItem(null);

      return;
    }


    if(!el.code){
      
      return;
    }

    let newFilter=items.filter(item=>item.code===el.code && item._id!==el._id);
    if(!newFilter || newFilter.length===0){
      reset();
      return;
    }

    setTempItem(el);
    setItemFilter(newFilter.slice(0,MAX_ITEM_SIZE));
    setCurrentItems(newFilter);
  };
  

  const filterHeader=tempItem?<div className="filter__compl">Horarios adicionales de esta materia</div>:(
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
        {itemFilter.length>0?mapitems(itemFilter):mapitems(items.slice(0,MAX_ITEM_SIZE))}
      </div>
      
    </div>
  );
}

Filter.propTypes={
  itemType:PropTypes.string
};

export default Filter;
