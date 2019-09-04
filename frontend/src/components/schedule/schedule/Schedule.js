import React from 'react'
import Grid from './grid/Grid'
import ScheduleHeader from './scheduleHeader/ScheduleHeader'
import ScheduleBody from './scheduleBody/ScheduleBody'
import './Schedule.scss'


function Schedule() {
  return (
    <div className="schedule">
      <Grid></Grid>
      <div className="schedule__table">
        <ScheduleHeader></ScheduleHeader>
        <ScheduleBody></ScheduleBody>
      </div>
    </div>
  )
}

export default Schedule
