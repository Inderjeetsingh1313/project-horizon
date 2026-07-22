import "./Sidebar.css";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: "📊",
  },
  {
    name: "Projects",
    path: "/projects",
    icon: "📁",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "⚙️",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">🚀 Project Horizon</h2>

        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <span className="nav-icon">{item.icon}</span>

                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <p>React Dashboard</p>
        <small>College Assignment</small>
      </div>
    </aside>
  );
}

export default memo(Sidebar);