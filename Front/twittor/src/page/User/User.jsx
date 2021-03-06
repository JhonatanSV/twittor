import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Spinner } from "react-bootstrap";

import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListTweets from "../../components/ListTweets";
import useAuth from "../../hooks/useAuth";

import { getUserApi } from "../../api/user";
import { getUserTweetsAPI } from "../../api/tweet";

import "./User.scss";

function User(props) {
  const { setRefreshCheckLogin, match } = props;
  const { params } = match;
  const loggedUser = useAuth();

  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

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

  useEffect(() => {
    getUserTweetsAPI(params.id, 1)
      .then((response) => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingTweets(true);

    getUserTweetsAPI(params.id, pageTemp).then((response) => {
      if (!response) {
        setLoadingTweets(0);
      } else {
        setTweets([...tweets, ...response]);
        setPage(pageTemp);
        setLoadingTweets(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.lastName}` : "Este usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={() => moreData()}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Obtener mas tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default withRouter(User);
