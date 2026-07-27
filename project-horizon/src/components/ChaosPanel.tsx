import { useEffect, useState } from "react";
import "./ChaosPanel.css";
import {
  getChaosConfig,
  getChaosLog,
  setChaosMode,
  subscribeToChaos,
} from "../components/utils/chaosMonkey";
import type { ChaosMode, ChaosEvent } from "../components/utils/chaosMonkey";
import api from "../api/axios";

const MODES: { value: ChaosMode; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "network", label: "Network dropout" },
  { value: "401", label: "401 Unauthorized" },
  { value: "403", label: "403 Forbidden" },
  { value: "500", label: "500 Server error" },
  { value: "random", label: "Random" },
];

/**
 * FE-13.4 — Crash Simulation & Verification
 *
 * Dev-only panel (never rendered in production) that arms the chaos
 * monkey and gives QA a one-click way to fire a request and watch the
 * real fallback path (toast + redirect + error states) handle it —
 * without needing to actually kill a server or unplug the network.
 */
function ChaosPanel() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChaosMode>(getChaosConfig().mode);
  const [log, setLog] = useState<ChaosEvent[]>(getChaosLog());
  const [firing, setFiring] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToChaos((config) => setMode(config.mode));
    return () => {
      unsubscribe();
    };
  }, []);

  const handleModeChange = (next: ChaosMode) => {
    setChaosMode(next);
  };

  const fireTestRequest = async () => {
    setFiring(true);
    try {
      await api.get("/users");
    } catch {
      // Expected when chaos is armed — the interceptor already handled
      // the toast/redirect. We just refresh the log for visibility.
    } finally {
      setLog([...getChaosLog()]);
      setFiring(false);
    }
  };

  return (
    <div className={`chaos-panel ${open ? "open" : "collapsed"}`}>
      <button
        type="button"
        className="chaos-toggle"
        onClick={() => setOpen((o) => !o)}
      >
        🧪 {open ? "Close Chaos Panel" : "Chaos Panel"}
      </button>

      {open && (
        <div className="chaos-body">
          <p className="chaos-hint">
            Dev-only. Arm a failure mode, then fire a request and confirm
            the fallback UI (toast, redirect, error state) recovers
            cleanly with no stuck loading or corrupted state.
          </p>

          <div className="chaos-modes">
            {MODES.map((m) => (
              <label key={m.value} className="chaos-mode-option">
                <input
                  type="radio"
                  name="chaos-mode"
                  checked={mode === m.value}
                  onChange={() => handleModeChange(m.value)}
                />
                {m.label}
              </label>
            ))}
          </div>

          <button
            type="button"
            className="chaos-fire"
            disabled={mode === "off" || firing}
            onClick={fireTestRequest}
          >
            {firing ? "Firing..." : "Fire test request"}
          </button>

          <div className="chaos-log">
            <h4>Recent simulated failures</h4>
            {log.length === 0 ? (
              <p className="chaos-log-empty">None yet.</p>
            ) : (
              <ul>
                {log.map((entry) => (
                  <li key={entry.id}>
                    <span className="chaos-log-time">{entry.time}</span>
                    <span className="chaos-log-type">{entry.injected}</span>
                    <span className="chaos-log-url">{entry.url}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChaosPanel;