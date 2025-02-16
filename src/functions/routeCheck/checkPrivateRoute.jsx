// Declare private and public route groups
const publicRoutes = ["/", "/features", "/pricing", "/login", "/signup"];
const privateRoutes = ["/dashboard", "/search"];

export default function checkPrivateRoute(link) {
  const publicRegex = new RegExp(
    `^(${publicRoutes.map((route) => route.replace("/", "\\/")).join("|")})$`
  );
  const privateRegex = new RegExp(
    `^(${privateRoutes.map((route) => route.replace("/", "\\/")).join("|")})$`
  );

  if (publicRegex.test(link)) {
    return "public";
  } else if (privateRegex.test(link)) {
    return "private";
  } else {
    return "nuh uh";
  }
}
