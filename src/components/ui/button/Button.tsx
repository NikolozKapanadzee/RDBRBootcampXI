import type { ButtonProps } from "../../../types";

export default function Button({
  children,
  className = "",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const variants = {
    outline: "border-2 border-[#958FEF] text-[#4F46E5]  px-5 py-2",
    primary: "bg-[#4F46E5] text-white px-5 py-2",
  };

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
