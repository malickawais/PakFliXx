import React from "react";
import { Card, Form } from "react-bootstrap";

export default function Checkbox() {
  return (
    <Card>
      <Card.Body>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Watch Later" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Add to PlayList" />
          <Form.Check type="checkbox" label="Watch Later" />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
