import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../../config/firebase.config";

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
      setUserEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    const newTask = {
      title,
      description,
      category,
      userName,
      userEmail,
      timestamp: new Date().toISOString(),
    };

    addTask(newTask); 
    setTitle(""); setDescription(""); setCategory("To-Do");
  };

  return (
    <div className="p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full  p-2 rounded mb-2"
        />
        <textarea
          placeholder="Task Description"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full  p-2 rounded mb-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full  p-2 rounded mb-2 bg-black text-white">
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="text"
          value={userName}
          readOnly
          className="w-full  p-2 rounded mb-2 "
        />
        <input
          type="email"
          value={userEmail}
          readOnly
          className="w-full  p-2 rounded mb-2 "
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
