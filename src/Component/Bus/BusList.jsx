import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../../util/config";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl=config.api;
  const navigate=useNavigate();
  // Fetch buses on mount
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

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await axios.delete(`${apiUrl}/bus/${id}`);
      setBuses((prev) => prev.filter((bus) => bus.id !== id));
      alert("Bus removed successfully.");
    } catch (error) {
      console.error("Error removing bus:", error);
      alert("Failed to remove bus.");
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
    <div className="container mt-4">
      <h3>All Registered Buses</h3>
      {buses.length === 0 ? (
        <p>No buses found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Bus Number</th>
              <th>Route Name</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.routeName}</td>
                <td>{bus.assignedDriver ? bus.assignedDriver.name : "Not Assign"}</td>
                <td>{bus.status ? "Active" : "Inactive"}</td>
                <td>{bus.latitude ?? "-"}</td>
                <td>{bus.longitude ?? "-"}</td>
                <td>
                  <Button className="mr-4"
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(bus.id)}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={()=>{
                      navigate(`/admin-dashboard/bus/update/${bus.id}`)
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BusList;
