import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 flex flex-col items-center">
        {user?.photoURL && <img src={user.photoURL} alt="User" className="w-16 h-16 rounded-full mb-2" />}
        <h3 className="text-lg font-semibold">{user?.displayName}</h3>
        <p className="text-sm">{user?.email}</p>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/task-board">Task Board</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/add-task">Add Task</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/dashboard/activity-log">Activity Log</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={logout}>
          Log out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
