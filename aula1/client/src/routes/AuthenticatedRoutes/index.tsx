import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "@/service/AuthService";
import { NavBar } from "@/components/NavBar";

export function AuthenticatedRoutes() {
  const isAuthenticated = AuthService.isAuthenticated();
  const location = useLocation();

  // if (isAuthenticated) {
  //     return <Outlet />
  // } else {
  //     return <Navigate to="/login" state={{from: location}} replace />
  // }
  return isAuthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
