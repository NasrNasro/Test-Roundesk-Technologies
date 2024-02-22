import Navbar from "components/Navbar";
import LoginPage from "pages/LoginPage/LoginPage";
import ProfilePage from "pages/Profile/ProfilePage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import ProtectedRoute from "protected/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
