import { useState } from "react";
import ArrowDownIcon from "../../../assets/glyphs_arrow-bold.svg";
import { sortOptions } from "../../../constants/filterConstants";
import type { UpperCatalogProps } from "../../../types";

const UpperCatalog = ({
  total,
  perPage,
  currentPage,
  activeSort,
  setActiveSort,
}: UpperCatalogProps) => {
  const showing = Math.min(perPage * currentPage, total);
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    sortOptions.find((o) => o.value === activeSort)?.label ?? "Newest First";
  return (
    <div className="flex items-center justify-between">
      <p className="text-[#666666]">
        Showing <span>{showing}</span> out of <span>{total}</span>
      </p>
      <div className="relative">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#FFFFFF] w-60 h-12 flex items-center justify-center rounded-[10px] border border-[#F5F5F5] cursor-pointer"
        >
          <p className="text-[#666666]">
            Sort By: <span className="text-[#4F46E5]">{selectedLabel}</span>
          </p>
          <img src={ArrowDownIcon} alt="arrow down icon" className="ml-2" />
        </div>
        {isOpen && (
          <div className="absolute top-14 right-0 bg-white rounded-xl border border-[#F5F5F5] shadow-md w-60 z-10 overflow-hidden">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setActiveSort(option.value);
                  setIsOpen(false);
                }}
                className={`h-11 flex items-center px-4 cursor-pointer hover:bg-gray-50 text-sm
                  ${activeSort === option.value ? "text-[#4F46E5]" : "text-[#666666]"}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpperCatalog;
