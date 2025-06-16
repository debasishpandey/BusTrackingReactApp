import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-3" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1581349488520-2b7b45ef3cfa)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container p-5 shadow-lg bg-white bg-opacity-75 rounded-4" style={{ maxWidth: '700px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3468/3468377.png"
          alt="Bus Icon"
          style={{ width: '80px', marginBottom: '20px' }}
        />
        <h1 className="mb-3 fw-bold text-primary">Bus Tracking System</h1>
        <p className="mb-4 text-secondary fs-5">Choose your role to continue</p>

        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-4">
            <a href="/admin-login" className="btn btn-outline-primary w-100 py-3 rounded-3 shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Admin Icon"
                style={{ width: '30px', marginRight: '10px' }}
              />
              Admin Login
            </a>
          </div>
          <div className="col-12 col-md-4">
            <a href="/student-login" className="btn btn-outline-success w-100 py-3 rounded-3 shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/194/194931.png"
                alt="Student Icon"
                style={{ width: '30px', marginRight: '10px' }}
              />
              Student Login
            </a>
          </div>
          <div className="col-12 col-md-4">
            <a href="/driver-login" className="btn btn-outline-warning w-100 py-3 rounded-3 shadow-sm">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995520.png"
                alt="Driver Icon"
                style={{ width: '30px', marginRight: '10px' }}
              />
              Driver Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
