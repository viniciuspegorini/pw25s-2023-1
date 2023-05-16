import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { UserSignupPage } from "../../pages/UserSignupPage";
import { HomePage } from "../../pages/HomePage";
import { CategoryListPage } from "../../pages/CategoryListPage";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { CategoryFormPage } from "@/pages/CategoryFormPage";

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
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/categories/:id" element={<CategoryFormPage />} />
        </Route>

      </Routes>
    </>
  );
}