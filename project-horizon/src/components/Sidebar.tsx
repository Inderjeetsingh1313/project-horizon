import "./Sidebar.css";
import { memo } from "react";
 export interface SidebarProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const menuItems = [
  "Dashboard",
  "Analytics",
  "Projects",
  "Settings",
];

function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2 className="logo">Project Horizon</h2>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default memo(Sidebar);