import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const AdminStudentUpdate = () => {
  const { registrationNo } = useParams();

  const [buses, setBus] = useState([]);
  const [studentData, setStudentData] = useState({
    name: '',
    username: '',
    isComingToday: false,
    assignedBus: null,
    pickupLocation: '',
    profilePhotoPath: '',
    password: '',
    registrationNo: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/student/${registrationNo}`)
      .then((res) => {
        const fetchedStudent = res.data;
        // Set assignedBus to null if missing
        if (!fetchedStudent.assignedBus) {
          fetchedStudent.assignedBus = null;
        }
        setStudentData(fetchedStudent);
      })
      .catch((err) => console.error(err));

    axios.get('http://localhost:8081/bus/all')
      .then(res => setBus(res.data))
      .catch(err => console.error('Failed to fetch buses:', err));
  }, [registrationNo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "assignedBus") {
      setStudentData((prev) => ({
        ...prev,
        assignedBus: value ? { id: parseInt(value) } : null
      }));
    } else {
      setStudentData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8081/student/update`, studentData)
      .then(() => alert("Student updated successfully"))
      .catch((err) => console.error("Error updating student:", err));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Update Student</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Registration No</Form.Label>
              <Form.Control type="text" value={registrationNo} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={studentData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={studentData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                name="isComingToday"
                label="Is Coming Today?"
                type="checkbox"
                checked={studentData.isComingToday}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assign Bus</Form.Label>
              <Form.Select
                name="assignedBus"
                value={studentData.assignedBus?.id || ''}
                onChange={handleChange}
              >
                <option value="">-- Unassign Bus --</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.busNumber}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control
                name="pickupLocation"
                value={studentData.pickupLocation}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Photo Path</Form.Label>
              <Form.Control
                name="profilePhotoPath"
                value={studentData.profilePhotoPath}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default AdminStudentUpdate;
