/* eslint-disable no-undef */
import React, { useState,useEffect,useRef } from "react";
import "./Nav.scss";
import ActionModal from "../../actions/actionModal/ActionModal.js";
import "../../actions/actionModal/ActionModal.scss";
import Summary from "../summary/Summary.js";



import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../../store/auth";
import { setMonday,setActCurMonday } from "../../../store/week";
import { logout as deleteUserInfo } from "../../../util/state/localStorageUtil";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

const MODAL_VERIFICATION_KEY="modalVerification";

function Nav(props) {
  const disclaimerModal = useRef(null);
  const summaryModal = useRef(null);
  
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const curMonday = useSelector(state => state.week.curMonday);

  const logout = () => {
    deleteUserInfo();
    dispatch(logoutAction());
    props.history.push("/login");
  };

  const changeMonday = (howMuch) => {
    const newDate = new Date(curMonday.getTime() + 60 * 60 * 24 * 7 * 1000 * howMuch);
    dispatch(setMonday(newDate));
    dispatch(setActCurMonday(newDate));
  };

  const getMondayFormatted = () =>{
    const monday=new Date(curMonday);
    let locale= "es-CO";
    let month= monday.toLocaleString(locale, { month: "long" });
    month=month.charAt(0).toUpperCase() + month.slice(1);
    return month + " "+ monday.getDate();
  };

  const getSaturdayFormatted = () =>{
    const saturday=new Date(curMonday);
    saturday.setDate(saturday.getDate() + 6);
    let locale= "es-CO";
    let month= saturday.toLocaleString(locale, { month: "long" });
    month=month.charAt(0).toUpperCase() + month.slice(1);
    return month + " "+ saturday.getDate();
  };

  useEffect(()=>{
    if(!localStorage.getItem(MODAL_VERIFICATION_KEY)){
      disclaimerModal.current.toggle();
      localStorage.setItem(MODAL_VERIFICATION_KEY,"true");
    }
  },[]);

  const disclaimer=(
    <p>Academical Reborn es un proyecto que se presenta como una alternativa de visualización de horarios académicos de estudiantes en la Universidad de Los Andes para el semestre 2020-10. Los errores y las oportunidades de mejora existen, pero lo importante es el intento y que si en realidad se quiere, se le dé mantenimiento a esta plataforma. Los datos de horarios se sacan de un archivo que se actualiza cada mañana de forma manual, así que la información mostrada en esta plataforma DEBE verificarse con todo lo que se encuentra en banner para no confiarse respecto a cupos y/o horarios</p>
  );


  return (
    <div className="nav" key={curMonday.getDate()}>
      <h2 className="nav__logo">Academical</h2>
      <div className="nav__dates">
        <h3 className="nav__date nav__date--1" onClick={()=>changeMonday(-1)}>&lt;</h3>
        <h3 className="nav__date nav__date--2">{getMondayFormatted()} - {getSaturdayFormatted()}</h3>
        <h3 className="nav__date nav__date--3" onClick={()=>changeMonday(1)}>&gt;</h3>
      </div>
      <div className="nav__user">
        <img
          className="nav__userIcon"
          src={require("../../../assets/icons/list-header.svg")}
          alt="user"
          onClick={() => summaryModal.current.toggle()}
        />
        <a href='/' target="_blank"> <img className="nav__userIcon" src={require("../../../assets/icons/help.svg")} alt="help"/></a>
        <img
          className="nav__userIcon"
          src={require("../../../assets/icons/person.svg")}
          alt="user"
          onClick={() => setUserModalOpen(!isUserModalOpen)}
        />
      </div>
      {isUserModalOpen ? (
        <div className="nav__modal">
          <p className="nav__modalOption" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      ) : null}



      <ActionModal ref={disclaimerModal}
        modalHeaderColor="white"
        modalHeaderTitle="Aviso legal? XD"
        modalBody={disclaimer}
        okCBK={() => {disclaimerModal.current.toggle();}}
        okText="OK"/>


      <ActionModal ref={summaryModal}
        modalHeaderColor="white"
        modalHeaderTitle="Mis cursos"
        modalBody={<Summary/>}/>


    </div>
  );
}


Nav.propTypes = {
  history: PropTypes.any
};

export default withRouter(Nav);
