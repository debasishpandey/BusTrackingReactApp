import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DriverHeader({ profilePhotoPath }) {
  const handleLogout = () => {
    localStorage.removeItem("username"); // Or "driverUsername" if stored differently
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <a className="navbar-brand fw-bold" href="#">
        🚌 BusTrack | Driver Panel
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Support
            </a>
          </li>

          {/* 👤 Profile Image + Dropdown */}
          <li className="nav-item dropdown">
            <img
              src={profilePhotoPath || "https://via.placeholder.com/40"}
              alt="Profile"
              className="rounded-circle dropdown-toggle"
              style={{ width: "40px", height: "40px", objectFit: "cover", cursor: "pointer" }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="/driver-profile">Profile</a>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
