import axios from 'axios';
import React, { useState } from 'react';
import config from "../../util/config";
import { toast } from 'react-toastify';

const BusRegister = () => {
  const [busNumber, setBusNumber] = useState('');
 
  const [status, setStatus] = useState(false);

  const [routeName,setRouteName]=useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.api}/bus/register`,{
      busNumber,
      routeName,
      status
    });
      toast.success("Bus Registered.")
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register bus.");
    }
  };


  return (
    <div className="container mt-4">
      <h3>Register New Bus</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Bus Number</label>
          <input
            type="text"
            className="form-control"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Route Name</label>
          <input
            type="text"
            className="form-control"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Driver (optional)</label>
          <select
            className="form-select"
            // value={driverId}
            // onChange={handleChange}
          >
            {/* <option value="">-- Select Driver --</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} ({driver.licenseNumber})
              </option>
            ))} */}
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            id="busStatus"
          />
          <label className="form-check-label" htmlFor="busStatus">
            Bus is Active
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Register Bus
        </button>
      </form>
    </div>
  );
};

export default BusRegister;
