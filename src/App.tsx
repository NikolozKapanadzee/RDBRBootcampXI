import { useEffect } from "react";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import LoginModal from "./components/ui/modal/content/login-modal/LoginModal";
import ProfileModal from "./components/ui/modal/content/profile-modal/ProfileModal";
import RegisterModal from "./components/ui/modal/content/register-modal/RegisterModal";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuthStore } from "./store/authStore";
import { getMe } from "./api/auth";
import { Route, Routes } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import InsideCoursePage from "./components/sections/inside-course/InsideCoursePage";
import Sidebar from "./components/sections/sidebar/Sidebar";

function App() {
  const { token, setUser } = useAuthStore();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;
        const me = await getMe(token);
        setUser(me.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/course/:id" element={<InsideCoursePage />} />
      </Routes>
      <LoginModal />
      <RegisterModal />
      <ProfileModal />
      <Sidebar />
    </MainLayout>
  );
}
export default App;
