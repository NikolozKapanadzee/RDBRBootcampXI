import type { CardProps } from "../../../types";
import Button from "../button/Button";
import StarIcon from "../../../assets/Star.svg";
import { useNavigate } from "react-router-dom";

const Card = ({
  image,
  instructor,
  id,
  duration,
  rating,
  title,
  category,
  categoryIcon,
  price,
}: CardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden w-full p-4">
      <img
        src={image}
        alt={title}
        className="w-full rounded-[10px] h-48 object-cover"
      />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-[#ADADAD]">{instructor}</span>
            <span className="text-[#ADADAD]">|</span>
            <span className="text-[#ADADAD]">{duration} Weeks</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={StarIcon} className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>
        <h2 className=" text-2xl text-[#000000] font-semibold leading-snug">
          {title}
        </h2>
        <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-lg px-3 py-2 w-fit">
          {categoryIcon && <img src={categoryIcon} className="w-4 h-4" />}
          <span className="text-[16px] text-[#525252]">{category}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-[#ADADAD]">Starting from</span>
            <span className="text-2xl font-bold text-[#333333]">${price}</span>
          </div>
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/course/${id}`, { state: { breadcrumb: category } })
            }
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
