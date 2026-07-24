import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import WorkspaceCard from "./WorkspaceCard";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { incrementStudents,incrementProjects,incrementAssignments,updateAttendance,} from "./store/slices/dashboardSlice";
import "./Dashboard.css";
import { useEffect } from "react";
import api from "../api/axios";

interface DashboardCard {
  title: string;
  value: string;
  description: string;
}

function Dashboard() {
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("Axios Response:");
      console.table(response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  fetchUsers();
}, []);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const dashboardState = useAppSelector((state) => state.dashboard);
  const dashboardCards: DashboardCard[] = [
    {
      title: "Students",
      value: String(dashboardState.students),
      description: "Registered Students",
    },
    {
      title: "Projects",
      value: String(dashboardState.projects),
      description: "Running Projects",
    },
    {
      title: "Assignments",
      value: String(dashboardState.assignments),
      description: "Total Assignments",
    },
    {
      title: "Attendance",
      value: dashboardState.attendance,
      description: "Monthly Attendance",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const rawSearch = searchParams.get("search") || "";
  const validateSearch = (value: string): string => {
    const cleaned = value.trim();

    const scriptPattern =
      /<script|<\/script>|javascript:|onerror|onload|<img|iframe/i;

    if (scriptPattern.test(cleaned)) {
      return "";
    }

    if (cleaned.length > 30) {
      return "";
    }

    return cleaned;
  };

  const search = validateSearch(rawSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ search: value }, { replace: true });
    }
  };

  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <header className="page-header">
        <h1>Dashboard</h1>

         <div className="user-info">
  <h3>
    Welcome, {settings.fullName || "Guest"} 👋
  </h3>
</div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search dashboard..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </header>

      <section className="cards">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <WorkspaceCard key={card.title} title={card.title}>
              <h2>{card.value}</h2>
              <p>{card.description}</p>
              {card.title === "Students" && (
                <button
                  className="card-action"
                  onClick={() => dispatch(incrementStudents())}
                >
                  + Add Student
                </button>
              )}
              {card.title === "Projects" && (
                <button
                  className="card-action"
                  onClick={() => dispatch(incrementProjects())}
                >
                  + Add Project
                </button>
              )}
              {card.title === "Assignments" && (
                <button
                  className="card-action"
                  onClick={() => dispatch(incrementAssignments())}
                >
                  + Add Assignment
                </button>
              )}
              {card.title === "Attendance" && (
                <button
                  className="card-action"
                  onClick={() => dispatch(updateAttendance("93%"))}
                >
                  Update Attendance
                </button>
              )}
            </WorkspaceCard>
          ))
        ) : (
          <div className="no-results">
            <h3>No matching cards found.</h3>
          </div>
        )}
      </section>
    </>
  );
}

export default memo(Dashboard);
