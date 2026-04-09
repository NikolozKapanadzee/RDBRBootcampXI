import LockIcon from "../../../../../assets/LockIcon.svg";
import Button from "../../../button/Button";
const PopUpModal = ({ className }: any) => {
  return (
    <div className={className}>
      <div>
        <img src={LockIcon} alt="lock icon" />
      </div>
      <p className="text-[#0A0836] text-[16px]">
        Sign in to track your learning progress
      </p>
      <Button children="Log In" variant="primary" />
    </div>
  );
};

export default PopUpModal;
