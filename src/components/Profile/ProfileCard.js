import React from "react";
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

export default function ProfileCard() {
  return (
    <>
      <Card className="Profile-main border-0">
        <Card.Body className="Profile-body">
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Add Profile Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            {isFirstNameUpdating ? (
              <>
                <Form.Control
                  type="text"
                  value={firstName}
                  placeholder="Enter the First Name"
                  onChange={onFirstNameChangeHandler}
                />
                <Button
                  className="m-2"
                  variant="dark"
                  type="submit"
                  onClick={() => {
                    setIsFirstNameUpdating(false);
                  }}
                  disabled={firstName === user.firstName}
                >
                  Save Changes
                </Button>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={() => setIsFirstNameUpdating(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <div className="d-flex justify-content-between">
                  <Form.Label>First Name</Form.Label>{" "}
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={() => {
                      setIsFirstNameUpdating(true);
                      setUser({
                        ...user,
                        firstName: firstName,
                      });
                    }}
                  >
                    Edit
                  </Button>
                </div>
                <Form.Text className="">{firstName}</Form.Text>
              </Form.Group>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
