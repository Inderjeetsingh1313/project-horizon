import { Link } from "react-router-dom";
import "./AccessDenied.css";

function AccessDenied() {
  return (
    <div className="access-container">
      <div className="access-card">
        <h1>⛔ Access Denied</h1>

        <p>
          You don't have permission to access this page.
        </p>

        <Link to="/">
          <button className="access-btn">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AccessDenied;