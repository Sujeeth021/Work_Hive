import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskSection from "./TaskSection";

function TaskDashboard() {
  const [tasks, setTasks] = useState({ pending: [], ongoing: [], completed: [] });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const moveTask = async (taskId, from, to) => {
    const token = localStorage.getItem("token");
    const res = await axios.put("http://localhost:5000/tasks/move", { taskId, from, to }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async (section) => {
    if (newTask.trim() === "") return;
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:5000/tasks", { section, name: newTask }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
    setNewTask("");
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskSection title="Pending" tasks={tasks.pending} color="yellow" onMove={(taskId) => moveTask(taskId, "pending", "ongoing")} />
        <TaskSection title="Ongoing" tasks={tasks.ongoing} color="blue" onMove={(taskId, direction) => moveTask(taskId, "ongoing", direction)} onAdd={() => addTask("ongoing")} newTask={newTask} setNewTask={setNewTask} />
        <TaskSection title="Completed" tasks={tasks.completed} color="green" />
      </div>
    </div>
  );
}

export default TaskDashboard;
