import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="text-2xl font-bold mb-4">Login to Task Manager</h2>
      <button onClick={handleLogin} className="px-4 py-2 bg-green-500 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
