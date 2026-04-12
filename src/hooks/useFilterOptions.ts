import { useState, useEffect } from "react";
import { getAllCourses } from "../api/courses";

export const useFilterOptions = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const allCourses = await getAllCourses();
      setCategories([
        ...new Map(
          allCourses.map((c: any) => [c.category.id, c.category]),
        ).values(),
      ]);
      setTopics([
        ...new Map(allCourses.map((c: any) => [c.topic.id, c.topic])).values(),
      ]);
      setInstructors([
        ...new Map(
          allCourses.map((c: any) => [c.instructor.id, c.instructor]),
        ).values(),
      ]);
    };
    fetch();
  }, []);

  return { categories, topics, instructors };
};
