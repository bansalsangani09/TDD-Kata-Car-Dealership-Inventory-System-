import { useState } from "react";
import { VEHICLE_CATEGORIES } from "../utils/constants";

const Filter = ({ onFilter, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const cleaned = {};
    if (filters.category) cleaned.category = filters.category;
    if (filters.minPrice) cleaned.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) cleaned.maxPrice = Number(filters.maxPrice);
    onFilter(cleaned);
  };

  const handleReset = () => {
    setFilters({ category: "", minPrice: "", maxPrice: "" });
    onReset();
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
          activeCount > 0
            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
            : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600 hover:text-slate-300"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 w-72 p-4 rounded-xl bg-slate-800 border border-slate-700/50 shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">
              Filter Vehicles
            </h3>

            <div className="space-y-3">
              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                >
                  <option value="">All Categories</option>
                  {VEHICLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                    placeholder="$0"
                    min="0"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    placeholder="$∞"
                    min="0"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-700/50">
              <button
                onClick={handleReset}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900 transition-all cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  handleApply();
                  setIsOpen(false);
                }}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
