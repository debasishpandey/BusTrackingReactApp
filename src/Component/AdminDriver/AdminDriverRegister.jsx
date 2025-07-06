import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from "../../util/config";
import { toast } from 'react-toastify';


const AdminDriverRegister = () => {
  
const apiUrl=config.api;
  const [driver, setDriver] = useState({
    id: '',
    name: '',
    contact: '',
    email:'',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/driver/register`, driver)
      .then(() => {toast.success("Driver Registered.")})
      .catch((err) => {toast.error(err)});
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Register New Driver</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Driver ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={driver.id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={driver.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={driver.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={driver.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={driver.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={driver.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default AdminDriverRegister;
