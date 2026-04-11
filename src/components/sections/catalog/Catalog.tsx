import { useEffect, useState } from "react";
import { getCourses } from "../../../api/courses";
import Card from "../../ui/card/Card";

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
    <section>
      {courses.map((course) => (
        <Card
          key={course.id}
          image={course.image}
          instructor={course.instructor.name}
          duration={course.durationWeeks}
          rating={course.avgRating}
          title={course.title}
          category={course.category.name}
          categoryIcon={course.category.icon}
          price={course.basePrice}
        />
      ))}
    </section>
  );
};

export default Catalog;
