import React, { useState } from 'react'
import './loginForm.scss'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser= (e)=>{
    e.preventDefault();
    console.log('holi')
    
  }

  return (
    <form className="loginForm" noValidate onSubmit={loginUser}>
      <input
        type="email"
        placeholder="Email"
        value={email.value}
        onChange={e => setEmail(e.target.value)}
        autoComplete="Email"
        className="loginForm__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password.value}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        className="loginForm__input"
      />
      <button className="loginForm__button" type="submit">Login</button>
    </form>
  )
}

export default LoginForm
