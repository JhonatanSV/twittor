import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import className from "classnames";
import { toast } from "react-toastify";

import { Close } from "../../../utils/icons";

import { addTweetAPI } from "../../../api/tweet";

import "./TweetModal.scss";

export default function TweetModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxLength = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= maxLength) {
      addTweetAPI(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            setShow(false);
            toast.success(response.message);
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          }
        })
        .catch(() => {
          toast.warning("Error al enviar el tweet, intentelo mas tarde");
        });
    }
  };

  return (
    <Modal
      className="tweet-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="¿Qué estas pensando?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={className("count", {
              error: message.length > maxLength,
            })}
          >
            {`${message.length}    Maximo 280 caracteres por tweet`}
          </span>
          <Button disabled={message.length > maxLength} type="submit">
            Twittoar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
