import { result } from "lodash";
import { API_HOST } from "../utils/constants";

export function signUpAPI(user) {
  console.log(user);

  const url = `${API_HOST}/register`;
  const userTemp = {
    ...user,
    mail: user.mail.toLowerCase(),
    birthDate: new Date(),
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email no disponible" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function signInAPI(user) {
  const url = `${API_HOST}/login`;

  const data = {
    ...user,
    mail: user.mail.toLowerCase(),
  };

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Usuario o contraseña incorrectos" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
