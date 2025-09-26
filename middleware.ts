// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/home/:path*",
    "/blog/:path*", 
    "/inbox/:path*",
    "/calendar/:path*",
    "/search/:path*",
    "/settings/:path*",
  ],
};