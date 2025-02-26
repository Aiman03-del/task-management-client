import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import PropTypes from 'prop-types';

const TaskColumn = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: category, // ক্যাটেগরি নামই Droppable ID
    data: { category }, // ড্রপ লোকেশনের ক্যাটেগরি সেট করছি
  });

  return (
    <div ref={setNodeRef} className="w-full md:w-1/3 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{category}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

TaskColumn.propTypes = {
  category: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskColumn;
