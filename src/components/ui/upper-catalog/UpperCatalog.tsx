import ArrowDownIcon from "../../../assets/glyphs_arrow-bold.svg";
import type { UpperCatalogProps } from "../../../types";
const UpperCatalog = ({ total, perPage, currentPage }: UpperCatalogProps) => {
  const showing = Math.min(perPage * currentPage, total);
  return (
    <div className="flex items-center justify-between">
      <p className="text-[#666666]">
        Showing <span className="text-[#666666]">{showing}</span> out of{" "}
        <span className="text-[#666666]">{total}</span>
      </p>
      <div className="bg-[#FFFFFF] w-53 h-12 flex items-center justify-center rounded-[10px] border border-[#F5F5F5] cursor-pointer">
        <p className="text-[#666666]">
          Sort By: <span className="text-[#4F46E5]">Newest First</span>
        </p>
        <img src={ArrowDownIcon} alt="arrow down icon" className="ml-2" />
      </div>
    </div>
  );
};

export default UpperCatalog;
