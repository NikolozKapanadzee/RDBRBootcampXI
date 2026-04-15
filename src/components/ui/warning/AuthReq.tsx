import WarningIcon from "../../../assets/warning.svg";
import ArrowRightIcon from "../../../assets/ArrowRight.svg";
import { useModalStore } from "../../../store/modalStore";
const AuthReq = () => {
  const { openLogin } = useModalStore();
  return (
    <div className="border border-[#E5E7EB] bg-[#FFFFFF] flex items-center py-4 px-6 rounded-xl justify-between w-full max-w-121">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <img src={WarningIcon} alt="warning icon" />
          <p>Authentication Required</p>
        </div>
        <p className="text-[#8A8A8A] text-[12px] w-70 mt-2">
          You need sign in to your profile before enrolling in this course.
        </p>
      </div>
      <button
        onClick={openLogin}
        className="flex items-center bg-[#EEEDFC] border border-[#B7B3F4] text-[#281ED2] rounded-lg w-23 h-12 justify-center cursor-pointer gap-2"
      >
        Sign In <img src={ArrowRightIcon} alt="arrow right icon" />
      </button>
    </div>
  );
};

export default AuthReq;
