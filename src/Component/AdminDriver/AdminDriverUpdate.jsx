import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminDriverUpdate = () => {
  const { driverId } = useParams(); // assumes URL: /driver/update/:id
 

  const [driver, setDriver] = useState({
    id: '',
    name: '',
    contact: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/driver/${driverId}`)
      .then((res) => setDriver(res.data))
      .catch((err) => console.error('Error fetching driver:', err));
  }, [driverId]);
  console.log(driver);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/driver/update`, driver)
      .then(() => alert("update"))
      .catch((err) => console.error('Error updating driver:', err));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Update Driver Info</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Driver ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={driver.id}
                disabled
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
          </Col>
        </Row>
        <Button variant="primary" type="submit">Update Driver</Button>
      </Form>
    </Container>
  );
};

export default AdminDriverUpdate;
