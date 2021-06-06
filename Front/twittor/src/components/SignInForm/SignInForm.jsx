import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isMailValid } from "../../utils/validations";
import { signInAPI, setTokenAPI } from "../../api/auth";

import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setformData] = useState(initialFormValue());
  const [signInLoading, setsignInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formData) !== validCount) {
      toast.warning("Completa todos los campos necesarios");
    } else if (!isMailValid(formData.mail)) {
      toast.warning("Email invalido");
    } else {
      setsignInLoading(true);
      signInAPI(formData)
        .then((response) => {
          if (response.message) {
            toast.warning(response.message);
          } else {
            setTokenAPI(response.token);
            setRefreshCheckLogin(true);
          }
        })
        .catch(() => {
          toast.error("Error del servidor, intentelo mas tarde");
        })
        .finally(() => {
          setsignInLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Entrar</h2>
      <Form onChange={onChange} onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo electronico"
            name="mail"
            defaultValue={formData.mail}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signInLoading ? "Iniciar sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    mail: "",
    password: "",
  };
}
