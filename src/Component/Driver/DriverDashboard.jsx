import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import busLogo from "../../assets/LOGO/buslogo.png";
import default_photo from "../../assets/default_profile.jpg";
import config from "../../util/config";

// Leaflet icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import DriverHeader from "./DriverHeader";
import { toast } from "react-toastify";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const busicon = L.icon({
  iconUrl: busLogo,
  iconSize: [35, 23], // width: 40px, height: ~27px (scaled from 1357x901)
  iconAnchor: [20, 27], // center bottom of the icon
  popupAnchor: [0, -27], // show popup just above the icon    // position of popup relative to icon
});

export default function DriverDashboard() {
  const [driverStatus, setDriverStatus] = useState(false);
  const [driverLocation, setDriverLocation] = useState([20.2961, 85.8245]); // Default Bhubaneswar
  const [students, setStudents] = useState([]);
  const [driver, setDriver] = useState({});
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    const sendDriverLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newLat = pos.coords.latitude;
            const newLon = pos.coords.longitude;
            setDriverLocation([newLat, newLon]);

            axios
              .put(`${config.api}/bus/update-location/${username}`, {
                latitude: newLat,
                longitude: newLon,
              })
              .catch((err) => console.error("Failed to update location:", err));
          },
          (err) => console.warn("Location fetch error:", err),
          { enableHighAccuracy: true }
        );
      }
    };

    sendDriverLocation(); // Send immediately
    const interval = setInterval(sendDriverLocation, 2000);
    return () => clearInterval(interval);
  }, [username]);

  useEffect(() => {
    if (!username) return;

    axios
      .get(`${config.api}/driver/user/${username}`) // example endpoint
      .then((res) => {
        setDriver(res.data);
        setDriverStatus(res.data.bus.status);
      })
      .catch((err) => {
        console.error("Error fetching student:", err);
      });
  }, []);

  // Fetch students every 2 seconds
  useEffect(() => {
    const fetchStudents = () => {
      fetch(`${config.api}/student/by-driver/${username}`)
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Failed to fetch students:", err));
    };

    fetchStudents();
    const intervalId = setInterval(fetchStudents, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleComing = () => {
    axios
      .put(`${config.api}/driver/update-status/${username}`)
      .then((response) => {
        const bus = response.data;
        setDriverStatus(bus.status);
        toast.success("Status Updated!")
      })
      .catch((error) => {
        console.error("Error updating coming status:", error);
      });
  };

  const comingStudents = students.filter((s) => s.isComingToday);
  const notComingStudents = students.filter((s) => !s.isComingToday);

  return (
    <>
      <DriverHeader profilePhotoPath={driver.profile || default_photo}>
        {" "}
      </DriverHeader>
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
              onChange={toggleComing}
            />
            <label
              className="form-check-label small text-muted"
              htmlFor="driverStatusSwitch"
            >
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
            <div
              style={{ height: "500px", width: "100%" }}
              className="rounded overflow-hidden"
            >
              <MapContainer
                center={driverLocation}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Driver Marker */}
                <Marker position={driverLocation} icon={busicon}>
                  
                  <Tooltip permanent direction="top" offset={[0, -25]}>
                         You
                        </Tooltip>
                </Marker>

                {/* Student Markers */}
                {students
                  .filter((student) => student.isComingToday)
                  .map((student) => {
                    const profileUrl = student.profilePhotoPath
                      ? student.profilePhotoPath
                      : default_photo;

                    const customIcon = new L.Icon({
                      iconUrl: profileUrl,
                      iconSize: [30, 30], // Square for profile
                      iconAnchor: [20, 40],
                      popupAnchor: [0, -40],
                      className: "rounded-marker", // Optional CSS class
                    });

                    return (
                      <Marker
                        key={`${student.id}-${student.latitude}-${student.longitude}`}
                        position={[student.latitude, student.longitude]}
                        icon={customIcon}
                      >
                        <Popup>
                          <strong>{student.name}</strong> <br />
                          Coming to bus
                        </Popup>
                        <Tooltip permanent direction="top" offset={[0, -40]}>
                          @{student.username}
                        </Tooltip>
                      </Marker>
                    );
                  })}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
