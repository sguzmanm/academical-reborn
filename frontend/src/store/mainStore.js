import { combineReducers, createStore } from 'redux'
import auth from './auth'
import events from './events'
import root from './root'

const reducers = combineReducers({
  events,
  auth,
  root
})

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
