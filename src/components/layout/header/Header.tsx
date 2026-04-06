import ProjectLogo from "../../../assets/ProjectLogo.svg";
import BrowseCoursesIcon from "../../../assets/BrowseCourses.svg";
import Button from "../../ui/button/Button";
import EnrolledCoursesIcon from "../../../assets/EnrolledCourses.svg";
import ProfileIcon from "../../../assets/ProfileIcon.svg";
import { useModalStore } from "../../../store/modalStore";
import { useAuthStore } from "../../../store/authStore";

const Header = () => {
  const { openLogin, openRegister } = useModalStore();
  const { token } = useAuthStore();

  const isLoggedIn = !!token;
  return (
    <header className="flex items-center justify-between px-28 py-4 bg-[#F3F4F6]">
      <div>
        <img src={ProjectLogo} alt="Project Logo" />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <img src={BrowseCoursesIcon} alt="Browse Courses Icon" />
          <p className="text-(--text-primary)">Browse Courses</p>
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2">
              <img src={EnrolledCoursesIcon} alt="Enrolled Courses Icon" />
              <p className="text-(--text-primary)">Enrolled Courses</p>
            </div>
            <img
              className="w-13 h-13 cursor-pointer"
              src={ProfileIcon}
              alt="Profile Icon"
            />
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
