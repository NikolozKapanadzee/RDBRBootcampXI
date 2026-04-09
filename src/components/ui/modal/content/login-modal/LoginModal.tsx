import { FiEye } from "react-icons/fi";
import Input from "../../../input/Input";
import Modal from "../../Modal";
import { useModalStore } from "../../../../../store/modalStore";
import Button from "../../../button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { LoginSchema } from "../../../../../validations/LoginSchema";
import { loginUser, getMe } from "../../../../../api/auth";
import { useAuthStore } from "../../../../../store/authStore";
const LoginModal = () => {
  const { isLoginOpen, closeAll } = useModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const { setUser, setToken } = useAuthStore();
  const onSubmit = async (data: any) => {
    const response = await loginUser(data.email, data.password);
    setToken(response.data.token);
    const me = await getMe(response.data.token);
    setUser(me.data);
    closeAll();
  };

  return (
    <Modal
      isOpen={isLoginOpen}
      onClose={closeAll}
      className="flex flex-col items-center"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl">Welcome Back</h1>
        <p className="font-medium text-[14px] text-(--text-secondary)">
          Log in to continue your learning
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          icon={FiEye}
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      <Button
        className="w-full max-w-90 h-12 mt-6"
        onClick={handleSubmit(onSubmit)}
      >
        Log In
      </Button>
      <div className="flex items-center w-full max-w-90 gap-1 px-4 mt-4">
        <hr className="flex-1 text-[#D1D1D1]" />
        <p className="text-[#8A8A8A]">or</p>
        <hr className="flex-1 text-[#D1D1D1]" />
      </div>
      <div className="flex items-center gap-2  mt-4">
        <p className="text-(--text-secondary)">Don’t have an account?</p>
        <p className="text-[#141414] underline font-medium cursor-pointer">
          Sign Up
        </p>
      </div>
    </Modal>
  );
};
export default LoginModal;
