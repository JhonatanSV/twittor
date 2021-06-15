import React from "react";
import { Link } from "react-router-dom";

import Error404Logo from "../../assets/png/error-404.png";
import Logo from "../../assets/png/logo.png";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <img src={Logo} alt="Twittor" />
      <img src={Error404Logo} alt="Error404" />
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}
