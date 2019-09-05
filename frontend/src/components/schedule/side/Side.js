import React,{useState} from 'react'
import './Side.scss'
import ScheduleList from '../scheduleList/ScheduleList'
import Filter from '../filter/Filter'
import { useSelector } from 'react-redux'

function Side() {

  const [currentTab,setCurrentTab]=useState(0)
  const tabs=[<ScheduleList/>,<Filter/>]
  const imageTabs=[require('../../../assets/icons/list.svg'),require('../../../assets/icons/magnifying-glass.svg')]

  function changeTab(index)
  {
    console.log(currentTab+" "+index)
    setCurrentTab(index)
    console.log(currentTab)
  }
  return (
    <div className="side">
      
      <div className="side__tabs">
        {imageTabs.map((el,index)=>(
          <button className={index===currentTab?'side__tab--on':'side__tab--off'} key={index} onClick={()=>changeTab(index)}>
            <img alt={'tab-'+index} src={el}></img>
          </button>
        ))}
      </div>

      {tabs[currentTab]}
      
    </div>
  )
}

export default Side
