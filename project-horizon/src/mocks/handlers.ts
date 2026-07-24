import { http, HttpResponse, delay } from "msw";

export const handlers = [
  // Users API
  http.get("https://jsonplaceholder.typicode.com/users", async () => {
    await delay(1500);

    return HttpResponse.json([
      {
        id: 1,
        name: "Inderjeet Singh",
        email: "inderjeet@example.com",
      },
      {
        id: 2,
        name: "Rahul Sharma",
        email: "rahul@example.com",
      },
      {
        id: 3,
        name: "Priya Verma",
        email: "priya@example.com",
      },
    ]);
  }),

  // Dashboard API
  http.get("https://jsonplaceholder.typicode.com/dashboard", async () => {
    await delay(2000);

    return HttpResponse.json({
      students: 120,
      projects: 8,
      assignments: 24,
      attendance: "92%",
    });
  }),
];