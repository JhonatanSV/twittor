import React, { useEffect, useState } from "react";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";

import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers/ListUsers";

import { getFollowersAPI } from "../../api/follow";

import "./Users.scss";

function Users(props) {
  const { setRefreshCheckLogin, location, history } = props;
  const params = useUserQuery(location);

  const [users, setUsers] = useState(null);
  const [typeUser, setTypeUser] = useState(params.type || "follow");
  const [inputSearch, setInputSearch] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const onSearch = useDebouncedCallback((value) => {
    setUsers(null);
    setInputSearch(value);
    history.push({
      search: queryString.stringify({
        ...params,
        search: value,
        page: 1,
      }),
    });
  }, 100);

  useEffect(() => {
    getFollowersAPI(queryString.stringify(params))
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (params.page == 1) {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setBtnLoading(0);
          } else {
            setUsers([...users, ...response]);
            setBtnLoading(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeType = (type) => {
    setUsers(null);
    setInputSearch("");
    setBtnLoading(false);
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }
    history.push({
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    history.push({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          value={inputSearch}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar Usuario..."
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => onChangeType("follow")}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => onChangeType("new")}
        >
          Nuevos
        </Button>
      </ButtonGroup>

      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Buscando Usuarios
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Cargar mas usuarios"
            ) : (
              <Spinner
                animation="grow"
                as="span"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </>
      )}
    </BasicLayout>
  );
}

function useUserQuery(location) {
  const {
    page = 1,
    type = "follow",
    search,
  } = queryString.parse(location.search);

  return { page, type, search };
}

export default withRouter(Users);
