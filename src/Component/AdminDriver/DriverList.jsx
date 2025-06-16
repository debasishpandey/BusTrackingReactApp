import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/driver/all') 
      .then((res) => setDrivers(res.data))
      .catch((err) => console.error('Error fetching drivers:', err));
  }, []);

  const handleRemove = (id) => {
    axios.delete(`/api/drivers/${id}`)
      .then(() => {
        setDrivers((prevDrivers) => prevDrivers.filter(driver => driver.id !== id));
      })
      .catch((err) => console.error('Error removing driver:', err));
  };

 

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Driver Details</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {drivers.map((driver) => (
          <Col key={driver.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={driver.profile || '/default-profile.png'}
                alt="Profile"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{driver.name}</Card.Title>
                <Card.Text>
                  <strong>Contact:</strong> {driver.contact} <br />
                  <strong>Email:</strong> {driver.email} <br />
                  <strong>Username:</strong> {driver.username}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(driver.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/admin-dashboard/driver/update/${driver.id}`)}
                >
                  Update
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DriverList;
