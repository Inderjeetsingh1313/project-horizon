import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔒 Login Required</h1>

        <p>
          Your session has expired or you are not authorized.
        </p>

        <Link to="/">
          <button className="login-btn">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;