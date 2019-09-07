export const setCurrentSchedule = schedule => ({
  type: 'SET_CURRENT_SCHEDULE',
  payload: schedule,
})

export const addItem = item => ({
  type: 'ADD_ITEM_TO_SCHEDULE',
  payload: item,
})

export const setSchedules = schedules => ({
  type: 'SET_SCHEDULES',
  payload: schedules,
})