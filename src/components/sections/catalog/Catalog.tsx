import { useEffect, useState } from "react";
import { getCourses } from "../../../api/courses";
import Card from "../../ui/card/Card";
import { categoryIcons } from "../../../constants/categoryIcons";

const Catalog = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCourses({ page: 1 });
      setCourses(data.data);
    };
    fetch();
  }, []);

  return (
    <section className="grid grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          image={course.image}
          instructor={course.instructor.name}
          duration={course.durationWeeks}
          rating={course.avgRating}
          title={course.title}
          category={course.category.name}
          categoryIcon={categoryIcons[course.category.name]}
          price={course.basePrice}
        />
      ))}
    </section>
  );
};

export default Catalog;
