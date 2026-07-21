import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">

        {activePage === "Dashboard" && (
          <Dashboard />
        )}

        {activePage === "Analytics" && (
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
        )}

        {activePage === "Projects" && (
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
        )}

        {activePage === "Settings" && (
          <Settings />
        )}

      </main>
    </div>
  );
}

export default App;