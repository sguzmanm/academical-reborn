import React, { useState } from 'react'
import './login.scss'
import LoginForm from '../../components/login/loginForm/loginForm'
import SignUpForm from '../../components/login/signUpForm/signUpForm'

function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleIsLogin= ()=>{
    setIsLogin(!isLogin)
  }

  return (
    <div className="loginPage">
      <h1 className="loginPage__title">Academical</h1>
      {isLogin ? <LoginForm></LoginForm> : <SignUpForm></SignUpForm>}
      <p>
        Eres nuevo? <span className="loginPage__butSwitch" onClick={toggleIsLogin.bind(null)}>Regístrate</span>
      </p>
    </div>
  )
}

export default Login
