import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
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
        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <>
            <header className="page-header">
              <h1>Dashboard</h1>
              <p>Welcome to Project Horizon Dashboard.</p>
            </header>

            <section className="cards">
              <div className="card">
                <h3>Total Students</h3>
                <div className="card-value">120</div>
                <p>Registered Students</p>
              </div>

              <div className="card">
                <h3>Courses</h3>
                <div className="card-value">8</div>
                <p>Available Courses</p>
              </div>

              <div className="card">
                <h3>Assignments</h3>
                <div className="card-value">15</div>
                <p>Pending Assignments</p>
              </div>

              <div className="card">
                <h3>Attendance</h3>
                <div className="card-value">92%</div>
                <p>Average Attendance</p>
              </div>
            </section>
          </>
        )}

        {/* Analytics */}
        {activePage === "Analytics" && (
          <>
            <header className="page-header">
              <h1>Analytics</h1>
              <p>Performance overview of the system.</p>
            </header>

            <section className="cards">
              <div className="card">
                <h3>Users</h3>
                <div className="card-value">1,250</div>
                <p>Total Active Users</p>
              </div>

              <div className="card">
                <h3>Revenue</h3>
                <div className="card-value">$12K</div>
                <p>This Month</p>
              </div>

              <div className="card">
                <h3>Growth</h3>
                <div className="card-value">18%</div>
                <p>Compared to last month</p>
              </div>
            </section>
          </>
        )}

        {/* Projects */}
        {activePage === "Projects" && (
          <>
            <header className="page-header">
              <h1>Projects</h1>
              <p>Manage your current projects.</p>
            </header>

            <section className="cards">
              <div className="card">
                <h3>Project Horizon</h3>
                <p>Status: In Progress</p>
              </div>

              <div className="card">
                <h3>React Dashboard</h3>
                <p>Status: Completed</p>
              </div>

              <div className="card">
                <h3>Employee Portal</h3>
                <p>Status: Planning</p>
              </div>
            </section>
          </>
        )}

        {/* Settings */}
        {activePage === "Settings" && (
          <>
            <header className="page-header">
              <h1>Settings</h1>
              <p>Update your application preferences.</p>
            </header>

            <Settings />
          </>
        )}
      </main>
    </div>
  );
}

export default App;