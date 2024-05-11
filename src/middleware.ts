import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/api/auth/signin");
    console.log(url);

    return Response.redirect(url);
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/dashboard/:path*"],
};
