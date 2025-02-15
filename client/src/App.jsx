import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import TaskDashboard from "./components/TaskDashboard"; // Import TaskDashboard

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignup = () => setShowLogin(true);
  const switchForm = () => setShowLogin(!showLogin);

  return (
    <div>
      {isLoggedIn ? (
        <TaskDashboard /> // Show TaskDashboard after login
      ) : showLogin ? (
        <Login onLogin={handleLogin} onSwitch={switchForm} />
      ) : (
        <Signup onSignup={handleSignup} onSwitch={switchForm} />
      )}
    </div>
  );
}

export default App;
