import FeaturedCourses from "../../components/sections/featured-courses/FeaturedCourses";
import HeroSlider from "../../components/sections/hero/HeroSlider";
import InProgressCourses from "../../components/sections/inprogress-courses/InProgressCourses";

const Dashboard = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedCourses />
      <InProgressCourses />
    </div>
  );
};

export default Dashboard;
