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
import { toast } from "react-toastify";
import busLogo from "../../assets/LOGO/buslogo.png";
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

export default function StudentDashboard() {
  const [isComing, setIsComing] = useState(false);
  const [location, setLocation] = useState([20.302109, 85.865193]);
  const [buses, setBuses] = useState([]);
  const [student, setStudent] = useState({});
  const username = localStorage.getItem("username");

  // fetch buses every 2s
  useEffect(() => {
    const id = setInterval(() => {
      axios
        .get(`${config.api}/bus/all`)
        .then((res) => setBuses(res.data))
        .catch(console.error);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // fetch student once
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

  // update “coming” status
  const toggleComing = () => {
    axios
      .put(`${config.api}/student/update-status/${student.registrationNo}`)
      .then((res) => {
        setIsComing(res.data.isComingToday);
        setStudent(res.data);
        toast.success("Status Updated!");
      })
      .catch(console.error);
  };

  // get your current GPS
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation([coords.latitude, coords.longitude]),
      () => toast.error("Unable to fetch location")
    );
  };

  // find first active bus
  const findBus = () => {
    const active = buses.find((b) => b.status === true);
    if (!active) {
      return toast.warn("No active bus available");
    }
    setLocation([active.latitude, active.longitude]);
    toast.info(`Centered on bus ${active.busNumber}`);
  };

  // auto‐update student location every 2s
  useEffect(() => {
    if (!username) return;
    const send = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const lat = coords.latitude,
            lon = coords.longitude;
          setLocation([lat, lon]);
          axios.put(`${config.api}/student/update-location/${username}`, {
            latitude: lat,
            longitude: lon,
          });
        },
        console.error,
        { enableHighAccuracy: true }
      );
    };
    send();
    const id = setInterval(send, 2000);
    return () => clearInterval(id);
  }, [username]);

  return (
    <Container className="mt-4">
      <h4 className="mb-3">Welcome, {student.name}</h4>
      <div className="d-flex gap-3 mb-3">
        <Button variant="info" onClick={getCurrentLocation}>
          📍 Find Me
        </Button>
        <Button variant="primary" onClick={findBus}>
          🚌 Find Bus
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

        {/* You */}
        <Marker position={location}>
          <Tooltip permanent direction="top" offset={[0, -10]}>
            You
          </Tooltip>
          <Popup>Your Pickup Point</Popup>
        </Marker>

        <Recenter location={location} />

        {/* All active buses */}
        {buses
          .filter((b) => b.status === true)
          .map((b) => (
            <Marker
              key={b.id}
              position={[b.latitude, b.longitude]}
              icon={busicon}
            >
              <Popup>
                <strong>{b.busNumber}</strong>
                <br />
                {b.routeName}
              </Popup>
              <Tooltip>{b.busNumber}</Tooltip>
            </Marker>
          ))}
      </MapContainer>
    </Container>
  );
}
