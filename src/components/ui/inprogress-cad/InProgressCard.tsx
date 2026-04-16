import StarIcon from "../../../assets/Star.svg";
import type { InProgressCarsProps } from "../../../types";
import Button from "../button/Button";

const InProgressCard = ({
  thumbnail,
  lecturer,
  rating,
  title,
  percentage,
}: InProgressCarsProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between p-4 h-full min-h-48">
      <div className="flex gap-3">
        <img
          className="w-32 h-28 rounded-lg object-cover shrink-0"
          src={thumbnail}
          alt="course thumbnail"
        />
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#8A8A8A]">
              Lecturer {lecturer}
            </span>
            <div className="flex items-center gap-1">
              <img src={StarIcon} alt="star" className="w-3 h-3" />
              <span className="text-xs text-gray-700">{rating}</span>
            </div>
          </div>
          <h3 className="text-[20px] font-semibold text-gray-900 leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col flex-1 gap-1">
          <span className="text-xs text-gray-500">{percentage}% Complete</span>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <Button variant="outline" className="px-4 py-1.5 text-sm">
          View
        </Button>
      </div>
    </div>
  );
};
export default InProgressCard;
