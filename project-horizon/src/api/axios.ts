import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request:", config.url);

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
          alert("Unauthorized! Please login again.");
          break;

        case 403:
          alert("Access Denied.");
          break;

        case 404:
          alert("Resource Not Found.");
          break;

        case 500:
          alert("Internal Server Error.");
          break;

        default:
          alert("Something went wrong.");
      }
    } else if (error.request) {
      alert("Network Error. Please check your internet connection.");
    } else {
      alert("Unexpected Error.");
    }

    return Promise.reject(error);
  },
);

export default api;
