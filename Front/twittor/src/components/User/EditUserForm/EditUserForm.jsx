import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { Camera } from "../../../utils/icons";
import { API_HOST } from "../../../utils/constants";

import {
  uploadBannerAPI,
  uploadAvatarAPI,
  updateInfoAPI,
} from "../../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;

  const [formData, setFormData] = useState(initialValue(user));
  const [bannerURL, setBannerURL] = useState(
    user?.banner ? `${API_HOST}/getbanner?id=${user.id}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(
    user?.avatar ? `${API_HOST}/getavatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerURL(URL.createObjectURL(file));
    setBannerFile(file);
  });
  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarURL(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bannerFile) {
      await uploadBannerAPI(bannerFile).catch(() => {
        toast.error("Error al subir el nuevo banner");
      });
    }

    if (avatarFile) {
      await uploadAvatarAPI(avatarFile).catch(() => {
        toast.error("Error al subir el nuevo avatar");
      });
    }

    await updateInfoAPI(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Error al actualizar los nuevos datos de usuario");
      });

    window.location.reload();
    setLoading(false);
  };

  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerURL})` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>

      <div
        className="avatar"
        style={{ backgroundImage: `url(${avatarURL})` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombres"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="lastName"
                defaultValue={formData.lastName}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Agrega tu biografia"
            type="text"
            name="biography"
            defaultValue={formData.biography}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio web"
            name="webSite"
            defaultValue={formData.webSite}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholderText="Fecha de nacimiento"
            locale={es}
            selected={new Date(formData.birthDate)}
            showPopperArrow={false}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
          />
        </Form.Group>

        <Button className="btn-submit" variant="primary" type="submit">
          {loading ? <Spinner animation="border" size="sm" /> : "Actualizar"}
        </Button>
      </Form>
    </div>
  );
}

function initialValue(user) {
  return {
    name: user.name || "",
    lastName: user.lastName || "",
    biography: user.biography || "",
    location: user.location || "",
    webSite: user.webSite || "",
    birthDate: user.birthDate || "",
  };
}
