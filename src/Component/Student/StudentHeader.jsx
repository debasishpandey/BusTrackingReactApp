import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../../util/config";

const StudentHeader = () => {


 const [student, setStudent] = useState({});

   useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username);
    
    axios
      .get(`${config.api}/student/user/${username}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch(console.error);
  }, []);

const navigate = useNavigate();
     function handleClick(){
        navigate("student-dashboard")
     }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand onClick={handleClick}>Student Dashboard</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          <div className="dropdown">
            <img
              src= {student.profilePhotoPath || "https://via.placeholder.com/40"}
              alt="Profile"
              width="40"
              height="40"
              className="rounded-circle dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="/student-profile">
                  Profile
                </a>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem("username");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default StudentHeader;
