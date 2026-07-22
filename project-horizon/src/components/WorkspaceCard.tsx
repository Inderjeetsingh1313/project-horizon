import type { ReactNode } from "react";
import { memo } from "react";
import "./WorkspaceCard.css";
export interface WorkspaceCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

function WorkspaceCard({
  title,
  children,
  footer,
}: WorkspaceCardProps) {
  console.log(title + " Rendered");

  const getIcon = (title: string) => {
    switch (title) {
      case "Students":
        return "👨‍🎓";

      case "Projects":
        return "📁";

      case "Assignments":
        return "📝";

      case "Attendance":
        return "📊";

      default:
        return "📌";
    }
  };

  return (
    <div className="workspace-card">
      <div className="workspace-card-header">
        <h3>
          <span className="card-icon">
            {getIcon(title)}
          </span>

          {title}
        </h3>
      </div>

      <div className="workspace-card-body">
        {children}
      </div>

      {footer && (
        <div className="workspace-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default memo(WorkspaceCard);