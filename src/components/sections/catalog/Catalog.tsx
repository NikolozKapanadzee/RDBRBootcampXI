import { useEffect, useState } from "react";
import { getCourses } from "../../../api/courses";
import Card from "../../ui/card/Card";
import { categoryIcons } from "../../../constants/categoryIcons";
import UpperCatalog from "../../ui/upper-catalog/UpperCatalog";

interface CatalogProps {
  activeCategories: number[];
  activeTopics: number[];
  activeInstructors: number[];
  activeSort: string;
  setActiveSort: (sort: string) => void;
}
const Catalog = ({
  activeCategories,
  activeTopics,
  activeInstructors,
  activeSort,
  setActiveSort,
}: CatalogProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetch = async () => {
      const data = await getCourses({
        page: currentPage,
        categories: activeCategories,
        topics: activeTopics,
        instructors: activeInstructors,
        sort: activeSort,
      });
      setCourses(data.data);
      setMeta(data.meta);
    };
    fetch();
  }, [
    currentPage,
    activeCategories,
    activeTopics,
    activeInstructors,
    activeSort,
  ]);
  return (
    <div className="flex flex-col gap-6">
      <UpperCatalog
        total={meta.total}
        perPage={meta.perPage}
        currentPage={currentPage}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
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
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 rounded border text-sm disabled:opacity-40 cursor-pointer text-[#4F46E5]"
        >
          ‹
        </button>
        {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`h-10 w-10 rounded border text-sm cursor-pointer ${
              page === currentPage
                ? "bg-[#281ED2] text-white border-[#4F46E5]"
                : "text-[#4F46E5] border-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === meta.lastPage}
          className="h-10 w-10 rounded border text-sm disabled:opacity-40 cursor-pointer text-[#4F46E5]"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Catalog;
