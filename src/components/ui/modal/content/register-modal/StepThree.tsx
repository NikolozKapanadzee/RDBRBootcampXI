import { useState } from "react";
import Button from "../../../button/Button";
import Input from "../../../input/Input";
import { FiUpload, FiChevronLeft } from "react-icons/fi";

type Props = {
  onBack: () => void;
};

const StepThree = ({ onBack }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 text-gray-400 hover:text-gray-600 cursor-pointer"
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
        <div className="h-2 flex-1 bg-[#4F46E5] rounded-full" />
        <div className="h-2 flex-1 bg-[#B7B3F4] rounded-full" />
      </div>

      <Input label="Username*" placeholder="Username" />

      <div
        className="border  rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 w-full max-w-90 mt-4"
        onClick={() => document.getElementById("avatar")?.click()}
      >
        <input
          type="file"
          id="avatar"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileName ? (
          <p className="text-sm text-[#4F46E5] font-medium">{fileName}</p>
        ) : (
          <>
            <FiUpload className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop or{" "}
              <span className="text-[#4F46E5] underline">Upload file</span>
            </p>
            <p className="text-xs text-gray-400">JPG, PNG or WebP</p>
          </>
        )}
      </div>

      <Button className="w-full max-w-90 h-12 mt-5">Sign Up</Button>

      <div className="flex items-center w-full max-w-90 gap-1 px-4 mt-4">
        <hr className="flex-1" />
        <p className="text-[#8A8A8A]">or</p>
        <hr className="flex-1" />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-(--text-secondary)">Already have an account?</p>
        <p className="text-[#141414] underline font-medium cursor-pointer">
          Log In
        </p>
      </div>
    </div>
  );
};

export default StepThree;
