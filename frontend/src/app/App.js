import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

import Login from '../pages/login/Login'
import Schedule from '../pages/schedule/Schedule'

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/schedule" component={Schedule} />
    </Router>
  )
}

export default AppRouter
