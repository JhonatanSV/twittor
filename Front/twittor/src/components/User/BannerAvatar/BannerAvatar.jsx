import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";

import { API_HOST } from "../../../utils/constants";
import {
  checkFollowAPI,
  followUserAPI,
  unFollowUserAPI,
} from "../../../api/follow";

import AvatarNotFound from "../../../assets/png/avatar-no-found.png";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerURL = user?.banner ? `${API_HOST}/getbanner?id=${user.id}` : null;
  const avatarURL = user?.avatar
    ? `${API_HOST}/getavatar?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (user) {
      checkFollowAPI(user?.id).then((response) => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserAPI(user.id).then((response) => {
      setReloadFollow(true);
    });
  };

  const onUnFollow = () => {
    unFollowUserAPI(user.id).then((response) => {
      setReloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerURL}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarURL}')` }}
      ></div>
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar Perfil</Button>
          )}
          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button className="unFollow" onClick={() => onUnFollow()}>
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={() => onFollow()}>Seguir</Button>
            ))}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
