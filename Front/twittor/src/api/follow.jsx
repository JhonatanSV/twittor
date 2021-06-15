import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export function checkFollowAPI(user) {
  const url = `${API_HOST}/consultrelation?id=${user}`;

  const params = {
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function followUserAPI(user) {
  const url = `${API_HOST}/insertrelation?id=${user}`;

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function unFollowUserAPI(user) {
  const url = `${API_HOST}/deleterelation?id=${user}`;

  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getFollowersAPI(paramsURL) {
  const url = `${API_HOST}/userlist?${paramsURL}`;

  const params = {
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
