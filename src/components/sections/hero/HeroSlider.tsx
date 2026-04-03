import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../../ui/button/Button";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div>
          <h1>Start learning something new today</h1>
          <p>
            Explore a wide range of expert-led courses in design, development,
            business, and more. Find the skills you need to grow your career and
            learn at your own pace.
          </p>
          <Button variant="primary">Browse Courses</Button>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div>
          <h1>Pick up where you left off</h1>
          <p>
            Your learning journey is already in progress. Continue your enrolled
            courses, track your progress, and stay on track toward completing
            your goals.
          </p>
          <Button variant="primary">Start Learning</Button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <h1>Learn together, grow faster</h1>
          <Button variant="primary">Learn More</Button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
