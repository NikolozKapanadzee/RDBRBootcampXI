import { useEffect, useState } from "react";
import { mockContinueLearningCourses } from "../../../mock/InProgressCoursesMock";
import InProgressCard from "../../ui/inprogress-cad/InProgressCard";
import PopUpModal from "../../ui/modal/content/popup-modal/PopUpModal";
import { useAuthStore } from "../../../store/authStore";
import { getEnrollments } from "../../../api/courses";
import { useModalStore } from "../../../store/modalStore";
import { Enrollment } from "../../../types";
import { Link } from "react-router-dom";

const InProgressCourses = () => {
  console.log("InProgressCourses rendered");
  const token = useAuthStore((state) => state.token);
  const { openSidebar } = useModalStore();
  const isLoggedIn = !!token;
  useEffect(() => {
    console.log("TOKEN CHANGED TO:", token);
  }, [token]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!token) return;
    console.log("TOKEN INSIDE COMPONENT:", token);
    let isMounted = true;

    const fetchEnrollments = async () => {
      setIsLoading(true);
      try {
        const data = await getEnrollments(token);
        if (isMounted) setEnrollments(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEnrollments();

    return () => {
      isMounted = false;
    };
  }, [token]);
  const displayedEnrollments = enrollments.slice(0, 3);
  const hasMore = enrollments.length > 3;
  if (!isLoggedIn) {
    return (
      <section className="w-full px-14 py-10 bg-gray-50">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-[32px] font-semibold text-[#0A0A0A]">
            Continue Learning
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-[18px] text-[#3D3D3D]">Pick up where you left</p>
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
          <PopUpModal className="flex flex-col gap-5 w-full max-w-105 items-center bg-[#FFFFFF] p-4 border-[#ADADAD] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl" />
        </div>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className="w-full px-14 py-10 bg-gray-50">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-[32px] font-semibold text-[#0A0A0A]">
            Continue Learning
          </h1>
          <p className="text-[18px] text-[#3D3D3D]">Pick up where you left</p>
        </div>
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-32 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }
  if (enrollments.length === 0) return null;
  return (
    <section className="w-full px-14 py-10 bg-gray-50">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-[32px] font-semibold text-[#0A0A0A]">
          Continue Learning
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-[18px] text-[#3D3D3D]">Pick up where you left</p>
          {hasMore && (
            <button
              onClick={openSidebar}
              className="text-[18px] text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
            >
              See All
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {displayedEnrollments.map((enrollment) => (
          <Link key={enrollment.id} to={`/course/${enrollment.course.id}`}>
            <InProgressCard
              title={enrollment.course.title}
              lecturer={enrollment.course.instructor.name}
              rating={enrollment.course.avgRating}
              percentage={enrollment.progress}
              thumbnail={enrollment.course.image}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InProgressCourses;
