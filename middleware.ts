import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Your middleware logic
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all routes except login
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/home", "/blog", "/inbox", "/calendar", "/search", "/settings"],
};