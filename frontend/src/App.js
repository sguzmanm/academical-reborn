import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

import Login from './pages/Login'
import Schedule from './pages/Schedule'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/schedule" component={Schedule} />
      </div>
    </Router>
  )
}

export default AppRouter
