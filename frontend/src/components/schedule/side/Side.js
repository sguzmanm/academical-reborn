import React,{useState,useEffect} from 'react'
import './Side.scss'
import Occurrence from '../occurrence/Occurrence'
import { useSelector } from 'react-redux'

function Side() {
  const events = useSelector(state => state.events.events)
  const [eventFilter, setEventFilter] = useState(events);
  const [filtered, setFiltered] = useState(false);

  const filter=(event)=>{
    setFiltered(true);
    let tempFilter=events.filter((ev)=>{
      let val=event.target.value;
      return ev.title.includes(val) || ev.type.includes(val);
    })
    setEventFilter(tempFilter)
  }

  const mapEvents=(data)=>(
    data.map(el => <Occurrence key={el._id} el={el}></Occurrence>)
  )

  return (
    <div className="side">
      <img
          className="side__searchIcon"
          src={require('../../../assets/icons/magnifying-glass.svg')}
          alt="search-icon"
        />
        <input className="side__searchBar" type="text" placeholder="Buscar..." onChange={filter}/>

      {filtered || eventFilter.length>0?mapEvents(eventFilter):mapEvents(events)}

      {/*Credit for author of search icon*/}
      <div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}

export default Side
