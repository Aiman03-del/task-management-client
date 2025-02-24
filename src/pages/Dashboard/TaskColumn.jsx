import { useDroppable } from "@dnd-kit/core";
import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const TaskColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 rounded-md min-h-[300px] ">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

TaskColumn.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TaskColumn;
