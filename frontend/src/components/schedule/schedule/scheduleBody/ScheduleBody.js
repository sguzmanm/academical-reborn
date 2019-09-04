import React from 'react'
import './ScheduleBody.scss'

function ScheduleBody() {
  return (
    <div className="scheduleBody">
      {Array.apply(null, { length: 28 }).map((_, i) => (
        <div className="scheduleBody__row" key={i}>
          {Array.apply(null, { length: 7 }).map((_, j) => (
            <div className="scheduleBody__cell" key={j}>
              {j === 0 && i % 2 === 0 ? <p className="scheduleBody__hour">{i / 2 + 6}</p> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ScheduleBody
