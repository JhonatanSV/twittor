import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isMailValid } from "../../utils/validations";
import { signUpAPI } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setshowModal } = props;
  const [formData, setformData] = useState(initialFormValue());
  const [signUpLoading, setsignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;

    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else if (!isMailValid(formData.mail)) {
      toast.warning("Email invalido");
    } else if (formData.password !== formData.repeatPassword) {
      toast.warning("Las contraseñas no coinciden");
    } else if (size(formData.password) < 6) {
      toast.warning("La contraseña debe tener al menos 6 caracteres");
    } else {
      setsignUpLoading(true);
      signUpAPI(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("Registro completado");
            setshowModal(false);
            setformData(initialFormValue());
          }
        })
        .catch(() => {
          toast.error("Error del servidor, intentelo mas tarde");
        })
        .finally(() => {
          setsignUpLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu Cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                defaultValue={formData.name}
                name="name"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellido"
                defaultValue={formData.lastName}
                name="lastName"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electronico"
            defaultValue={formData.mail}
            name="mail"
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                defaultValue={formData.password}
                name="password"
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir Contraseña"
                defaultValue={formData.repeatPassword}
                name="repeatPassword"
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    name: "",
    lastName: "",
    mail: "",
    password: "",
    repeatPassword: "",
  };
}
