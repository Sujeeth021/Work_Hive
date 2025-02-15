import React, { useState, useEffect } from "react";

function TaskSection({ title, tasks, color, onMove, onAdd, newTask, setNewTask, onDelete, onSetDueDate }) {
  const [dueDates, setDueDates] = useState({}); 
  const [selectedDueDates, setSelectedDueDates] = useState({}); 

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const updatedDueDates = {};
      tasks.forEach(task => {
        if (task.dueDate) {
          const remainingTime = new Date(task.dueDate) - now;
          updatedDueDates[task.id] = remainingTime > 0 ? formatTime(remainingTime) : "Expired";
        }
      });
      setDueDates(updatedDueDates);
    };

    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [tasks]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className={`bg-${color}-100 p-5 rounded-lg shadow-lg border border-${color}-300`}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title} Tasks</h2>

      {/* Input Box for Adding Tasks */}
      {title === "Ongoing" && (
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />
          <button onClick={onAdd} className="bg-blue-700 text-white px-4 py-2 rounded-lg ml-2">
            Add
          </button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`p-3 bg-${color}-200 rounded-lg mb-2 shadow-md flex justify-between items-center`}>
            <div>
              <span className="font-medium">{task.name}</span>
              {task.dueDate && (
                <p className="text-sm text-gray-700 mt-1">Time Left: {dueDates[task.id]}</p>
              )}
            </div>

            {/* Buttons for Moving Tasks */}
            {title === "Pending" && (
              <button
                onClick={() => onMove(task.id, "ongoing")}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Move to Ongoing
              </button>
            )}

            {title === "Ongoing" && (
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => onMove(task.id, "completed")}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Move to Completed
                </button>
                <button
                  onClick={() => onMove(task.id, "pending")}
                  className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Move to Pending
                </button>

                {/* Due Date Picker */}
                <input
                  type="datetime-local"
                  value={selectedDueDates[task.id] || ""}
                  onChange={(e) => {
                    setSelectedDueDates({ ...selectedDueDates, [task.id]: e.target.value });
                  }}
                  className="border p-1 rounded"
                />
                <button
                  onClick={() => {
                    if (selectedDueDates[task.id]) {
                      onSetDueDate(task.id, selectedDueDates[task.id]);
                    }
                  }}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Set
                </button>
              </div>
            )}

            {title === "Completed" && (
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSection;
