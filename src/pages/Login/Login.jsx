import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login to Task Manager</h2>
      <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
      <button onClick={handleLogin} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
