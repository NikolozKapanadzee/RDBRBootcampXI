import LockIcon from "../../../../../assets/LockIcon.svg";
import { useModalStore } from "../../../../../store/modalStore";
import Button from "../../../button/Button";
const PopUpModal = ({ className }: any) => {
  const { openLogin } = useModalStore();

  return (
    <div className={className}>
      <div>
        <img src={LockIcon} alt="lock icon" />
      </div>
      <p className="text-[#0A0836] text-[16px]">
        Sign in to track your learning progress
      </p>
      <Button onClick={openLogin} children="Log In" variant="primary" />
    </div>
  );
};

export default PopUpModal;
