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
    <div className="h-144 w-full max-w-126">
      <div className="flex w-full max-w-116 h-full max-f-66">
        <img src={image} alt="course interface" className="object-fill" />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#666666]">Lecturer {instructor.name}</p>
        <div className="flex items-center">
          <img src={starIcon} alt="star icon" />
          <p className="text-[#525252]">{avgRating}</p>
        </div>
      </div>
      <h1 className="text-[#141414] text-2xl">{title}</h1>
      <p className="text-[#666666]">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-[#8A8A8A]">Starting from</p>
          <h1 className="text-[#141414] text-3xl">{basePrice}</h1>
        </div>
        <Button children="Details" />
      </div>
    </div>
  );
};

export default FeaturedCard;
