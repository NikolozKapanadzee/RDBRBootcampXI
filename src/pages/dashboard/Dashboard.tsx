import FeaturedCourses from "../../components/sections/featured-courses/FeaturedCourses";
import HeroSlider from "../../components/sections/hero/HeroSlider";
import InProgressCourses from "../../components/sections/inprogress-courses/InProgressCourses";
import { useAuthStore } from "../../store/authStore";

const Dashboard = () => {
  const { token } = useAuthStore();
  const isLoggedIn = !!token;
  return (
    <div>
      <HeroSlider />
      <FeaturedCourses />
      {!isLoggedIn && <InProgressCourses />}
    </div>
  );
};

export default Dashboard;
