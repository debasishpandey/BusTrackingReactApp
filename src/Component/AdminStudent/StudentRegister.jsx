import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import config from "../../util/config";

const StudentRegister = () => {
  const [student, setStudent] = useState({
    registrationNo: "",
    name: "",
    username: "",
    password: "",
    pickupLocation: "",
    email: "",
    phone: "",
    assignedBus: null,
  });
const apiUrl=config.api;
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/bus/all`);
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignedBus") {
      setStudent((prev) => ({
        ...prev,
        assignedBus: value ? { id: parseInt(value, 10) } : null,
      }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/student/register`, student);
      alert("✅ Student registered successfully!");

      // Optional: Reset form after success
      setStudent({
        registrationNo: "",
        name: "",
        username: "",
        password: "",
        pickupLocation: "",
        email: "",
        phone: "",
        assignedBus: null,
      });
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err);
      alert("❌ Failed to register student. Check inputs or server.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading buses...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Student Registration</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Registration No</Form.Label>
              <Form.Control
                type="text"
                name="registrationNo"
                value={student.registrationNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={student.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={student.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Pickup Location</Form.Label>
          <Form.Control
            type="text"
            name="pickupLocation"
            value={student.pickupLocation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign Bus</Form.Label>
          <Form.Select
            name="assignedBus"
            value={student.assignedBus?.id || ""}
            onChange={handleChange}
          >
            <option value="">-- Select Bus --</option>
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber} - {bus.routeName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          Register Student
        </Button>
      </Form>
    </Container>
  );
};

export default StudentRegister;
