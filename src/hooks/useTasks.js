import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const useTasks = (userEmail) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();

    const newSocket = io("http://localhost:5000");
    newSocket.on("taskChange", () => {
      fetchTasks();
    });
    return () => {
      newSocket.disconnect();
    };
  }, [userEmail]);

  const addTask = async (task) => {
    if (!userEmail) return;

    try {
      const response = await axios.post("http://localhost:5000/tasks", { ...task, userEmail }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, title, description) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) return;

      await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        { title, description, category: taskToUpdate.category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, title, description } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      if (!taskId) return;

      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) return;

      await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        { title: taskToUpdate.title, description: taskToUpdate.description, category: newCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, category: newCategory } : task
        )
      );
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  return { tasks, addTask, updateTask, deleteTask, updateTaskCategory };
};

export { useTasks };
