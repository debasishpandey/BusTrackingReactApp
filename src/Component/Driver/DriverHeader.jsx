import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const DriverHeader = ({ profilePhotoPath = "https://via.placeholder.com/40", onLogout }) => {

const navigate = useNavigate();
     function handleClick(){
        navigate("driver-dashboard")
     }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top shadow">
      <Container>
        <Navbar.Brand onClick={handleClick}>Driver Dashboard</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-3">
          {/* 👤 Profile Picture & Dropdown */}
          <div className="dropdown">
            <img
              src={profilePhotoPath}
              alt="Driver"
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
                <a className="dropdown-item" href="/driver-profile">
                  Profile
                </a>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    if (onLogout) onLogout();
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

export default DriverHeader;
