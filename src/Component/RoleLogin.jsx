import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const RoleLogin = ({ role }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin': return '#343a40';
      case 'student': return '#007bff';
      case 'driver': return '#28a745';
      default: return '#6c757d';
    }
  };

  const navigate=useNavigate();
  let toUrl="/";
  const cardStyle = {
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    background: `linear-gradient(135deg, ${getColor(role)} 30%, #ffffff 100%)`,
    color: '#fff',
    borderRadius: '20px',
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  
    toUrl=role.toLowerCase();

  try {
    const response = await axios.post(`http://localhost:8081/${role}/login`, {
      username,
      password
    });

     if (response.data === true) {
      // Login successful — redirect based on role
     navigate(`/${toUrl}-dashboard`)
    } else {
      alert('Invalid credentials. Please try again.');
    }

  } catch (error) {
    console.error('Login failed:', error);
    alert('Something went wrong. Try again later.');
  }
};


  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100" style={{ background: '#f8f9fa' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <h3 className="text-center mb-4">{role} Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="light" type="submit">
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
