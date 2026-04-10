import ProjectLogo from "../../../assets/ProjectLogo.svg";
import BrowseCoursesIcon from "../../../assets/BrowseCourses.svg";
import Button from "../../ui/button/Button";
import EnrolledCoursesIcon from "../../../assets/EnrolledCourses.svg";
import ProfileIcon from "../../../assets/User.png";
import { useModalStore } from "../../../store/modalStore";
import { useAuthStore } from "../../../store/authStore";
import { Link } from "react-router-dom";

const Header = () => {
  const { openLogin, openRegister, openProfile } = useModalStore();
  const { token, user } = useAuthStore();

  const isLoggedIn = !!token;
  return (
    <header className="flex items-center justify-between px-14 py-4 bg-[#F3F4F6]">
      <div>
        <img src={ProjectLogo} alt="Project Logo" />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <img src={BrowseCoursesIcon} alt="Browse Courses Icon" />
          <Link to="/browse">
            <p className="text-(--text-primary)">Browse Courses</p>
          </Link>
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2">
              <img src={EnrolledCoursesIcon} alt="Enrolled Courses Icon" />
              <p className="text-(--text-primary)">Enrolled Courses</p>
            </div>
            <div className="relative">
              <img
                className="w-13 h-13 cursor-pointer"
                src={ProfileIcon}
                alt="Profile Icon"
                onClick={openProfile}
              />
              <div
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  user?.profileComplete ? "bg-green-500" : "bg-[#F4A316]"
                }`}
              ></div>
            </div>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={openLogin}>
              Log In
            </Button>
            <Button variant="primary" onClick={openRegister}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
