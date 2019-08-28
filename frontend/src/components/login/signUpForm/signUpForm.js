import React, { useState } from 'react'
import './signUpForm.scss'

function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signUpUser= (e)=>{
    e.preventDefault();
    console.log('hola')
    
  }

  return (
    <form className="signUpForm" noValidate onSubmit={signUpUser}>
      <input
        type="email"
        placeholder="Email"
        value={email.value}
        onChange={e => setEmail(e.target.value)}
        autoComplete="Email"
        className="signUpForm__input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password.value}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword.value}
        onChange={e => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      <button className="signUpForm__button" type="submit">SignUp</button>
    </form>
  )
}

export default SignUpForm
