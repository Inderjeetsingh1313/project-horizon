import "./ToastBanner.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  removeNotification,
} from "./store/slices/notificationSlice";
import type {
  Notification,
} from "./store/slices/notificationSlice";
import useTimer from "./hooks/useTimer";

const ICONS: Record<Notification["type"], string> = {
  success: "✅",
  error: "⛔",
  warning: "⚠️",
  info: "ℹ️",
};

function ToastItem({
  notification,
}: {
  notification: Notification;
}) {
  const dispatch = useAppDispatch();

  useTimer(
    () => {
      dispatch(removeNotification(notification.id));
    },
    notification.duration ?? 3000,
    Boolean(notification.duration),
  );

  return (
    <div
      className={`toast-banner toast-${notification.type}`}
      role="alert"
    >
      <span className="toast-icon">
        {ICONS[notification.type]}
      </span>

      <span className="toast-message">
        {notification.message}
      </span>

      <button
        type="button"
        className="toast-close"
        aria-label="Dismiss notification"
        onClick={() =>
          dispatch(removeNotification(notification.id))
        }
      >
        ✕
      </button>
    </div>
  );
}

function ToastBanner() {
  const notifications = useAppSelector(
    (state) => state.notifications.items,
  );

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-stack">
      {notifications.map((notification) => (
        <ToastItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}

export default ToastBanner;