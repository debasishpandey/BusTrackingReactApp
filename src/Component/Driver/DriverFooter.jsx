import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DriverFooter() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-5 border-top">
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} BusTrack System | Driver Dashboard
        </small>
      </div>
    </footer>
  );
}
