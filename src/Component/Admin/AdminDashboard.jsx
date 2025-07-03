import React, { useEffect, useState } from "react";
import busLogo from "../../assets/LOGO/buslogo.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker paths
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

const routeHiTechToVaniVihar = [
  [20.302276, 85.865436],
  [20.295716, 85.858715],
  [20.295222, 85.858038],
  [20.294959, 85.857218],
  [20.295222, 85.853006],
];

export default function AdminDashboard() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://localhost:8081/bus/all")
        .then((res) => res.json())
        .then((data) => setBuses(data))
        .catch(console.error);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
  <div className="container mt-5 pt-4">
    <div className="mb-4">
      <h2>🚌 Faculty Dashboard</h2>
      <p className="text-muted">Monitor live bus & student locations</p>
    </div>

    <div className="row">
      {/* Left Column: Bus Lists */}
      <div className="col-lg-4 mb-4">
        {/* Active Buses */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-success text-white">🟢 Active Buses</div>
          <ul className="list-group list-group-flush">
            {buses.filter((bus) => bus.status === true).length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No active buses available.
              </li>
            ) : (
              buses
                .filter((bus) => bus.status === true)
                .map((bus) => (
                  <li
                    key={bus.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{bus.busNumber}</strong>
                      <br />
                      <small>{bus.routeName}</small>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>

        {/* Inactive Buses */}
        <div className="card shadow-sm">
          <div className="card-header bg-danger text-white">🔴 Inactive Buses</div>
          <ul className="list-group list-group-flush">
            {buses.filter((bus) => bus.status === false).length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No inactive buses available.
              </li>
            ) : (
              buses
                .filter((bus) => bus.status === false)
                .map((bus) => (
                  <li
                    key={bus.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{bus.busNumber}</strong>
                      <br />
                      <small>{bus.routeName}</small>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>

      {/* Right Column: Map */}
      <div className="col-lg-8 mb-4">
        <div className="card shadow-sm h-100">
          <div className="card-header bg-success text-white">🗺️ Live Map</div>
          <div className="card-body p-0" style={{ height: "600px" }}>
            <MapContainer
              center={[20.2961, 85.8245]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={routeHiTechToVaniVihar}
                color="red"
                weight={4}
              />
              {buses.map((bus) => (
                <Marker
                  key={`bus-${bus.id}-${bus.latitude}-${bus.longitude}`}
                  position={[bus.latitude, bus.longitude]}
                  icon={busicon}
                >
                  <Popup>
                    <strong>{bus.busNumber}</strong>
                    <br />
                    {bus.routeName}
                  </Popup>
                  <Tooltip>{bus.busNumber}</Tooltip>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
