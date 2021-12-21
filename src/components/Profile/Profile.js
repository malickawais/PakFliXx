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
import ProfileCard from "./ProfileCard";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "Salman",
    lastName: "Awan",
    email: "malickawais8@gmail.com",
    userName: "Mani34",
  });

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.userName);

  return (
    <Card className="Profile-main border-0">
      <Card.Body className="Profile-body">
        <ProfileCard
          userValue={user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onSaveChanges={() => {
            setUser({
              ...user,
              firstName: firstName,
            });
          }}
          value={firstName}
          label="First Name"
        />

        <ProfileCard
          user={user}
          userValue={user.lastName}
          onChange={(e) => setLastName(e.target.value)}
          onSaveChanges={() => {
            setUser({
              ...user,
              lastName: lastName,
            });
          }}
          value={lastName}
          label="Last Name"
        />

        <ProfileCard
          user={user}
          userValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          onSaveChanges={() => {
            setUser({
              ...user,
              email: email,
            });
          }}
          value={email}
          label="Email"
        />
        <ProfileCard
          userValue={user.userName}
          onChange={(e) => setUserName(e.target.value)}
          onSaveChanges={() => {
            setUser({
              ...user,
              userName: userName,
            });
          }}
          value={userName}
          label="User Name"
        />
      </Card.Body>
    </Card>
  );
}
