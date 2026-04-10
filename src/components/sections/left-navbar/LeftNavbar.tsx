const LeftNavBar = () => {
  return (
    <section>
      <div className="flex items-center gap-10">
        <h1 className="text-[#0A0A0A] text-4xl">Filters</h1>
        <button className="text-[#8A8A8A] font-medium text-sm cursor-pointer">
          Clear All Filters X
        </button>
      </div>
      <div>
        <div className="categories-div"></div>
        <div className="topics-div"></div>
        <div className="instructor-div"></div>
      </div>
      <hr />
      <p>0 active filters</p>
    </section>
  );
};

export default LeftNavBar;
