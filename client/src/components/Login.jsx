import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mern-stack-task-manager-1-1qos.onrender.com/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "Login failed");
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-100">
        <h3 className="text-center login-title">LOGIN</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-black">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-black">Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"} // 👈 Toggle input type
            placeholder="Password"
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Check
            type="checkbox"
            label="Show Password"
            className="mt-2 show-password-checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/register"} className="register-link">
              REGISTER NOW
            </Link>
          </Form.Label>
        </Form.Group>

        <Button
          type="submit"
          className="w-100 text-light fw-bold fs-5 submit-btn"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
