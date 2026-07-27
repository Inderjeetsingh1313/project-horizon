import { useEffect } from "react";
import "./ToastBanner.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { removeNotification } from "./store/slices/notificationSlice";
import type { Notification } from "./store/slices/notificationSlice";

const ICONS: Record<Notification["type"], string> = {
  success: "✅",
  error: "⛔",
  warning: "⚠️",
  info: "ℹ️",
};

function ToastItem({ notification }: { notification: Notification }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!notification.duration) return;

    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, dispatch]);

  return (
    <div className={`toast-banner toast-${notification.type}`} role="alert">
      <span className="toast-icon">{ICONS[notification.type]}</span>
      <span className="toast-message">{notification.message}</span>
      <button
        type="button"
        className="toast-close"
        aria-label="Dismiss notification"
        onClick={() => dispatch(removeNotification(notification.id))}
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Mounted once at the top of the app (see App.tsx). Any slice/component,
 * on any screen, can dispatch `addNotification(...)` and it will surface
 * here — this is what makes it a broadcast rather than a page-local alert.
 */
function ToastBanner() {
  const notifications = useAppSelector((state) => state.notifications.items);

  if (notifications.length === 0) return null;

  return (
    <div className="toast-stack">
      {notifications.map((n) => (
        <ToastItem key={n.id} notification={n} />
      ))}
    </div>
  );
}

export default ToastBanner;