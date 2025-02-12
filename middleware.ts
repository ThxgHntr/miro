import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const authObject = await auth();

    // Check if the user is authenticated
    if (!authObject || !authObject.userId) {
      // Redirect to the sign-in page if not authenticated
      authObject.redirectToSignIn();
    }

    // Optionally, you can handle additional logic for authenticated users here
  }

  // Allow the request to proceed for public routes or authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
