import "./App.css";
import Sidebar from "./components/Sidebar";
import Settings from "./components/Settings";

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
            <p>Dashboard Overview</p>
          </div>

          <div className="card">
            <h2>Analytics</h2>
            <p>Analytics Information</p>
          </div>

          <div className="card">
            <h2>Projects</h2>
            <p>Projects Information</p>
          </div>
        </section>
        
       <Settings />
      </main>
    </div>
  );
}

export default App;