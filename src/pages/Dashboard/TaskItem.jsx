import { formatDistanceToNow } from "date-fns";
import PropTypes from 'prop-types';

const TaskItem = ({ task }) => {
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div className={`p-4 rounded-lg shadow ${isOverdue ? "bg-red-200" : "bg-white dark:bg-gray-700"}`}>
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
      <p className={`text-xs ${isOverdue ? "text-red-600" : "text-gray-500"}`}>
        Due: {formatDistanceToNow(dueDate)} {isOverdue ? "(Overdue!)" : ""}
      </p>
    </div>
  );
};
TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;
