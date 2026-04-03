import MainLayout from "./components/layout/mainLayout/MainLayout";
import LoginModal from "./components/ui/modal/content/LoginModal";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <MainLayout>
      <Dashboard />
      <LoginModal />
    </MainLayout>
  );
}
export default App;
