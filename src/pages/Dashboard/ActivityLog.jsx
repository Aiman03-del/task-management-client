import { useEffect, useState } from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import io from "socket.io-client";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [socket] = useState(() => io("http://localhost:5000"));
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/activities")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
      });

    socket.on("activityChange", (change) => {
      if (change.operationType === "insert") {
        setLogs((prevLogs) => [change.fullDocument, ...prevLogs]);
      } else if (change.operationType === "delete") {
        setLogs((prevLogs) => prevLogs.filter((log) => log._id !== change.documentKey._id));
      } else if (change.operationType === "deleteAll") {
        setLogs([]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/activities/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLogs((prevLogs) => prevLogs.filter((log) => log._id !== id));
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const deleteAllActivities = async () => {
    try {
      const response = await fetch("http://localhost:5000/activities", {
        method: "DELETE",
      });
      if (response.ok) {
        setLogs([]);
      } else {
        console.error("Failed to delete all activities");
      }
    } catch (error) {
      console.error("Error deleting all activities:", error);
    }
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
      <button onClick={deleteAllActivities} className="mb-3 ml-3 px-4 py-2 bg-red-500 text-white rounded">
        Delete All Activities
      </button>
      <ul className="mt-2 space-y-2">
        {sortedLogs.map((log) => (
          <li key={log._id} className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-between items-center">
            <span>
              {log.message} - <span className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
            </span>
            <button
              onClick={() => deleteActivity(log._id)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
            >
              <FcDeleteDatabase/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
