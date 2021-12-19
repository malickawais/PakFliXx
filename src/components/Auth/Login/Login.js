import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../Auth/ForgetPassword/ForgetPassword';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate.push('./');
    } catch (e) {
      console.log('e', e);
      setError(e?.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <h2 className='text-center mb-4'>Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email ' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className='w-100 mt-4'
            >
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/ForgetPassword'>Forgot Password ?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/Signup'>Sign up</Link>
      </div>
    </>
  );
}
