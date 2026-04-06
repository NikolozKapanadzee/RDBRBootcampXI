import MainLayout from "./components/layout/mainLayout/MainLayout";
import LoginModal from "./components/ui/modal/content/login-modal/LoginModal";
import RegisterModal from "./components/ui/modal/content/register-modal/RegisterModal";

import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <MainLayout>
      <Dashboard />
      <LoginModal />
      <RegisterModal />
    </MainLayout>
  );
}
export default App;
