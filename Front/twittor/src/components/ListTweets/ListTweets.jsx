import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import moment from "moment";

import { getUserApi } from "../../api/user";
import { API_HOST } from "../../utils/constants";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import AvatarNoFound from "../../assets/png/avatar-no-found.png";

import "./ListTweets.scss";

export default function ListTweets(props) {
  const { tweets } = props;
  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    getUserApi(tweet.userid).then((response) => {
      setUserInfo(response);
      setAvatarURL(
        response?.avatar
          ? `${API_HOST}/getavatar?id=${response.id}`
          : AvatarNoFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarURL} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.name} {userInfo?.lastName}
          <span>{moment(tweet.date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}
