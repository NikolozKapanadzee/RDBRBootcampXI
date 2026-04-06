import MainLayout from "./components/layout/mainLayout/MainLayout";
import FeaturedCourses from "./components/sections/featured-courses/FeaturedCourses";
import LoginModal from "./components/ui/modal/content/login-modal/LoginModal";
import RegisterModal from "./components/ui/modal/content/register-modal/RegisterModal";

import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <MainLayout>
      <Dashboard />
      <FeaturedCourses />
      <LoginModal />
      <RegisterModal />
    </MainLayout>
  );
}
export default App;
