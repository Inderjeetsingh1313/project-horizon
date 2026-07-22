import "./Sidebar.css";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Analytics",
    path: "/analytics",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Project Horizon</h2>

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
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default memo(Sidebar);