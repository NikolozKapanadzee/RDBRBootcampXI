import { useForm } from "react-hook-form";
import Button from "../../../button/Button";
import Input from "../../../input/Input";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { RegisterStepOneSchema } from "../../../../../validations/RegisterStepOneSchema";
import { useModalStore } from "../../../../../store/modalStore";

type Props = {
  onNext: (data: any) => void;
  apiErrors?: Record<string, string>;
};

const StepOne = ({ onNext, apiErrors }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterStepOneSchema) });

  const onSubmit = (data: any) => onNext(data);
  const { openLogin, closeAll } = useModalStore();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-[#141414] text-4xl font-semibold">
          Create Account
        </h1>
        <p className="text-(--text-primary) font-normal">
          Join and start learning today
        </p>
      </div>
      <div className="flex gap-2 w-full max-w-90 mb-6 mt-5">
        <div className="h-2 flex-1 bg-[#B7B3F4] rounded-full" />
        <div className="h-2 flex-1 bg-[#EEEDFC] rounded-full" />
        <div className="h-2 flex-1 bg-[#EEEDFC] rounded-full" />
      </div>

      <Input
        label="Email*"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message || apiErrors?.email}
        {...register("email")}
      />

      <Button
        className="w-full max-w-90 h-12 mt-5"
        onClick={handleSubmit(onSubmit)}
      >
        Next
      </Button>

      <div className="flex items-center w-full max-w-90 gap-1 px-4 mt-4">
        <hr className="flex-1 text-[#D1D1D1]" />
        <p className="text-[#8A8A8A]">or</p>
        <hr className="flex-1 text-[#D1D1D1]" />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-(--text-secondary)">Already have an account?</p>
        <p
          className="text-[#141414] underline font-medium cursor-pointer"
          onClick={() => {
            closeAll();
            openLogin();
          }}
        >
          Log In
        </p>
      </div>
    </div>
  );
};

export default StepOne;
