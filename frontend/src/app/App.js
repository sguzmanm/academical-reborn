import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/mainStore';
import Login from '../pages/login/Login'
import Schedule from '../pages/schedule/Schedule'
import './App.css'

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/schedule" component={Schedule} />
      </Router>
    </Provider>
  )
}

export default AppRouter
