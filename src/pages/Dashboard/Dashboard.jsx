import { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";
import TaskBoard from "./TaskBoard";
import AddTask from "./AddTask";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const result = await response.json();
    console.log(result)
    setTasks([...tasks, { ...newTask, _id: result.insertedId }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <AddTask addTask={addTask} />
      </div>

      <TaskBoard tasks={tasks} />

      <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg">
        <ActivityLog />
      </div>
    </div>
  );
};

export default Dashboard;
