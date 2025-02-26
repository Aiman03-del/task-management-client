import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";

const AuthLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
