import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

function Analytics() {
  return (
    <>
      <h1>Analytics</h1>

      <div className="cards">
        <div className="card">
          <h3>Monthly Users</h3>
          <p>1,245 Active Users</p>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <p>₹85,000</p>
        </div>

        <div className="card">
          <h3>Growth</h3>
          <p>18% Increase</p>
        </div>
      </div>
    </>
  );
}

function Projects() {
  return (
    <>
      <h1>Projects</h1>

      <div className="cards">
        <div className="card">
          <h3>React Dashboard</h3>
          <p>Completed</p>
        </div>

        <div className="card">
          <h3>College ERP</h3>
          <p>In Progress</p>
        </div>

        <div className="card">
          <h3>Library System</h3>
          <p>Pending Review</p>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;