
import TaskBoard from "./TaskBoard";
import Sidebar from "../../components/shared/Sidebar";

const Dashboard = () => {

  return (
    <div className="p-4">
        <div className="flex flex-1 pt-24">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
        <TaskBoard />
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
