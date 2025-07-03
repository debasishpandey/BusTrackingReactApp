import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RoleLogin = ({ role }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  let toUrl = '/';


  const cardStyle = {
     background: 'rgba(255, 255, 255, 0.1)',      // transparent background
  backdropFilter: 'blur(3px)',               // blur effect
  WebkitBackdropFilter: 'blur(10px)',         // Safari support
  borderRadius: '20px',
  padding: '30px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#fff',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toUrl = role.toLowerCase();

    try {
      const response = await axios.post(`http://localhost:8081/${role}/login`, {
        username,
        password,
      });

      if (response.data === true) {
        localStorage.setItem("username", username);
        navigate(`/${toUrl}-dashboard`);
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  const isPasswordResetVisible = ['student', 'driver'].includes(role.toLowerCase());

  return (
    <Container
  fluid
  className="d-flex align-items-center justify-content-center vh-100"
  style={{
    backgroundImage: 'url("/login_bg.jpg")',  // 👈 your image path here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'blur(2px)', // Optional: smooth effect
  }}
>
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold text-dark">{role} login</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {isPasswordResetVisible && (
                  <div className="text-end mb-3">
                    <a href={`/forgot-password/${role}`} className="text-light text-decoration-underline" style={{ fontSize: '0.9rem' }}>
                      Forgot Password?
                    </a>
                  </div>
                )}

                <div className="d-grid">
                  <Button variant="light" type="submit" className="fw-semibold">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RoleLogin;
