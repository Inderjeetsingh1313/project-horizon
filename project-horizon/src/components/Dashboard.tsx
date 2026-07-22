import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import WorkspaceCard from "./WorkspaceCard";
import "./Dashboard.css";

interface DashboardCard {
  title: string;
  value: string;
  description: string;
}

const dashboardCards: DashboardCard[] = [
  {
    title: "Students",
    value: "120",
    description: "Registered Students",
  },
  {
    title: "Projects",
    value: "8",
    description: "Running Projects",
  },
  {
    title: "Assignments",
    value: "24",
    description: "Total Assignments",
  },
  {
    title: "Attendance",
    value: "92%",
    description: "Monthly Attendance",
  },
];

function Dashboard() {
  console.log("Dashboard Rendered");

  const [searchParams, setSearchParams] = useSearchParams();

  // Read query parameter on application load
  const rawSearch = searchParams.get("search") || "";

  // Validate URL parameter
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

  // Initialize component using validated URL parameter
  const search = validateSearch(rawSearch);

  // Update URL while typing
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({
        search: value,
      });
    }
  };

  // Filter dashboard cards
  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
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
            <WorkspaceCard
              key={card.title}
              title={card.title}
            >
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