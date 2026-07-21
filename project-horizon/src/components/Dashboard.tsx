import WorkspaceCard from "./WorkspaceCard";
import { memo } from "react";

function Dashboard() {
     console.log("Dashboard Rendered");
  return (
    <>
      <header className="page-header">
        <h1>Dashboard</h1>

        <p>
          Welcome to Dashboard
        </p>
      </header>

      <section className="cards">

        <WorkspaceCard title="Students">
          <h2>120</h2>
          <p>Registered Students</p>
        </WorkspaceCard>

        <WorkspaceCard title="Projects">
          <h2>8</h2>
          <p>Running Projects</p>
        </WorkspaceCard>

        <WorkspaceCard title="Assignments">
          <h2>24</h2>
          <p>Total Assignments</p>
        </WorkspaceCard>

        <WorkspaceCard title="Attendance">
          <h2>92%</h2>
          <p>Monthly Attendance</p>
        </WorkspaceCard>

      </section>
    </>
  );
}

export default memo(Dashboard);
