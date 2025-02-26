import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTasks(task.userEmail);
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const handleEdit = async () => {
    if (isEditing) {
      setLoading(true);
      await updateTask(task._id, editedTitle, editedDescription);
      setLoading(false);
    }
    setIsEditing((prev) => !prev);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(task._id);
    setLoading(false);
  };

  useEffect(() => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  }, [task]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-lg shadow-md mb-4 cursor-grab relative"
    >
      <div {...attributes} {...listeners} className="absolute inset-0 cursor-grab" />

      {isEditing ? (
        <div className="relative z-10">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </div>
      ) : (
        <div className="relative z-10">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p>{task.description}</p>
        </div>
      )}

      <div className="flex justify-between mt-3 relative z-10">
        <button
          onClick={(e) => { e.stopPropagation(); handleEdit(); }}
          disabled={loading}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          <FaEdit /> {isEditing ? (loading ? "Saving..." : "Save") : "Edit"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDelete(); }}
          disabled={loading}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          <FaTrash /> {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    userEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
