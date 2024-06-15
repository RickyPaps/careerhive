import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/"]);

// const isProtectedRoute = createRouteMatcher([
//   "/api/posts/(.*)/like",
//   "/api/posts/(.*)/unlike",
//   "/api/posts/(.*)/comments",
//   "/api/posts/(.*)",
// ]);

export default clerkMiddleware((auth, req) => {
  // if (isPublicRoute(req)) return; // if it's a public route, do nothing
  // auth().protect(); // for any other route, require auth
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
