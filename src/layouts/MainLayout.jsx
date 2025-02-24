
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
    {/* Navbar */}
    <Navbar />

    {/* Main Content */}
    <div className="flex-1 pt-24">
      <Outlet />
    </div>

    {/* Footer */}
    <Footer />
  </div>
  );
};

export default MainLayout;
