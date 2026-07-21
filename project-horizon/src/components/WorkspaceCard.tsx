import type { ReactNode } from "react";
import "./WorkspaceCard.css";

interface WorkspaceCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

function WorkspaceCard({
  title,
  children,
  footer,
}: WorkspaceCardProps) {
  return (
    <div className="workspace-card">
      <div className="workspace-card-header">
        <h3>{title}</h3>
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

export default WorkspaceCard;