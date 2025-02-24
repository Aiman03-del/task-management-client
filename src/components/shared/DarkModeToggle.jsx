import { useTheme } from "../context/ThemeProvider";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
