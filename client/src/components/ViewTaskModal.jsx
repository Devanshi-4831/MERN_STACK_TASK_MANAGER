import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        setTask(res.data.task);
      } catch (error) {
        console.log(error.response?.data?.message || "Failed to fetch task");
      }
    };

    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal
      show={showViewModal}
      onHide={handleViewModalClose}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Stack>
          <p className="fw-bold mb-1">Title</p>
          <p className="text-dark" style={{ wordWrap: "break-word" }}>
            {task?.title}
          </p>
        </Stack>
        <Stack>
          <p className="fw-bold mb-1">Description</p>
          <p
            className="text-dark"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            {task?.description}
          </p>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTaskModal;
