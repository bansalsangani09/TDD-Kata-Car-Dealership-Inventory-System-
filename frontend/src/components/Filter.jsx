import { useState } from "react";
import { VEHICLE_CATEGORIES } from "../utils/constants";

const Filter = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (cat) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(cat);
      const newCategories = isSelected
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: newCategories };
    });
  };

  const handleApply = () => {
    const cleaned = {};
    if (filters.categories.length > 0) {
      cleaned.category = filters.categories.join(",");
    }
    if (filters.minPrice) cleaned.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) cleaned.maxPrice = Number(filters.maxPrice);
    onFilter(cleaned);
  };

  const handleReset = () => {
    setFilters({ categories: [], minPrice: "", maxPrice: "" });
    onReset();
  };

  const activeCount =
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <div className="w-full p-5 rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="text-sm font-semibold text-slate-200">
            Filter Vehicles
          </h3>
        </div>
        {activeCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
            {activeCount} active
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories Checkbox List */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Categories
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {VEHICLE_CATEGORIES.map((cat) => {
              const isChecked = filters.categories.includes(cat);
              return (
                <label
                  key={cat}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-sm transition-all duration-200 cursor-pointer select-none ${
                    isChecked
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-200 font-medium"
                      : "bg-slate-900/30 border-slate-700/30 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(cat)}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        isChecked
                          ? "bg-purple-500 border-purple-400"
                          : "border-slate-600 bg-slate-900/50"
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handlePriceChange}
                placeholder="$0"
                min="0"
                className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                placeholder="$∞"
                min="0"
                className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700/50">
        <button
          onClick={handleReset}
          className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900 border border-slate-700/30 hover:border-slate-700 transition-all cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
