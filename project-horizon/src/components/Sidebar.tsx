import { useState } from "react";
import "./Sidebar.css";

const menuItems = [
  "Dashboard",
  "Analytics",
  "Projects",
  "Tasks",
  "Messages",
  "Settings",
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="sidebar">
      <h2 className="logo">Project Horizon</h2>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}