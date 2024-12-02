import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token?.accessToken);
  },
  {
    callbacks: {
      // middleware() is called if this callback function returns true
      authorized: ({ token }) => {
        const accessToken = token?.accessToken;
        return !!accessToken;
      }
    }
  }
);

export const config = {
  matcher: [
    "/overview", "/habits/:path*", "/settings"
  ]
}
