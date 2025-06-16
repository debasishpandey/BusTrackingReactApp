// src/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 🔄 Helper to recenter the map when location updates
function Recenter({ location }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 15);
  }, [location]);
  return null;
}

function StudentDashboard() {
  const [isComing, setIsComing] = useState(true);
  const [location, setLocation] = useState([20.302109, 85.865193]); // Default Bhubaneswar
  const [buses, setBuses] = useState([]);

  const toggleComing = () => {
    setIsComing(!isComing);
    // TODO: Send isComing to backend with student info
  };

  // 📍 Fetch current student location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation([latitude, longitude]);
      },
      (err) => {
        alert("Unable to fetch location.");
        console.error(err);
      }
    );
  };

  // 🚍 Fetch active bus data on mount
  useEffect(() => {
    fetch("http://localhost:8081/bus")
      .then((response) => response.json())
      .then((data) => setBuses(data))
      .catch((error) => console.error("Error fetching buses:", error));
  }, []);

  return (
    <>
      {/* 🧭 Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Student Dashboard</Navbar.Brand>
          <Nav className="ms-auto d-flex gap-2">
            <Button variant="info" onClick={getCurrentLocation}>📍 Find Me</Button>
            <Button
              variant={isComing ? 'success' : 'danger'}
              onClick={toggleComing}
            >
              {isComing ? 'Coming Today' : 'Not Coming'}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* 🗺️ Map & Details */}
      <Container className="mt-4">
        <h4 className="mb-3">Welcome, Pandey</h4>
        <p>Your pickup location is shown on the map below.</p>

        <MapContainer
          center={location}
          zoom={15}
          style={{ height: '70vh', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* 🚶 Student Marker */}
          <Marker position={location}>
            <Tooltip permanent direction="top" offset={[0, -10]}>
              You
            </Tooltip>
            <Popup>Your Pickup Point</Popup>
          </Marker>

          {/* 🔄 Recenter map if location updates */}
          <Recenter location={location} />

          {/* 🚌 Bus Markers */}
          {buses.map((bus) => (
            <Marker key={bus.id} position={[bus.latitude, bus.longitude]}>
              <Popup>
                <strong>{bus.busNumber}</strong><br />
                Route: {bus.routeName}
              </Popup>
              <Tooltip permanent direction="top" offset={[0, -10]}>
                {bus.busNumber}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Container>
    </>
  );
}

export default StudentDashboard;
