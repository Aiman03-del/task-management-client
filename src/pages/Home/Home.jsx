import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
      <p className="mt-2 text-lg">Manage your tasks easily!</p>
      <Link to="/login" className="mt-4 px-4 py-2 bg-blue-500 rounded">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
