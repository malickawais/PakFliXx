import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import MovieDetails from "../../views/MovieDetails/MovieDetails";

export default function ModalPage(props) {
  return (
    <Modal
      animation={false}
      show={props.show}
      fullscreen={true}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}
