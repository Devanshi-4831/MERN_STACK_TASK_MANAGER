import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Header({
  setTasks,
  setIsAuthenticated,
  isAuthenticated,
  setTaskTitle,
}) {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (isAuthenticated) fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      default:
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
    }
    setTasks(filteredTasks);
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${!isAuthenticated ? "d-none" : ""}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          TASK MANAGER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-4">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item onClick={() => filterTasks("all")}>
                All Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>
                Completed Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Link to="/profile" className="text-white text-decoration-none">
              Profile
            </Link>
            <Button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
