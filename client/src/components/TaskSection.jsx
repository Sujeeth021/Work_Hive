import React from "react";

function TaskSection({ title, tasks, color, onMove, onAdd, newTask, setNewTask }) {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-semibold mb-2">{title} Tasks</h2>

      {/* Show Add Task Input & Button Only for Ongoing Section */}
      {title === "Ongoing" && (
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />
          <button onClick={onAdd} className="bg-gray-800 text-white px-3 py-2 rounded-lg ml-2">
            Add Task
          </button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 bg-${color}-200 rounded-lg mb-2 shadow-sm flex justify-between items-center`}
          >
            <span>{task.name}</span>
            {title === "Pending" && (
              <button
                onClick={() => onMove(task.id, "ongoing")}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Move to Ongoing
              </button>
            )}
            {title === "Ongoing" && (
              <div className="flex space-x-2">
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSection;
