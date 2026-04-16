import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../../ui/button/Button";
import defaultImage from "../../../assets/default.png";
import secondImage from "../../../assets/8584b867d5528160322fe2dc7fe7c6da6d295c19.png";
import thirdImage from "../../../assets/variant3.png";
import { useNavigate } from "react-router-dom";
const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide
        style={{ backgroundImage: `url(${defaultImage})` }}
        className="bg-cover bg-center h-105 min-h-105"
      >
        <div className="max-w-7xl p-12 flex flex-col gap-8">
          <h1 className="font-bold text-6xl text-white">
            Start learning something new today
          </h1>
          <p className="font-light text-2xl text-white">
            Explore a wide range of expert-led courses in design, development,
            business, and more. Find the skills you need to grow your career and
            learn at your own pace.
          </p>
          <Button
            className="w-50 h-16"
            variant="primary"
            onClick={() => navigate("/browse")}
          >
            Browse Courses
          </Button>
        </div>
      </SwiperSlide>

      <SwiperSlide
        style={{ backgroundImage: `url(${secondImage})` }}
        className="bg-cover bg-center h-105 min-h-105"
      >
        <div className="max-w-7xl p-12 flex flex-col gap-8">
          <h1 className="font-bold text-6xl text-white">
            Pick up where you left off
          </h1>
          <p className="font-light text-2xl text-white">
            Your learning journey is already in progress.
          </p>
          <Button
            className="w-45 h-16"
            variant="primary"
            onClick={() => navigate("/browse")}
          >
            Start Learning
          </Button>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{ backgroundImage: `url(${thirdImage})` }}
        className="bg-cover bg-center h-105 min-h-105"
      >
        <div className="max-w-7xl p-12 flex flex-col gap-8">
          <h1 className="font-bold text-6xl text-white">
            Learn together, grow faster
          </h1>
          <Button
            className="w-40 h-16 mt-12"
            variant="primary"
            onClick={() => navigate("/browse")}
          >
            Learn More
          </Button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
