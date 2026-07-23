import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import WorkspaceCard from "./WorkspaceCard";
import { useAppSelector } from "./store/hooks";
import "./Dashboard.css";

interface DashboardCard {
  title: string;
  value: string;
  description: string;
}

function Dashboard() {
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

        <p>Welcome to Dashboard</p>

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
