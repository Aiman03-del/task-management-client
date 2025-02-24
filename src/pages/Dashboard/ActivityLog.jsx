import { useEffect, useState } from "react";
import io from "socket.io-client";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [socket] = useState(() => io("http://localhost:5000"));
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/activities")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched activities:", data);
        setLogs(data);
      });

    socket.on("activityChange", (newActivity) => {
      console.log("New activity received:", newActivity);
      setLogs((prevLogs) => [newActivity, ...prevLogs]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortedLogs = [...logs].sort((a, b) => {
    return isAscending
      ? new Date(a.timestamp) - new Date(b.timestamp)
      : new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">
        Activity Log ({logs.length})
      </h2>
      <button onClick={toggleOrder} className="mb-3 px-4 py-2 bg-blue-500 text-white rounded">
        {isAscending ? "Show Newest First" : "Show Oldest First"}
      </button>
      <ul className="mt-2 space-y-2">
        {sortedLogs.map((log, index) => (
          <li key={index} className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
            {log.message} - <span className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
