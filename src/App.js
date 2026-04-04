import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import PlantDetailPage from "./pages/PlantDetailPage";
import MyGardenPage from "./pages/MyGardenPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage"; // 🔥 ADD THIS

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      {/* 🌿 GLOBAL BACKGROUND */}
      <div className="app-bg">

        <Routes>

          {/* 🔐 AUTH */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 🔒 USER PAGES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/plant/:id"
            element={
              <ProtectedRoute>
                <PlantDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/garden"
            element={
              <ProtectedRoute>
                <MyGardenPage />
              </ProtectedRoute>
            }
          />

          {/* 🔥 ADMIN PAGE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;