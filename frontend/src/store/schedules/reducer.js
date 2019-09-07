import initState from './state'

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_CURRENT_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      }
    case 'SET_SCHEDULES':
      return {
        ...state,
        schedules: action.payload
      }
    case 'ADD_ITEM_TO_SCHEDULE':

      console.log(state)
      return state
    default:
      return state
  }
}
