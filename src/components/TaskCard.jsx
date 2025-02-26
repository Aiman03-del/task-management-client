import PropTypes from "prop-types";

const TaskCard = ({ task }) => {
  return (
    <div className="p-4 mb-2 border rounded shadow-md">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <span className="text-sm text-gray-500">{task.category}</span>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
