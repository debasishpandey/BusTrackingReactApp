import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Leaflet icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState(false);
  const [driverLocation, setDriverLocation] = useState([20.2961, 85.8245]); // Default Bhubaneswar
  const [students, setStudents] = useState([]);

  // Get driver's location (once)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDriverLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn("Geolocation error:", err);
        }
      );
    }
  }, []);

  // Fetch students every 2 seconds
  useEffect(() => {
    const fetchStudents = () => {
      fetch("http://localhost:8081/student/all")
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Failed to fetch students:", err));
    };

    fetchStudents();
    const intervalId = setInterval(fetchStudents, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const comingStudents = students.filter((s) => s.isComingToday);
  const notComingStudents = students.filter((s) => !s.isComingToday);

  return (
    <div className="container py-4">
      <h2 className="mb-3 d-flex align-items-center justify-content-between">
        Student Status
        <div className="form-check form-switch d-flex align-items-center gap-2">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="driverStatusSwitch"
            checked={driverStatus}
            onChange={() => setDriverStatus(!driverStatus)}
          />
          <label className="form-check-label small text-muted" htmlFor="driverStatusSwitch">
            {driverStatus ? "Driver Active" : "Driver Inactive"}
          </label>
        </div>
      </h2>

      <div className="row">
        {/* Coming Students */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-success">
            <div className="card-header bg-success text-white">
              ✅ Coming ({comingStudents.length})
            </div>
            <div className="card-body p-0">
              {comingStudents.length === 0 ? (
                <p className="p-3 mb-0">No students marked as coming.</p>
              ) : (
                <table className="table table-striped table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Pickup Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comingStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.pickupLocation || "Not specified"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Not Coming Students */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-danger">
            <div className="card-header bg-danger text-white">
              ❌ Not Coming ({notComingStudents.length})
            </div>
            <div className="card-body p-0">
              {notComingStudents.length === 0 ? (
                <p className="p-3 mb-0">All students are coming today.</p>
              ) : (
                <table className="table table-striped table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Pickup Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notComingStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.pickupLocation || "Not specified"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Live Map View</h5>
          <div style={{ height: "500px", width: "100%" }} className="rounded overflow-hidden">
            <MapContainer center={driverLocation} zoom={14} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Driver Marker */}
              <Marker position={driverLocation}>
                <Popup>
                  <strong>You (Driver)</strong>
                </Popup>
                <Tooltip permanent direction="top" offset={[0, -10]}>
                  Driver
                </Tooltip>
              </Marker>

              {/* Student Markers */}
              {students
  .filter((student) => student.isComingToday) // ✅ Only include students who are coming
  .map((student) => (
    <Marker
      key={`${student.id}-${student.latitude}-${student.longitude}`}
      position={[student.latitude, student.longitude]}
      icon={
        new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png", // ✅ Only green icon needed
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: markerShadow,
          shadowSize: [41, 41],
        })
      }
    >
      <Popup>
        <strong>{student.name}</strong> <br />
        Coming to bus
      </Popup>
      <Tooltip permanent direction="top" offset={[0, -10]}>
        {student.name}
      </Tooltip>
    </Marker>
))}

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
