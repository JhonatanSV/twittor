import React, { useState, Fragment } from "react";
import "./SignInSignUp.scss";
import { Container, Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import LogoTwittor from "../../assets/png/logo.png";
import LogoTwittorWhite from "../../assets/png/logo-white.png";

import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";

export default function SignInSignUp() {
  const [showModal, setshowModal] = useState(false);
  const [contentModal, setcontentModal] = useState(null);

  const openModal = (content) => {
    setshowModal(true);
    setcontentModal(content);
  };

  return (
    <Fragment>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RigthComponent openModal={openModal} setshowModal={setshowModal} />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setshowModal}>
        {contentModal}
      </BasicModal>
    </Fragment>
  );
}

const LeftComponent = () => {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoTwittor} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />- Sigue
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />- Enterate
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />- Unete
        </h2>
      </div>
    </Col>
  );
};

const RigthComponent = (props) => {
  const { openModal, setshowModal } = props;

  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoTwittorWhite} alt="Twittor" />
        <h2>Mira lo que esta pasando en el mundo en este momento</h2>
        <h3>Unete a Twittor ahora mismo</h3>

        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setshowModal={setshowModal} />)}
        >
          Registrate
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => openModal(<SignInForm setshowModal={setshowModal} />)}
        >
          Iniciar Sesion
        </Button>
      </div>
    </Col>
  );
};
