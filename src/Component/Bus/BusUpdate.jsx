import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import config from "../../util/config";

const BusUpdate = () => {
  const { busId } = useParams(); // assumes route: /admin/bus/update/:busId


  const [bus, setBus] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch bus details
    axios.get(`${config.api}/bus/${busId}`)
      .then(res => setBus(res.data))
      .catch(err => console.error('Failed to fetch bus:', err));

    // Fetch available drivers
    axios.get(`${config.api}/driver/all`)
      .then(res => setDrivers(res.data))
      .catch(err => console.error('Failed to fetch drivers:', err));
  }, [busId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBus({ ...bus, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("cliked");
    

    axios.put(`${config.api}/bus/update`, bus)
      .then(() => {
        toast.success('bus details updated successfully!');
        console.log("update");
        
      })
      .catch(err => {
        toast.error('Update failed:', err);
        alert('Failed to update bus');
      });
  };

  if (!bus) return <Spinner animation="border" className="m-5" />;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Update Bus Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bus Number</Form.Label>
              <Form.Control
                type="text"
                name="busNumber"
                value={bus.busNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Route Name</Form.Label>
              <Form.Control
                type="text"
                name="routeName"
                value={bus.routeName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                name="latitude"
                value={bus.latitude}
                onChange={handleChange}
                step="any"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                name="longitude"
                value={bus.longitude}
                onChange={handleChange}
                step="any"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={bus.status}
            onChange={(e) =>
              setBus({ ...bus, status: e.target.value === 'true' })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign Driver</Form.Label>
          <Form.Select
            name="assignedDriver"
            value={bus.assignedDriver?.id || ''}
            onChange={(e) =>
              setBus({
                ...bus,
                assignedDriver: { id: e.target.value },
              })
            }
           >
            <option value="">-- Select Driver --</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Bus
        </Button>
      </Form>
    </Container>
  );
};

export default BusUpdate;
