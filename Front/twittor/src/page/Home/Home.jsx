import React, { useEffect, useState } from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Button, Spinner } from "react-bootstrap";

import ListTweets from "../../components/ListTweets";

import { getTweetsFollowingAPI } from "../../api/tweet";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  useEffect(() => {
    getTweetsFollowingAPI(page)
      .then((response) => {
        if (!tweets && response != null) {
          setTweets(formatModel(response));
        } else {
          if (!response) {
            setLoadingTweets(0);
          } else {
            setTweets([...tweets, ...formatModel(response)]);
            setLoadingTweets(false);
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingTweets(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {tweets && <ListTweets tweets={tweets} />}
      <Button onClick={moreData} className="load-more">
        {!loadingTweets ? (
          loadingTweets !== 0 ? (
            "Obtener mas Tweets"
          ) : (
            "No hay mas Tweets"
          )
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
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetsTemp = [];

  tweets.forEach((tweet) => {
    tweetsTemp.push({
      _id: tweet._id,
      userid: tweet.userRelationId,
      message: tweet.Tweet.message,
      date: tweet.Tweet.date,
    });
  });

  return tweetsTemp;
}
