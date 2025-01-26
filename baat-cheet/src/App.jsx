import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";
import SettingsPage from "./pages/Settings";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log('onlineUsers', onlineUsers);
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-20 animate-pulse"></div>
          <Loader className="size-12 text-cyan-400 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900"
    >
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#e2e8f0",
            borderColor: "rgba(148, 163, 184, 0.1)",
          },
        }}
      />
    </div>
  );
};

export default App;
