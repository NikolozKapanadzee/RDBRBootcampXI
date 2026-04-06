import type { FeaturedCardsProps } from "../../../types";
import Button from "../button/Button";
import starIcon from "../../../assets/Star.svg";

const FeaturedCard = ({
  title,
  description,
  instructor,
  avgRating,
  basePrice,
  image,
}: FeaturedCardsProps) => {
  return (
    <div className="w-full flex flex-col p-5 bg-white rounded-xl border border-[#D1D1D1] outline-none">
      <div className="w-full h-66 overflow-hidden rounded-lg">
        <img
          src={image}
          alt="course interface"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#666666] mt-2">Lecturer {instructor.name}</p>
        <div className="flex items-center">
          <img src={starIcon} alt="star icon" />
          <p className="text-[#525252]">{avgRating}</p>
        </div>
      </div>
      <h1 className="text-[#141414] text-2xl mt-2">{title}</h1>
      <p className="text-[#666666] text-[16px] mt-2">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <p className="text-[#8A8A8A]">Starting from</p>
          <h1 className="text-[#141414] text-3xl">${basePrice}</h1>
        </div>
        <Button children="Details" />
      </div>
    </div>
  );
};

export default FeaturedCard;
