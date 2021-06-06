import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import { logoutAPI } from "../../api/auth";

import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;

  const logout = () => {
    logoutAPI();
    setRefreshCheckLogin(true);
  };

  return (
    <div className="left-menu">
      <img src={LogoWhite} alt="twittor" className="logo" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} />
        Usuarios
      </Link>
      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} />
        Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} />
        Cerrar sesión
      </Link>

      <Button>Twittoar</Button>
    </div>
  );
}
