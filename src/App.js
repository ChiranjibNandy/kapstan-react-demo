import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import NavBar from "./components/NavBar";
import { Dashboard } from "./components/Dashboard";
import { Overview } from "./components/Overview";
import { EnvironmentVariables } from "./components/EnvironmentVariables";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route
          path="/environment-variables"
          element={<EnvironmentVariables />}
        />
      </Routes>
    </Router>
  );
}

export default App;
