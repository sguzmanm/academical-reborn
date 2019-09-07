import initState from './state'

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'SET_CURRENT_MONDAY':
      return {
        ...state,
        curMonday: action.payload,
      }
    default:
      return state
  }
}
