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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
    } else {
      setFormData({ make: "", model: "", category: "", price: "", quantity: "" });
    }
    setErrors({});
    setTouched({});
  }, [initialData]);

  const validateField = (name, value) => {
    let error = null;
    if (name === "make") {
      const v = value.trim();
      if (!v) error = "Make is required";
      else if (v.length > 50) error = "Make must be 50 characters or less";
    } else if (name === "model") {
      const v = value.trim();
      if (!v) error = "Model is required";
      else if (v.length > 50) error = "Model must be 50 characters or less";
    } else if (name === "category") {
      if (!value) error = "Category is required";
    } else if (name === "price") {
      const p = parseFloat(value);
      if (value === "" || value === undefined) error = "Price is required";
      else if (isNaN(p) || p <= 0) error = "Price must be a positive number";
      else if (p > 99999999) error = "Price is too high (max $99,999,999)";
    } else if (name === "quantity") {
      const q = parseFloat(value);
      if (value === "" || value === undefined) error = "Quantity is required";
      else if (isNaN(q) || q < 0) error = "Quantity must be non-negative";
      else if (!Number.isInteger(q)) error = "Quantity must be an integer";
      else if (q > 1000000) error = "Quantity is too high (max 1,000,000)";
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name] || errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleIntegerKeyDown = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleNumberKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const allTouched = {};

    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) element.focus();
      return;
    }

    setErrors({});
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
    setErrors({});
    setTouched({});
  };

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all";

  const getFieldClass = (field) => {
    if (errors[field]) {
      return `${inputClasses} border-red-500/60 focus:ring-red-500/30 focus:border-red-500/60 bg-red-950/5`;
    }
    if (touched[field]) {
      return `${inputClasses} border-emerald-500/30 focus:ring-cyan-500/30 focus:border-cyan-500/40 bg-slate-900/30`;
    }
    return `${inputClasses} border-slate-700/50 hover:border-slate-600 focus:ring-cyan-500/30 focus:border-cyan-500/40`;
  };

  const renderError = (field) => {
    if (!errors[field]) return null;
    return (
      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {errors[field]}
      </p>
    );
  };

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
            onBlur={handleBlur}
            placeholder="e.g. Toyota"
            maxLength={50}
            className={getFieldClass("make")}
          />
          {renderError("make")}
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
            onBlur={handleBlur}
            placeholder="e.g. Camry"
            maxLength={50}
            className={getFieldClass("model")}
          />
          {renderError("model")}
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
            onBlur={handleBlur}
            className={getFieldClass("category")}
          >
            <option value="">Select category</option>
            {VEHICLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {renderError("category")}
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
            onBlur={handleBlur}
            onKeyDown={handleNumberKeyDown}
            placeholder="25000"
            min="0"
            step="0.01"
            className={getFieldClass("price")}
          />
          {renderError("price")}
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
            onBlur={handleBlur}
            onKeyDown={handleIntegerKeyDown}
            placeholder="10"
            min="0"
            className={getFieldClass("quantity")}
          />
          {renderError("quantity")}
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
