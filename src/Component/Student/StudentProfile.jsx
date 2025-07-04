import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get(`${config.api}/student/user/${username}`)
      .then((res) => {
        setStudent(res.data);
        setPreviewPhoto(res.data.profilePhotoPath);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1024 * 1024) {
      alert("File size should be under 1MB");
      return;
    }
    setSelectedPhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const renamedFile = new File([file], `${student.registrationNo}_profile`, {
      type: file.type,
    });

    formData.append("file", renamedFile);
    formData.append("upload_preset", "BusTracking"); // ❗ Set in Cloudinary

    const cloudName = "dgv2puxa1"; // ❗ Replace with your Cloudinary cloud name

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return res.data.secure_url;
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = student.profilePhotoPath;

      if (selectedPhoto) {
        imageUrl = await uploadToCloudinary(selectedPhoto);
      }

      const updatedData = {
        ...student,
        profilePhotoPath: imageUrl,
      };

      const res = await axios.put(
        `${config.api}/student/update`,
        updatedData
      );

      alert("Profile updated successfully!");
      setStudent(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (!student) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">👤 Student Profile</h3>
      <div className="row">
        <div className="col-md-4 mb-4 d-flex flex-column align-items-center">
          <div
            className="border rounded-circle overflow-hidden mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          >
            <img
              src={previewPhoto || "https://via.placeholder.com/200"}
              alt="Profile"
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
          <small className="text-muted mt-1">Max size: 1MB (1:1 ratio)</small>
        </div>

        <div className="col-md-8">
          <div className="form-group mb-3">
            <label>Registration No</label>
            <input
              type="text"
              className="form-control"
              value={student.registrationNo}
              disabled
            />
          </div>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"

              value={student.name}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group mb-4">
            <label>Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={student.pickupLocation}
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
  );
}
