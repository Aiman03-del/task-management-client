import ActivityLog from "./ActivityLog";
import TaskBoard from "./TaskBoard";
import AddTask from "./AddTask";

const Dashboard = () => {

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <AddTask  />
      </div>

      <TaskBoard />

      <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-md">
        <ActivityLog />
      </div>
    </div>
  );
};

export default Dashboard;
