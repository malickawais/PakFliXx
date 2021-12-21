import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Button,
  Row,
  Col,
  Collapse,
  Card,
} from "react-bootstrap";
import "./Profile.css";

export default function ProfileInputCard({
  value,
  onSaveChanges,
  userValue,
  label,
  onChange,
}) {
  const [isInputUpdating, setIsInputUpdating] = useState(false);

  return (
    <Form>
      {isInputUpdating ? (
        <>
          <Form.Control
            type="text"
            value={value}
            placeholder="Enter the First Name"
            onChange={onChange}
          />
          <Button
            className="m-2"
            variant="dark"
            type="submit"
            onClick={() => {
              setIsInputUpdating(false);
              onSaveChanges();
            }}
            disabled={value === userValue}
          >
            Save Changes
          </Button>
          <Button
            variant="dark"
            type="submit"
            onClick={() => setIsInputUpdating(false)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <div className="d-flex justify-content-between">
            <Form.Label>{label}</Form.Label>{" "}
            <Button
              variant="dark"
              type="submit"
              onClick={() => {
                setIsInputUpdating(true);
              }}
            >
              Edit
            </Button>
          </div>
          <Form.Text className="">{value}</Form.Text>
        </Form.Group>
      )}
    </Form>
  );
}
