import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    await axios
      .post(
        "http://localhost:4000/api/v1/task/post",
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        setTitle("");
        setDescription("");
        handleCreateModalClose();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to create task");
      });
  };

  return (
    <Modal show={showCreateModal} onHide={handleCreateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-c9184a">Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
          <label className="fw-bold text-dark">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control custom-input"
          />
        </Stack>
        <br />
        <Stack gap={3}>
          <label className="fw-bold text-dark">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control custom-input"
          />
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateModalClose}>
          Close
        </Button>
        <Button className="create-task-btn" onClick={handleCreateTask}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
