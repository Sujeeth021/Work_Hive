import React from "react";

function TaskSection({ title, tasks, color, onMove }) {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-semibold mb-2">{title} Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 bg-${color}-200 rounded-lg mb-2 shadow-sm flex justify-between items-center`}
          >
            <span>{task.name}</span>
            {onMove && (
              <button
                onClick={() => onMove(task.id)}
                className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm"
              >
                Move
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSection;
