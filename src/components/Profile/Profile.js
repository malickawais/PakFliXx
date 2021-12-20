import React, { useEffect, useState } from "react";
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

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "Salman",
    lastName: "Awan",
    email: "malickawais8@gmail.com",
  });

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  // const[password,setPassword] = useState("Pakistan");

  const [isFirstNameUpdating, setIsFirstNameUpdating] = useState(false);
  const [isLastNameUpdating, setIsLastNameUpdating] = useState(false);
  const [isEmailUpdating, setIsEmailUpdating] = useState(false);
  const [isPasswordUpdating, setPasswordUpdating] = useState(false);

  const onFirstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
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
            {isLastNameUpdating ? (
              <>
                <Form.Control
                  type="text"
                  value={lastName}
                  placeholder="Enter the First Name"
                />
                <Button
                  className="m-2"
                  variant="dark"
                  type="submit"
                  disabled={lastName === user.lastName}
                >
                  Save Changes
                </Button>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={() => setIsLastNameUpdating(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <div className="d-flex justify-content-between">
                  <Form.Label>Last Name</Form.Label>
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={() => setIsLastNameUpdating(true)}
                  >
                    Edit
                  </Button>
                </div>
                <Form.Text className="text-muted">{lastName}</Form.Text>
              </Form.Group>
            )}
            {isEmailUpdating ? (
              <>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="Enter the First Name"
                />
                <Button
                  className="m-2"
                  variant="dark"
                  type="submit"
                  disabled={email === user.email}
                >
                  Save Changes
                </Button>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={() => setIsEmailUpdating(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Email address :</Form.Label>
                    <Button
                      variant="dark"
                      type="submit"
                      onClick={() => setIsEmailUpdating(true)}
                    >
                      Edit
                    </Button>
                  </div>

                  <Form.Text className="text-muted">{email}</Form.Text>
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
