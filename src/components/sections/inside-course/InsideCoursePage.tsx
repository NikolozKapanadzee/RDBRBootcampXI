import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../api/courses";
import StartIcon from "../../../assets/Star.svg";
import CalendarIcon from "../../../assets/ClockIcon.svg";
import ClockIcon from "../../../assets/ClockIcon2.svg";
import { categoryIcons } from "../../../constants/categoryIcons";
import EnrollmentCard from "../enrolment-card/EnrollmentCard";
const InsideCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCourseById(Number(id));
      setCourse(data);
      console.log(data);
    };
    fetch();
  }, [id]);
  if (!course) return <div className="p-8">Course not found</div>;

  const avgRating = course.reviews?.length
    ? (
        course.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        course.reviews.length
      ).toFixed(1)
    : "0.0";
  return (
    <section className="px-14 py-10">
      <div className="flex gap-30 items-start">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-4xl font-bold text-[#0A0A0A]">{course.title}</h1>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-114 object-cover rounded-2xl"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-[#3D3D3D]">
              <div className="flex items-center gap-2">
                <img src={CalendarIcon} alt="calendar icon" />
                <span>{course.durationWeeks} Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={ClockIcon} alt="clock icon" />
                <span>{course.hours} Hours</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <img src={StartIcon} className="w-5 h-5" />
                <span className="font-medium">{avgRating}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-lg px-3 py-2">
                {categoryIcons[course.category.name] && (
                  <img
                    src={categoryIcons[course.category.name]}
                    className="w-6 h-6"
                  />
                )}
                <span className="text-[16px] text-[#666666]">
                  {course.category.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-[#FFFFFF] gap-3 border-none rounded-xl px-4 py-2 w-fit">
            <img
              src={course.instructor.avatar}
              className="w-8 h-8 rounded-sm object-cover"
            />
            <span className="text-[#3D3D3D]">{course.instructor.name}</span>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-[#8A8A8A]">
              Course Description
            </h2>
            <p className="text-[#3D3D3D] leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        <div className="w-133  h-180">
          <EnrollmentCard courseId={Number(id)} basePrice={course.basePrice} />
        </div>
      </div>
    </section>
  );
};

export default InsideCoursePage;
