import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('/home_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Overlay for darkening background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="container z-2">
        <div className="row align-items-center">
          {/* Left section: Header & Quote */}
          <div className="col-md-6 text-white text-start p-4">
            <h1 className="display-4 fw-bold mb-3">
              Student Bus Tracking System
            </h1>
            <blockquote className="fs-5 fst-italic text-light">
              "On time, every time — because every student's journey matters."
            </blockquote>
            <p className="mt-3 text-light">
              A smarter, real-time solution for parents, students, and
              institutions to stay informed about school transport.
            </p>
          </div>

          {/* Right section: Login Options */}
          <div
            className="col-md-6 d-flex flex-column align-items-center shadow-lg p-4"
            style={{
              backdropFilter: "blur(3px)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <h3 className="mb-4 text-white fw-semibold">Choose Your Role</h3>

            <a
              href="/admin-login"
              className="btn btn-outline-light w-75 py-3 mb-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
            >
              Admin Login
            </a>

            <a
              href="/student-login"
              className="btn btn-outline-light w-75 py-3 mb-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
            >
              Student Login
            </a>

            <a
              href="/driver-login"
              className="btn btn-outline-light w-75 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
            >
              Driver Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
