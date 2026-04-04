import { RiEyeCloseLine } from "react-icons/ri";
import Button from "../../../button/Button";
import Input from "../../../input/Input";
import { FiEye } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const StepTwo = ({ onNext, onBack }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="absolute top-4 left-2 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-[#141414] text-4xl font-semibold">
          Create Account
        </h1>
        <p className="text-(--text-secondary) font-normal">
          Join and start learning today
        </p>
      </div>
      <div className="flex gap-2 w-full max-w-90 mb-4 mt-5">
        <div className="h-2 flex-1 bg-[#4F46E5] rounded-full" />
        <div className="h-2 flex-1 bg-[#B7B3F4] rounded-full" />
        <div className="h-2 flex-1 bg-[#EEEDFC] rounded-full" />
      </div>
      <div className="flex flex-col gap-6">
        <Input
          label="Password*"
          type="password"
          placeholder="Password"
          icon={FiEye}
        />
        <Input
          label="Confirm Password*"
          type="password"
          placeholder="Confirm Password"
          icon={RiEyeCloseLine}
        />
      </div>
      <Button className="w-full max-w-90 h-12 mt-5" onClick={onNext}>
        Next
      </Button>
      <div className="flex items-center w-full max-w-90 gap-1 px-4 mt-4">
        <hr className="flex-1" />
        <p className="text-[#8A8A8A]">or</p>
        <hr className="flex-1" />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="text-(--text-secondary)">Already have an account?</p>
        <p className="text-[#141414] underline font-medium cursor-pointer">
          Log In
        </p>
      </div>
    </div>
  );
};

export default StepTwo;
