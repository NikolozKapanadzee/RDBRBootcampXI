import { mockContinueLearningCourses } from "../../../mock/InProgressCoursesMock";
import InProgressCard from "../../ui/inprogress-cad/InProgressCard";
import PopUpModal from "../../ui/modal/content/popup-modal/PopUpModal";

const InProgressCourses = () => {
  return (
    <section className="w-full px-14 py-10 bg-gray-50">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-[32px] font-semibold text-[#0A0A0A]">
          Continue Learning
        </h1>

        <div className="flex items-center justify-between">
          <p className="text-[18px] text-[#3D3D3D]">Pick up where you left</p>
          <p className="text-[18px] text-indigo-600 cursor-pointer">See All</p>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-6 justify-center">
          {mockContinueLearningCourses.map((course) => (
            <InProgressCard
              key={course.id}
              title={course.title}
              lecturer={course.instructor}
              rating={course.rating}
              percentage={course.progress}
              thumbnail={course.image}
            />
          ))}
        </div>
        <div
          className="absolute inset-0 rounded-xl"
          style={{ backdropFilter: "blur(8px)" }}
        />
      </div>
      <PopUpModal className="flex flex-col gap-5" />
    </section>
  );
};

export default InProgressCourses;
