import React from 'react'
import './Side.scss'

import { useSelector, useDispatch } from 'react-redux'

function Side() {

	const events= useSelector(state=>state.events.events)
	const testEvents=events.map(el=>(
		<li key={el._id}>
			{el.title+' '+el.description}
		</li>
		)
	)

    return (
      <div className="side">
		<ul>
			{testEvents}
		</ul>
      </div>
    )
  }
  
  export default Side