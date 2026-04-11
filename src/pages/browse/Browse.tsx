import Catalog from "../../components/sections/catalog/Catalog";
import LeftNavBar from "../../components/sections/left-navbar/FilterSidebar";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";

const Browse = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="flex items-center">
        <LeftNavBar />
        <Catalog />
      </div>
    </div>
  );
};

export default Browse;
