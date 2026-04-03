import type { InputProps } from "../../../types";
import type { IconType } from "react-icons";

interface Props extends InputProps {
  icon?: IconType;
}

const Input = ({
  label,
  error,
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-[(--text-primary)">{label}</label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-4 py-3 outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } ${Icon ? "pr-10" : ""}`} // make space for icon
        />
        {Icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
