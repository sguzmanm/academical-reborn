import React, { useState } from 'react'
import './Nav.scss'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '../../../store/auth'
import { logout as deleteUserInfo } from '../../../util/state/localStorageUtil'
import { withRouter } from 'react-router-dom'

function Nav(props) {
  const [isUserModalOpen, setUserModalOpen] = useState(false)
  const dispatch = useDispatch()

  const logout = () => {
    
    
    deleteUserInfo()
    dispatch(logoutAction())
    props.history.push('/login')
  }

  return (
    <div className="nav">
      <h2 className="nav__logo">Academical</h2>
      <div className="nav__dates">
        <h3 className="nav__date nav__date--1">&lt;</h3>
        <h3 className="nav__date nav__date--2">26 Julio - 1 Agosto</h3>
        <h3 className="nav__date nav__date--3">&gt;</h3>
      </div>
      <img
        className="nav__userIcon"
        src={require('../../../assets/icons/person.svg')}
        alt="user icon"
        onClick={() => setUserModalOpen(!isUserModalOpen)}
      />
      {isUserModalOpen ? (
        <div className="nav__modal">
          <p className="nav__modalOption" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(Nav)
