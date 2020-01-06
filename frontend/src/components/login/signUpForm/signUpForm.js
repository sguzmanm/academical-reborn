import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/auth";
import { saveAuth } from "../../../util/state/localStorageUtil";
import "./signUpForm.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

function SignUpForm(props) {
  const url = useSelector(state => state.root.url);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const signUpUser = async e => {
    e.preventDefault();
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line no-useless-escape
    if (!email || !re.test(String(email).toLowerCase())) {
      return setErrorMsg("Debe ingresar un email válido");
    }
    if (!password || password.length < 5) {
      return setErrorMsg(
        "Debe ingresar una contraseña de al menos 5 caracteres"
      );
    }
    if (confirmPassword !== password) {
      return setErrorMsg("Las contraseñas deben coincidir");
    }

    try {
      const res = await axios.post(`${url}users/signup`, { email, password });
      saveAuth(res.data);
      dispatch(setAuth(res.data));
      props.history.push("/schedule");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      if(err.response && err.response.data && err.response.data.message){
        setErrorMsg(err.response.data.message);
      }
      else{
        setErrorMsg("Ocurrió un error interno inesperado. Por favor repórtalo para ayudarnos a mejorar :) e intenta más tarde cuando lo arreglemos");
      }
    }
  };

  return (
    <form className="signUpForm" noValidate onSubmit={signUpUser}>
      <input
        type="email"
        placeholder="Email"
        value={email.value}
        onChange={e => setEmail(e.target.value)}
        autoComplete="Correo"
        className="signUpForm__input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password.value}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword.value}
        onChange={e => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        className="signUpForm__input"
      />
      {errorMsg ? <p className="signUpForm__errorMsg">{errorMsg}</p> : null}
      <button
        className={`signUpForm__button ${
          errorMsg ? "signUpForm__button--error" : ""
        }`}
        type="submit"
      >
        Registrarse
      </button>
    </form>
  );
}

SignUpForm.propTypes = {
  history: PropTypes.any,
};

export default withRouter(SignUpForm);
