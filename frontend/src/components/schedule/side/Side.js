import React from 'react'
import './Side.scss'

import { useSelector, useDispatch } from 'react-redux'

function Side() {

	const approvedColors=["#225378","#1595A3","#ACF0F2","#F2FFE3","#EB7F00"]
	const events= useSelector(state=>state.events.events)
	const testEvents=events.map(el=>(
		<div key={el._id} className="occurrence-cell" style={{backgroundColor:approvedColors[Math.floor(Math.random()*approvedColors.length)]}}>
			<p>{}</p>
			<h4>{el.title}</h4>
			<h6>{el.type}</h6>
		</div>
		)
	)

    return (
      <div className="side">
		<div className="search-bar">
			Eventos
		</div>
			
		{testEvents}
      </div>
    )
  }
  
  export default Side