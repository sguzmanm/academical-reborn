import initState from './state'

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'SET_SCHEDULE':
      return {
        ...state,
        schedule: action.payload,
      }
    case 'ADD_SCHEDULES':
      return{
        ...state,
        schedules: action.payload
      }
    default:
      return state
  }
}
