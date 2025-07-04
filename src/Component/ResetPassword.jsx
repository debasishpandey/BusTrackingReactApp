import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import config from "../util/config";

const ResetPassword = ({ role = 'student' }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const username = location.state?.username || '';
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    console.log(username+newPassword);
    

    try {
      const response = await axios.post(`${config.api}/${role}/reset-password`,  {
      username: username,     
      password: newPassword       
    });

      if (response.status === 200) {
        alert('Password reset successfully. Please login.');
          setTimeout(() => {
    navigate(`${role}-login`);  
  }, 2000);
      } else {
        setMessage('Failed to reset password.');
      }
    } catch (error) {
      setMessage('Error occurred. Try again.');
      console.error(error);
    }
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: 'url("/login_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold text-light">Reset Password</h3>

              <Form onSubmit={handleReset}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {message && <p className="text-warning text-center">{message}</p>}

                <div className="d-grid">
                  <Button variant="light" type="submit" className="fw-semibold">
                    Update Password
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

export default ResetPassword;
