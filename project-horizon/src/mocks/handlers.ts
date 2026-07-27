import { http, HttpResponse, delay } from "msw";
const savedEmails: string[] = [];

export const handlers = [
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

  http.get("https://jsonplaceholder.typicode.com/users-401", () => {
    return new HttpResponse(null, {
      status: 401,
    });
  }),
  http.get("https://jsonplaceholder.typicode.com/users-403", () => {
    return new HttpResponse(null, {
      status: 403,
    });
  }),
  http.get("https://jsonplaceholder.typicode.com/users-404", async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        message: "Not Found",
      },
      {
        status: 404,
      },
    );
  }),
  http.get("https://jsonplaceholder.typicode.com/users-500", async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }),
  http.post(
    "https://jsonplaceholder.typicode.com/settings",
    async ({ request }) => {
      await delay(1000);

      const body = (await request.json()) as {
        fullName: string;
        email: string;
        theme: string;
        language: string;
        notifications: boolean;
      };

      const errors = {
        fullName: "",
        email: "",
      };

      // Full Name Validation
      if (!body.fullName || body.fullName.trim().length < 3) {
        errors.fullName = "Full Name must be at least 3 characters.";
      }

      // Email Validation
      if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        errors.email = "Please enter a valid email address.";
      }
      if (errors.fullName || errors.email) {
        return HttpResponse.json(
          { errors },
          {
            status: 400,
          },
        );
      }
      if (savedEmails.includes(body.email.toLowerCase())) {
        return HttpResponse.json(
          {
            errors: {
              fullName: "",
              email: "Email already exists.",
            },
          },
          {
            status: 400,
          },
        );
      }

      // Save Email
      savedEmails.push(body.email.toLowerCase());

      console.log("Saved Emails:", savedEmails);

      return HttpResponse.json(
        {
          message: "Settings saved successfully.",
        },
        {
          status: 200,
        },
      );
    },
  ),
];
