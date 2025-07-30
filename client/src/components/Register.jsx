import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate phone number manually before submission
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAvatar("");
      setIsAuthenticated(true);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Axios error:", error);
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated && !loading) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleRegister} className="w-100">
        <h3 className="text-center login-title">REGISTER</h3>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="text-black">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            className="custom-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-black">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            className="custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="text-black">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Your 10-digit Phone Number"
            className="custom-input"
            value={phone}
            onChange={(e) => {
              // Only allow digits and up to 10 characters
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) setPhone(value);
            }}
            maxLength={10}
            pattern="\d{10}"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-black">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label className="text-black">Avatar</Form.Label>
          <Form.Control
            type="file"
            onChange={avatarHandler}
            className="custom-input"
            required
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label>
            Already Registered?{" "}
            <Link to={"/login"} className="register-link">
              LOGIN
            </Link>
          </Form.Label>
        </Form.Group>

        <Button
          type="submit"
          disabled={loading}
          className="w-100 text-light fw-bold fs-5 submit-btn"
        >
          {loading ? "Registering..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
