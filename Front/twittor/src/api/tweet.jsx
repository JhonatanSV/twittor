import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export function addTweetAPI(tweet) {
  const url = `${API_HOST}/savetweet`;

  const data = {
    message: tweet,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Tweet enviado" };
      }
      return { code: 500, message: "Error del servidor" };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserTweetsAPI(user, page) {
  const url = `${API_HOST}/readtweet?id=${user}&page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
