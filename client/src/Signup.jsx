import React, { useState } from "react";
import axios from "axios";

function Signup({ onSignup, onSwitch }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      setSuccess(res.data.message);
      setTimeout(() => onSignup(), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">Sign Up</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <button onClick={onSwitch} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
