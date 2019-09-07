import initState from './state'

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'SET_CURRENT_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      }
    case 'SET_SCHEDULES':
      return{
        ...state,
        schedules: action.payload
      }
    default:
      return state
  }
}
