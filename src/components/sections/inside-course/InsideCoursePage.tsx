import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../../api/courses";

const InsideCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCourseById(Number(id));
      setCourse(data);
    };
    fetch();
  }, [id]);
  if (!course) return <div className="p-8">Course not found</div>;

  return (
    <div>
      <h1>{course.title}</h1>
    </div>
  );
};

export default InsideCoursePage;
