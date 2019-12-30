/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React,{useState} from "react";
import "./Filter.scss";
import SearchItem from "../searchItem/SearchItem";
import { useSelector } from "react-redux";

function Filter(props) {
  const items = useSelector(state => state.items[props.itemType]);
  const [itemFilter, setItemFilter] = useState(items);
  const [filtered, setFiltered] = useState(false);

  const filter=(item)=>{
    setFiltered(true);
    let tempFilter=items.filter((ev)=>{
      let val=item.target.value;
      return ev.title.includes(val) || ev.type.includes(val);
    });
    setItemFilter(tempFilter);
  };

  const mapitems=(data)=>{
    if(!data || data.length===0){
      return null;
    }
    console.log("DATA",data);
    return data.map(el => <SearchItem key={el._id} element={el} itemType={props.itemType}></SearchItem>);
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


      <div className="filter__items">
        {filtered || itemFilter.length>0?mapitems(itemFilter):mapitems(items)}
      </div>
      
    </div>
  );
}

Filter.propTypes={
  itemType:PropTypes.string
};

export default Filter;
