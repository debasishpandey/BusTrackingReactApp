import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [currentPoints, setCurrentPoints] = useState([]);

  // Fetch all existing routes
  useEffect(() => {
    fetch("http://localhost:8081/routes")
      .then((res) => res.json())
      .then(setRoutes)
      .catch(console.error);
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setCurrentPoints([...currentPoints, { latitude: e.latlng.lat, longitude: e.latlng.lng }]);
      }
    });
    return null;
  };

  const saveRoute = () => {
    const routeData = {
      routeName,
      coordinatesJson: JSON.stringify(currentPoints)
    };

    fetch("http://localhost:8081/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeData)
    })
      .then((res) => res.json())
      .then((newRoute) => {
        setRoutes([...routes, newRoute]);
        setCurrentPoints([]);
        setRouteName("");
      })
      .catch(console.error);
  };

  
  
  const deleteRoute = (id) => {
    fetch(`http://localhost:8081/routes/${id}`, { method: "DELETE" })
      .then(() => setRoutes(routes.filter((r) => r.id !== id)))
      .catch(console.error);
  };

  const selectRoute = (route) => {
    setSelectedRouteId(route.id);
    setRouteName(route.routeName);
    setCurrentPoints(JSON.parse(route.coordinatesJson));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Route Manager</h3>

      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Route Name"
          value={routes}
        />
        <button className="btn btn-success me-2" onClick={saveRoute}>
          {selectedRouteId ? "Update Route" : "Create Route"}
        </button>
        <button className="btn btn-secondary" onClick={() => { setRouteName(""); setCurrentPoints([]); setSelectedRouteId(null); }}>
          Clear
        </button>
      </div>

      <div className="mb-4">
        <h5>Saved Routes</h5>
        <ul className="list-group">
          {/* {routes.map((r) => (
            <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
              {r.routeName}
              <div>
                <button className="btn btn-sm btn-info me-2" onClick={() => selectRoute(r)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteRoute(r.id)}>Delete</button>
              </div>
            </li>
          ))} */}
        </ul>
      </div>

      <MapContainer center={[20.2961, 85.8245]} zoom={14} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <Polyline positions={currentPoints.map(p => [p.latitude, p.longitude])} color="blue" />
        {currentPoints.map((p, i) => (
          <Marker
            key={i}
            position={[p.latitude, p.longitude]}
            icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [25, 41] })}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteManager;
