import { useState, useEffect } from "react";
import { useModalStore } from "../../../../../store/modalStore";
import Input from "../../../input/Input";
import Modal from "../../Modal";
import { FiEdit2, FiCheck, FiUpload } from "react-icons/fi";
import Button from "../../../button/Button";
import { useAuthStore } from "../../../../../store/authStore";
import { getMe, updateProfile } from "../../../../../api/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileSchema } from "../../../../../validations/ProfileSchema";

const ProfileModal = () => {
  const { isProfileOpen, closeAll } = useModalStore();
  const { user, setUser, token } = useAuthStore();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isProfileOpen) {
      reset({
        fullName: user?.fullName || "",
        mobileNumber: user?.mobileNumber || "",
        age: user?.age || 16,
      });
    }
  }, [isProfileOpen, user, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarFileName(file.name);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (!token) return;
      await updateProfile({ ...data, avatar: avatarFile }, token);
      const fresh = await getMe(token);
      setUser(fresh.data);
      closeAll();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isProfileOpen} onClose={closeAll} className="flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              user?.profileComplete ? "bg-green-500" : "bg-[#F4A316]"
            }`}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.username}</h2>
          <p
            className={`text-sm ${user?.profileComplete ? "text-green-500" : "text-[#F4A316]"}`}
          >
            {user?.profileComplete
              ? "Profile is Complete"
              : "Profile is Incomplete"}
          </p>
        </div>
      </div>
      <Input
        label="Full Name"
        placeholder="Full Name"
        icon={FiEdit2}
        error={errors?.fullName?.message}
        {...register("fullName")}
      />
      <Input
        label="Email"
        placeholder="Email@gmail.com"
        icon={FiCheck}
        value={user?.email || ""}
        disabled
      />

      <div className="flex gap-4 mt-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-[#3D3D3D] font-medium">
            Mobile Number
          </label>
          <div className="flex items-center border rounded-lg px-4 py-3 bg-gray-50">
            <span className="text-gray-400 mr-2">+995</span>
            <input
              type="tel"
              {...register("mobileNumber")}
              className="outline-none bg-transparent w-full"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-24">
          <label className="text-sm text-[#3D3D3D] font-medium">Age</label>
          <select
            {...register("age")}
            className="border rounded-lg px-3 py-3 bg-gray-50 outline-none"
          >
            {Array.from({ length: 105 }, (_, i) => i + 16).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm text-[#3D3D3D] font-medium">
          Upload Avatar
        </label>
        <div
          className="border rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50"
          onClick={() => document.getElementById("profile-avatar")?.click()}
        >
          <input
            type="file"
            id="profile-avatar"
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          {avatarFileName ? (
            <p className="text-sm text-[#4F46E5] font-medium">
              {avatarFileName}
            </p>
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
      </div>
      <Button className="w-full h-12 mt-6" onClick={handleSubmit(onSubmit)}>
        Update Profile
      </Button>
    </Modal>
  );
};
export default ProfileModal;
