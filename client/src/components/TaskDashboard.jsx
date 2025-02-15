import React, { useState } from "react";
import TaskSection from "./TaskSection";

function TaskDashboard() {
  const [tasks, setTasks] = useState({
    pending: [
      
    ],
    ongoing: [],
    completed: [],
  });

  const [newTask, setNewTask] = useState("");

  const moveTask = (taskId, from, to) => {
    const taskToMove = tasks[from].find((task) => task.id === taskId);
    setTasks({
      ...tasks,
      [from]: tasks[from].filter((task) => task.id !== taskId),
      [to]: [...tasks[to], taskToMove],
    });
  };

  const addTask = (section) => {
    if (newTask.trim() === "") return;
    const newTaskObj = { id: Date.now(), name: newTask, time: "0:00:00" };
    setTasks({ ...tasks, [section]: [...tasks[section], newTaskObj] });
    setNewTask("");
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskSection
          title="Pending"
          tasks={tasks.pending}
          color="yellow"
          onMove={(taskId) => moveTask(taskId, "pending", "ongoing")}
        />
        <TaskSection
          title="Ongoing"
          tasks={tasks.ongoing}
          color="blue"
          onMove={(taskId, direction) =>
            moveTask(taskId, "ongoing", direction)
          }
          onAdd={() => addTask("ongoing")}
          newTask={newTask}
          setNewTask={setNewTask}
        />
        <TaskSection
          title="Completed"
          tasks={tasks.completed}
          color="green"
        />
      </div>
    </div>
  );
}

export default TaskDashboard;
