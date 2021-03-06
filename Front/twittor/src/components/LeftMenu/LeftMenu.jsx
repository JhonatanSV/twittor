import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import TweetModal from "../Modal/TweetModal";

import { logoutAPI } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const user = useAuth();

  const [showModal, setShowModal] = useState(false);

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
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} />
        Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} />
        Cerrar sesión
      </Link>

      <Button onClick={() => setShowModal(true)}>Twittoar</Button>
      <TweetModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
