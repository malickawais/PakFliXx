import React, { useRef, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const confirmPasswordRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      console.log('here a');
      return setError(e?.message);
    }
    try {
      setError('');
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log('here b');
    } catch (e) {
      console.log(e);
      setError(e?.message);
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          {handleSubmit}
          <h2 className='text-center w-100'>Sign Up</h2>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                placeholder='Enter the Email'
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                required
                placeholder='Enter the Password'
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={confirmPasswordRef}
                required
                placeholder='Enter the Confirmed Password'
              ></Form.Control>
            </Form.Group>
            <Button onClick={handleSubmit} className='text-center w-100 '>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <span className='text'>
          Already Have an Account ?
          <Link className='ms-2' to='/Login'>
            Login
          </Link>
        </span>
      </Card>
    </>
  );
}
