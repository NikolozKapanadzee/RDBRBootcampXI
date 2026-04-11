import { useState, useEffect } from "react";
import { getCourses } from "../api/courses";

export const useFilterOptions = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCourses({ page: 1 });
      setCategories([
        ...new Map(
          data.data.map((c: any) => [c.category.id, c.category]),
        ).values(),
      ]);
      setTopics([
        ...new Map(data.data.map((c: any) => [c.topic.id, c.topic])).values(),
      ]);
      setInstructors([
        ...new Map(
          data.data.map((c: any) => [c.instructor.id, c.instructor]),
        ).values(),
      ]);
    };
    fetch();
  }, []);
  return { categories, topics, instructors };
};
