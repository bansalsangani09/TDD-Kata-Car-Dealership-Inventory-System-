import { useState, useEffect } from "react";
import { VEHICLE_CATEGORIES } from "../utils/constants";

const VehicleForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        make: initialData.make || "",
        model: initialData.model || "",
        category: initialData.category || "",
        price: initialData.price?.toString() || "",
        quantity: initialData.quantity?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      make: formData.make.trim(),
      model: formData.model.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
    });
  };

  const handleReset = () => {
    if (initialData) {
      setFormData({
        make: initialData.make || "",
        model: initialData.model || "",
        category: initialData.category || "",
        price: initialData.price?.toString() || "",
        quantity: initialData.quantity?.toString() || "",
      });
    } else {
      setFormData({ make: "", model: "", category: "", price: "", quantity: "" });
    }
  };

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Make */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Make
          </label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g. Toyota"
            required
            className={inputClasses}
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Camry"
            required
            className={inputClasses}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputClasses}
          >
            <option value="">Select category</option>
            {VEHICLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="25000"
            min="0"
            step="0.01"
            required
            className={inputClasses}
          />
        </div>

        {/* Quantity */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="10"
            min="0"
            required
            className={inputClasses}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-300 transition-all cursor-pointer"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {isEditing ? "Updating..." : "Creating..."}
            </span>
          ) : isEditing ? (
            "Update Vehicle"
          ) : (
            "Add Vehicle"
          )}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
