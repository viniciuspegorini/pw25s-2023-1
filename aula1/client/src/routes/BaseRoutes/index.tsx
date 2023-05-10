import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { UserSignupPage } from "../../pages/UserSignupPage";
import { HomePage } from "../../pages/HomePage";
import { CategoryListPage } from "../../pages/CategoryListPage";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoryListPage />} />
        </Route>

      </Routes>
    </>
  );
}