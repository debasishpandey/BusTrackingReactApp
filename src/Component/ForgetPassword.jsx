import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import config from "../util/config";

const ForgotPassword = () => {
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'verify'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };


 
  const handleSendOTP = async (e) => {
  e.preventDefault();
  try {
    console.log(email);

    const response = await axios.post(`${config.api}/otp/send?email=${email}`);

    // Since the backend just returns a plain string like "OTP sent"
    if (response.status === 200 && response.data.includes("OTP sent")) {
      setMessage('OTP sent successfully!');
      setStep('verify');
    } else {
      setMessage('User not found.');
    }
  } catch (error) {
    setMessage('Failed to send OTP.');
    console.error(error);
  }
};


  const handleVerifyOTP = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${config.api}/otp/validate`, {
      username: email,     // or registrationNo
      password: otp        // 'password' field holds the OTP in your backend logic
    });

    if (response.status === 200 && response.data === "OTP is valid") {

      setMessage("OTP verified. You can now reset your password.");
      navigate(`/${role}/reset-password`, { state: { username: email } });
      
      // Redirect or show reset password form
    } else {
      setMessage("Invalid OTP. Try again.");
    }
  } catch (error) {
    setMessage("Verification failed.");
    console.error(error);
  }
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
              <h3 className="text-center mb-4 fw-bold text-light">Password Reset</h3>

              {message && <p className="text-warning text-center">{message}</p>}

              <Form onSubmit={step === 'request' ? handleSendOTP : handleVerifyOTP}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-light">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {step === 'verify' && (
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                <div className="d-grid">
                  <Button type="submit" variant="light" className="fw-semibold">
                    {step === 'request' ? 'Send OTP' : 'Confirm'}
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

export default ForgotPassword;
