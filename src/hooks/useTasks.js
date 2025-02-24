import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API_URL = "http://localhost:5000";
const socket = io(API_URL);

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach(task => console.log(`Task ID: ${task._id}, Category: ${task.category}`));
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskChange", () => {
      fetchTasks();
    });

    return () => {
      socket.off("taskChange");
    };
  }, []);

  const addTask = async (task) => {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks(); // Fetch updated tasks after adding a new task
  };

  const updateTask = async (id, updatedTask) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  };

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;
