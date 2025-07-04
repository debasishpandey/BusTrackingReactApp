import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import busLogo from "../../assets/LOGO/buslogo.png";
import StudentHeader from "./StudentHeader";
import AdminFooter from "../Admin/AdminFooter";
import config from "../../util/config";

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const busicon = L.icon({
  iconUrl: busLogo,
  iconSize: [35, 23],
  iconAnchor: [20, 27],
  popupAnchor: [0, -27],
});

function Recenter({ location }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 15);
  }, [location]);
  return null;
}

function StudentDashboard() {
  const [isComing, setIsComing] = useState(false);
  const [location, setLocation] = useState([20.302109, 85.865193]);
  const [buses, setBuses] = useState([]);
  const [student, setStudent] = useState({});
  const username = localStorage.getItem("username");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${config.api}/bus/all`)
        .then((res) => res.json())
        .then((data) => setBuses(data))
        .catch(console.error);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`${config.api}/student/user/${username}`)
      .then((res) => {
        setStudent(res.data);
        setIsComing(res.data.isComingToday);
      })
      .catch(console.error);
  }, []);

  const toggleComing = () => {
    axios
      .put(
        `${config.api}/student/update-status/${student.registrationNo}`
      )
      .then((res) => {
        setIsComing(res.data.isComingToday);
        setStudent(res.data);
      })
      .catch(console.error);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation([coords.latitude, coords.longitude]),
      (err) => alert("Unable to fetch location.")
    );
  };

  return (
    <>
      

      <Container className="mt-4">
        <h4 className="mb-3">Welcome, {student.name}</h4>
        <div className="d-flex gap-3 mb-3">
          <Button variant="info" onClick={getCurrentLocation}>
            📍 Find Me
          </Button>
          <Button
            variant={isComing ? "success" : "danger"}
            onClick={toggleComing}
          >
            {isComing ? "Coming Today" : "Not Coming"}
          </Button>
        </div>

        <MapContainer
          center={location}
          zoom={15}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={location}>
            <Tooltip permanent direction="top" offset={[0, -10]}>
              You
            </Tooltip>
            <Popup>Your Pickup Point</Popup>
          </Marker>

          <Recenter location={location} />

          {buses
            .filter((bus) => bus.status === true)
            .map((bus) => (
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
      </Container>

      <AdminFooter />
    </>
  );
}

export default StudentDashboard;
