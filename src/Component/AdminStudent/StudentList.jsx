import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8081/student/all");
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (registrationNo) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8081/student/${registrationNo}`);
        setStudents(
          students.filter((s) => s.registrationNo !== registrationNo)
        );
      } catch (err) {
        console.error("Failed to delete student:", err);
        alert("Error deleting student.");
      }
    }
  };

  

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">All Registered Students</h3>
      <Row>
        {students.map((student) => (
          <Col
            md={4}
            sm={6}
            xs={12}
            key={student.registrationNo}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm">
              {student.profilePhotoPath ? (
                <Card.Img
                  variant="top"
                  src={`http://localhost:8081/images/${student.profilePhotoPath}`}
                  alt="Profile"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300x250?text=No+Photo"
                  alt="No Profile"
                />
              )}
              <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Text>
                  <strong>Reg No:</strong> {student.registrationNo}
                  <br />
                  <strong>Username:</strong> {student.username}
                  <br />
                  <strong>Bus:</strong>{" "}
                  {student.assignedBus?.busNumber || "Not assigned"}
                  <br />
                  <strong>Pickup:</strong> {student.pickupLocation}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate(
                        `/admin-dashboard/student/update/${student.registrationNo}`
                      );
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(student.registrationNo)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentList;
