import { useEffect, useState } from "react";
import FeaturedCard from "../../ui/featured-card/FeaturedCard";
import { getFeaturedCourses } from "../../../api/courses";
import type { FeaturedCourse } from "../../../types";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<FeaturedCourse[]>([]);
  useEffect(() => {
    const fetchedFeaturedCourses = async () => {
      const data = await getFeaturedCourses();
      setCourses(data);
    };
    fetchedFeaturedCourses();
  }, []);

  return (
    <section className="w-full px-14 py-10 flex items-center justify-center gap-6">
      {courses.map((course) => (
        <FeaturedCard
          title={course.title}
          description={course.description}
          instructor={course.instructor}
          avgRating={course.avgRating}
          basePrice={course.basePrice}
          image={course.image}
          key={course.id}
        />
      ))}
    </section>
  );
};

export default FeaturedCourses;
