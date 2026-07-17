import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome to Project Horizon.</p>
        </header>

        <section className="cards">
          <div className="card">
            <h2>Overview</h2>
            <p>CSS Grid Layout (260px 1fr)</p>
          </div>

          <div className="card">
            <h2>Analytics</h2>
            <p>Responsive dashboard layout.</p>
          </div>

          <div className="card">
            <h2>Projects</h2>
            <p>FE-02.1 completed successfully.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;