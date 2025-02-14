import React, { useState } from "react";
import TaskSection from "./TaskSection";

function TaskDashboard() {
  // Task Data (Initially Hardcoded)
  const [tasks, setTasks] = useState({
    pending: [
      { id: 1, name: "Task 1", time: "1:00:00" },
      { id: 2, name: "Task 2", time: "0:30:00" },
    ],
    ongoing: [{ id: 3, name: "Task 3", time: "2:00:00" }],
    completed: [],
  });

  // Function to Move Tasks Between Sections
  const moveTask = (taskId, from, to) => {
    const taskToMove = tasks[from].find((task) => task.id === taskId);
    setTasks({
      ...tasks,
      [from]: tasks[from].filter((task) => task.id !== taskId),
      [to]: [...tasks[to], taskToMove],
    });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Section */}
        <TaskSection
          title="Pending"
          tasks={tasks.pending}
          color="yellow"
          onMove={(taskId) => moveTask(taskId, "pending", "ongoing")}
        />

        {/* Ongoing Section */}
        <TaskSection
          title="Ongoing"
          tasks={tasks.ongoing}
          color="blue"
          onMove={(taskId) => moveTask(taskId, "ongoing", "completed")}
        />

        {/* Completed Section */}
        <TaskSection title="Completed" tasks={tasks.completed} color="green" />
      </div>
    </div>
  );
}

export default TaskDashboard;
