import axios from "axios";
import { navigateTo } from "../components/utils/navigation";
import { store } from "../components/store/store";
import { addNotification } from "../components/store/slices/notificationSlice";
import { maybeInjectFailure } from "../components/utils/chaosMonkey";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const broadcast = (type: "error" | "warning" | "info", message: string) => {
  const alreadyShown = store
    .getState()
    .notifications.items.some((n) => n.message === message);

  if (alreadyShown) return;

  store.dispatch(addNotification({ type, message }));
};


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request:", config.url);
    const simulatedError = maybeInjectFailure(config.url ?? "");
    if (simulatedError) {
      return Promise.reject(simulatedError);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response Success:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          broadcast("error", "Your session has expired. Please log in again.");
          navigateTo("/login");
          break;

        case 403:
          broadcast("error", "You don't have permission to do that.");
          navigateTo("/access-denied");
          break;

        case 404:
          broadcast("warning", "Resource not found.");
          break;

        case 500:
          broadcast("error", "Internal server error. Please try again.");
          break;

        default:
          broadcast("error", "Something went wrong.");
      }
    } else if (error.request) {
      broadcast("error", "Network error. Please check your connection.");
    } else {
      broadcast("error", "Unexpected error.");
    }

    return Promise.reject(error);
  },
);

export default api;