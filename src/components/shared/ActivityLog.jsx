import { useEffect, useState } from "react";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/activities")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Activity Log</h2>
      <ul className="mt-2 space-y-2">
        {logs.map((log, index) => (
          <li key={index} className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
            {log.message} - <span className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
