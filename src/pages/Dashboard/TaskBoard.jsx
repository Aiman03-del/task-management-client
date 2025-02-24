import { DndContext, closestCorners } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import useTasks from "../../hooks/useTasks";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const TaskBoard = () => {
  const { tasks, updateTask } = useTasks();
  const [socket] = useState(() => io("http://localhost:5000"));

  useEffect(() => {
    socket.on("activityChange", (newActivity) => {
      console.log("New activity received:", newActivity);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTask = tasks.find((task) => task._id === active.id);
    if (!draggedTask || draggedTask.category === over.id) return;

    updateTask(active.id, { category: over.id });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {["To-Do", "In Progress", "Done"].map((category) => {
          const filteredTasks = tasks.filter((task) => task.category === category);
          return (
            <TaskColumn key={category} id={category} title={category} tasks={filteredTasks} />
          );
        })}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
