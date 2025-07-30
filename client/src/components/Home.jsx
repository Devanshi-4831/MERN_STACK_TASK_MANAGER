import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete task");
      });
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col">
          <h1 className="text-c9184a">{taskTitle}</h1>
        </div>
        <div className="col text-end">
          <Button className="create-task-btn" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>
      <div className="row">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ marginBottom: "20px", minHeight: "400px" }}>
                <Card.Body className="d-flex justify-content-between flex-column">
  <Stack gap={2}>
    <div>
      {/* Title with a ref to measure width */}
      <Card.Title
        ref={(el) => {
          if (el) el.nextSibling.style.width = el.offsetWidth + "px";
        }}
        className="mb-1 text-dark"
        style={{ fontWeight: "bold" }}
      >
        {task && task.title.length <= 40
          ? task.title
          : task.title.slice(0, 40) + "..."}
      </Card.Title>
      {/* Horizontal line that adjusts to title width */}
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "4px 0",
        }}
      />
    </div>
    <Card.Text className="text-dark">
      {task && task.description.length <= 300
        ? task.description
        : task.description.slice(0, 300) + "..."}
    </Card.Text>
  </Stack>
                  <Stack
                    direction="horizontal"
                    className="justify-content-end"
                    gap={2}
                  >
                    <MdEdit
                      onClick={() => handleUpdateModalShow(task._id)}
                      className="fs-3 text-c9184a"
                    />
                    <MdDelete
                      onClick={() => deleteTask(task._id)}
                      className="fs-3 text-c9184a"
                    />
                    <FaEye
                      onClick={() => handleViewModalShow(task._id)}
                      className="fs-3 text-c9184a"
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h1 className="text-center text-c9184a">
            YOU DON'T HAVE ANY {taskTitle}
          </h1>
        )}
      </div>

      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
