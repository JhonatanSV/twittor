import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import useAuth from "../../hooks/useAuth";

import { getUserApi } from "../../api/user";

import "./User.scss";

function User(props) {
  const { match } = props;
  const [user, setUser] = useState(null);
  const { params } = match;
  const loggedUser = useAuth();

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        if (!response) {
          toast.error("El usuario que buscas no existe");
        }
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario que buscas no existe");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.lastName}` : "Este usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user_tweets">Tweets</div>
    </BasicLayout>
  );
}

export default withRouter(User);
