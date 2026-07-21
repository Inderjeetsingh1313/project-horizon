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

export default memo(WorkspaceCard);