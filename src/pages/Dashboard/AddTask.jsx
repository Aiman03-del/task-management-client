import { useState } from "react";
import { auth } from "../../config/firebase.config";
import { useTasks } from "../../hooks/useTasks";

const AddTask = () => {
  const user = auth.currentUser;
  const { addTask } = useTasks(user?.email);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 50) {
      alert("Title should not exceed 50 characters");
      return;
    }
    if (description.length > 200) {
      alert("Description should not exceed 200 characters");
      return;
    }
    const task = {
      title,
      description,
      category,
    };
    await addTask(task);
    setTitle('');
    setDescription('');
    setCategory('To-Do');
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Email:</label>
          <input type="email" value={user.email} readOnly className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Name:</label>
          <input type="text" value={user.displayName} readOnly className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="200"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-900 text-white shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline">
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
