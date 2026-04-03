import Modal from "../Modal";
import { useModalStore } from "../../../../store/modalStore";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { FiEye } from "react-icons/fi";

const LoginModal = () => {
  const { isLoginOpen, closeAll } = useModalStore();

  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={closeAll}
      className="flex flex-col items-center"
    >
      <h1 className="font-semibold text-3xl">Welcome Back</h1>
      <p className="font-medium text-[14px]">
        Log in to continue your learning
      </p>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input
        label="Password"
        placeholder="••••••••"
        type="password"
        icon={FiEye}
      />
      <Button>Log In</Button>
    </Modal>
  );
};
export default LoginModal;
