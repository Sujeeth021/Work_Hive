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

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const setDueDate = async (taskId, dueDate) => {
    const token = localStorage.getItem("token");
    const res = await axios.put("http://localhost:5000/tasks/due-date", { taskId, dueDate }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Task Dashboard</h1>

      {/* Ongoing Section at the Top */}
      <TaskSection 
        title="Ongoing" 
        tasks={tasks.ongoing} 
        color="blue" 
        onMove={(taskId, direction) => moveTask(taskId, "ongoing", direction)} 
        onAdd={() => addTask("ongoing")} 
        newTask={newTask} 
        setNewTask={setNewTask} 
        onSetDueDate={setDueDate} 
      />

      {/* Pending and Completed Sections Below, Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TaskSection 
          title="Pending" 
          tasks={tasks.pending} 
          color="yellow" 
          onMove={(taskId) => moveTask(taskId, "pending", "ongoing")} 
        />
        <TaskSection 
          title="Completed" 
          tasks={tasks.completed} 
          color="green" 
          onDelete={deleteTask} 
        />
      </div>
    </div>
  );
}

export default TaskDashboard;
