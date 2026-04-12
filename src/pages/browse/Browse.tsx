import { useState } from "react";
import Catalog from "../../components/sections/catalog/Catalog";
import LeftNavBar from "../../components/sections/left-navbar/FilterSidebar";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";

const Browse = () => {
  const [activeCategories, setActiveCategories] = useState<number[]>([]);
  const [activeTopics, setActiveTopics] = useState<number[]>([]);
  const [activeInstructors, setActiveInstructors] = useState<number[]>([]);
  const [activeSort, setActiveSort] = useState("newest");
  return (
    <div className="px-14 py-10">
      <Breadcrumb />
      <div className="flex gap-10 mt-6 items-start">
        <div className="w-77 ">
          <LeftNavBar
            activeCategories={activeCategories}
            activeTopics={activeTopics}
            activeInstructors={activeInstructors}
            setActiveCategories={setActiveCategories}
            setActiveTopics={setActiveTopics}
            setActiveInstructors={setActiveInstructors}
          />
        </div>
        <div className="flex-1">
          <Catalog
            activeCategories={activeCategories}
            activeTopics={activeTopics}
            activeInstructors={activeInstructors}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
        </div>
      </div>
    </div>
  );
};

export default Browse;
