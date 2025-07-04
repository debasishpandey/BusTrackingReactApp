// 🚀 Frontend: DriverProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import default_photo from "../../assets/default_profile.jpg";
import DriverHeader from "./DriverHeader";
import config from "../../util/config";

export default function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get(`${config.api}/driver/user/${username}`)
      .then((res) => {
        setDriver(res.data);
        setPreviewPhoto(res.data.profile);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1024 * 1024) {
      alert("Max photo size 1MB");
      return;
    }
    setSelectedPhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file) => {
    const renamedFile = new File([file], `${driver.id}_driver_profile`, {
      type: file.type,
    });

    const formData = new FormData();
    formData.append("file", renamedFile);
    formData.append("upload_preset", "BusTracking");

    const cloudName = "dgv2puxa1";
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return res.data.secure_url;
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = driver.profile;
      if (selectedPhoto) {
        imageUrl = await uploadToCloudinary(selectedPhoto);
      }

      const updatedDriver = {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        contact: driver.contact,
        username: driver.username,
        password: driver.password, // required
        profile: imageUrl,
           // optional
      };

      console.log(updatedDriver);
      
      const res = await axios.put(
        `${config.api}/driver/update`,
        updatedDriver
      );

      alert("Driver profile updated!");
      setDriver(res.data);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  if (!driver) return <div className="text-center p-4">Loading...</div>;

  return (
    <>
    <DriverHeader profilePhotoPath={driver.profile ||default_photo}>  </DriverHeader>
    <div className="container mt-5">
      <h3 className="mb-4">👨‍✈️ Driver Profile</h3>
      <div className="row">
        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
          <div
            className="border rounded-circle overflow-hidden mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          >
            <img
              src={previewPhoto || "https://via.placeholder.com/200"}
              alt="Driver"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
          <small className="text-muted mt-1">Max 1MB, 1:1 ratio preferred</small>
        </div>

        <div className="col-md-8">
          <div className="form-group mb-3">
            <label>ID</label>
            <input type="text" value={driver.id} className="form-control" disabled />
          </div>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={driver.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={driver.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Contact</label>
            <input
              name="contact"
              type="text"
              value={driver.contact}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-success" onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
