import { useState } from "react";
import { useFilterOptions } from "../../../hooks/useFilterOptions";
import { categoryIcons } from "../../../constants/categoryIcons";

const FilterSidebar = () => {
  const { categories, topics, instructors } = useFilterOptions();
  const [activeCategories, setActiveCategories] = useState<number[]>([]);
  const [activeTopics, setActiveTopics] = useState<number[]>([]);
  const [activeInstructors, setActiveInstructors] = useState<number[]>([]);

  const toggleCategory = (id: number) =>
    setActiveCategories((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );

  const toggleTopic = (id: number) =>
    setActiveTopics((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );

  const toggleInstructor = (id: number) =>
    setActiveInstructors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );

  const clearAll = () => {
    setActiveCategories([]);
    setActiveTopics([]);
    setActiveInstructors([]);
  };

  const totalActive =
    activeCategories.length + activeTopics.length + activeInstructors.length;

  return (
    <section className="flex flex-col w-full max-w-77 gap-6">
      <div className="flex w-full items-center gap-10">
        <h1 className="text-[#0A0A0A] text-4xl font-bold">Filters</h1>
        <button
          onClick={clearAll}
          className="text-[#8A8A8A] font-medium text-sm cursor-pointer"
        >
          Clear All Filters ×
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">Categories</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors
                ${
                  activeCategories.includes(cat.id)
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                    : "border-gray-200 text-gray-700 bg-white"
                }`}
            >
              {categoryIcons[cat.name] && (
                <img
                  src={categoryIcons[cat.name]}
                  alt={cat.name}
                  className="w-5 h-5"
                />
              )}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">Topics</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic: any) => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors
                ${
                  activeTopics.includes(topic.id)
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                    : "border-gray-200 text-gray-700 bg-white"
                }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">Instructor</p>
        <div className="flex flex-col gap-2">
          {instructors.map((inst: any) => (
            <button
              key={inst.id}
              onClick={() => toggleInstructor(inst.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-sm transition-colors
                ${
                  activeInstructors.includes(inst.id)
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                    : "border-gray-200 text-gray-700 bg-white"
                }`}
            >
              <img
                src={inst.avatar}
                alt={inst.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              {inst.name}
            </button>
          ))}
        </div>
      </div>

      <hr />
      <p className="text-sm text-gray-400">{totalActive} Filters Active</p>
    </section>
  );
};

export default FilterSidebar;
