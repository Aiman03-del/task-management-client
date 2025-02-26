import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { useTasks } from "../../hooks/useTasks";
import { auth } from "../../config/firebase.config";

const TaskBoard = () => {
  const user = auth.currentUser;
  const { tasks, updateTaskCategory } = useTasks(user?.email);

  const categorizedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    "Done": tasks.filter((task) => task.category === "Done"),
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const newCategory = over.id;

    if (activeTask && activeTask.category !== newCategory) {
      updateTaskCategory(activeTask._id, newCategory);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap -mx-4">
        {Object.entries(categorizedTasks).map(([category, tasks]) => (
          <SortableContext key={category} items={tasks} strategy={verticalListSortingStrategy}>
            <TaskColumn category={category} tasks={tasks} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
