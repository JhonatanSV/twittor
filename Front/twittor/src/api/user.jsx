import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export function getUserApi(id) {
  const url = `${API_HOST}/viewprofile?id=${id}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function uploadBannerAPI(file) {
  const url = `${API_HOST}/uploadbanner`;

  const formData = new FormData();
  formData.append("banner", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: formData,
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

export function uploadAvatarAPI(file) {
  const url = `${API_HOST}/uploadavatar`;

  const formData = new FormData();
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: formData,
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

export function updateInfoAPI(data) {
  const url = `${API_HOST}/modifyprofile`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response;
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
