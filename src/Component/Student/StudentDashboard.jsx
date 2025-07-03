// src/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import busLogo from "../../assets/LOGO/buslogo.png";
import axios from 'axios';
import AdminFooter from '../Admin/AdminFooter';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const busicon = L.icon({
  iconUrl: busLogo,
 iconSize: [35, 23],       // width: 40px, height: ~27px (scaled from 1357x901)
  iconAnchor: [20, 27],     // center bottom of the icon
  popupAnchor: [0, -27],    // show popup just above the icon    // position of popup relative to icon
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
  const [isComing, setIsComing] = useState(false);
  const [location, setLocation] = useState([20.302109, 85.865193]); // Default Bhubaneswar
  const [buses, setBuses] = useState([]);
  const [student,setStudent]=useState({});
  const username = localStorage.getItem("username");

  console.log(username);

   // 🚍 Fetch active bus data on mount
  useEffect(() => {
    
    fetch(`http://localhost:8081/bus/all`)
      .then((response) => response.json())
      .then((data) => setBuses(data))
      .catch((error) => console.error("Error fetching buses:", error));
  }, []);


useEffect(() => {
  const username = localStorage.getItem("username");
  if (!username) return;

  axios
    .get(`http://localhost:8081/student/${username}`) // example endpoint
    .then((res) => {
      setStudent(res.data);
      setIsComing(res.data.isComingToday);
    })
    .catch((err) => {
      console.error("Error fetching student:", err);
    });
}, []);
  

  const toggleComing = () => {
  axios
    .put(`http://localhost:8081/student/update-status/${student.registrationNo}`)
    .then((response) => {
      const updatedStudent = response.data;
      setIsComing(updatedStudent.isComingToday); 
      setStudent(updatedStudent); 
    })
    .catch((error) => {
      console.error("Error updating coming status:", error);
    });
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

 

  return (
    <>
      {/* 🧭 Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Student Dashboard</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-3">
  <Button variant="info" onClick={getCurrentLocation}>📍 Find Me</Button>
  <Button
    variant={isComing ? 'success' : 'danger'}
    onClick={toggleComing}
  >
    {isComing ? 'Coming Today' : 'Not Coming'}
  </Button>

  {/* 👤 Profile Picture & Dropdown */}
  <div className="dropdown">
    <img
      src={student.profilePhotoPath || "https://via.placeholder.com/40"}
      alt="Profile"
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
        <a className="dropdown-item" href="/student-profile">Profile</a>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => {
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
            <Marker key={bus.id} position={[bus.latitude, bus.longitude]} icon={busicon}>
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
