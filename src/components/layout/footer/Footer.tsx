import ProjectLogo from "../../../assets/ProjectLogo.svg";
import FacebookIcon from "../../../assets/Facebook.svg";
import InstagramIcon from "../../../assets/Instagram.svg";
import LinkedinIcon from "../../../assets/LinkedIn.svg";
import TwitterIcon from "../../../assets/Twitter.svg";
import YoutubeIcon from "../../../assets/YouTube.svg";

const Footer = () => {
  return (
    <footer className="bg-[#F3F4F6] px-14 py-6">
      <div className="flex justify-between pb-16 pt-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={ProjectLogo} alt="Project Logo" />
            <p className="font-medium text-2xl text-[#130E67]">Bootcamp</p>
          </div>
          <p className="text-[#130E67]">
            Your learning journey starts here! <br /> Browse courses to get
            started.
          </p>
          <div className="flex gap-8 items-center">
            <a href="https://facebook.com">
              <img src={FacebookIcon} alt="Facebook Icon" />
            </a>
            <a href="https://x.com">
              <img src={TwitterIcon} alt="Twitter Icon" />
            </a>
            <a href="https://www.instagram.com">
              <img src={InstagramIcon} alt="Instagram Icon" />
            </a>
            <a href="https://www.linkedin.com">
              <img src={LinkedinIcon} alt="Linkedin Icon" />
            </a>
            <a href="https://www.youtube.com">
              <img src={YoutubeIcon} alt="Youtube Icon" />
            </a>
          </div>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-[#130E67] text-xl">Explore</p>
            <p className="text-(--text-secondary)">Enrolled Courses</p>
            <p className="text-(--text-secondary)">Browse Courses</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#130E67] text-xl">Account</p>
            <p className="text-(--text-secondary)">My Profile</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#130E67] text-xl">Contact</p>
            <p className="text-(--text-secondary)">contact@company.com</p>
            <p className="text-(--text-secondary)">(+995) 555 111 222</p>
            <p className="text-(--text-secondary)">Aghmashenebeli St.115</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <p className="text-(--text-secondary)">
          Copyright © 2026 Redberry International
        </p>
        <div className="flex gap-2">
          <p className="text-(--text-secondary)">All Rights Reserved |</p>
          <a
            className="text-[#4F46E5]"
            href="https://www.youtube.com/watch?v=9OFpfTd0EIs&list=RD9OFpfTd0EIs&start_radio=1"
          >
            Terms and Conditions |
          </a>
          <a
            className="text-[#4F46E5]"
            href="https://www.youtube.com/watch?v=laXY5e5JaV0&list=RD9OFpfTd0EIs&index=13"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
