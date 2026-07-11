import { useState } from "react";
import { formatCurrency } from "../utils/helpers";

const VehicleCard = ({ vehicle, onPurchase, isPurchasing }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = vehicle.quantity <= 0;

  // Deterministic gradient based on category
  const gradients = {
    Sedan: "from-blue-500/20 to-cyan-500/20",
    SUV: "from-emerald-500/20 to-teal-500/20",
    Truck: "from-amber-500/20 to-orange-500/20",
    Coupe: "from-rose-500/20 to-pink-500/20",
    Hatchback: "from-violet-500/20 to-purple-500/20",
    Convertible: "from-yellow-500/20 to-amber-500/20",
    Van: "from-slate-500/20 to-gray-500/20",
    Wagon: "from-lime-500/20 to-green-500/20",
    Electric: "from-cyan-500/20 to-blue-500/20",
    Hybrid: "from-teal-500/20 to-emerald-500/20",
  };

  const categoryColors = {
    Sedan: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    SUV: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Truck: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Coupe: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    Hatchback: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    Convertible: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Van: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    Wagon: "text-lime-400 bg-lime-500/10 border-lime-500/20",
    Electric: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    Hybrid: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  };

  const gradient = gradients[vehicle.category] || "from-slate-500/20 to-gray-500/20";
  const categoryColor = categoryColors[vehicle.category] || "text-slate-400 bg-slate-500/10 border-slate-500/20";

  return (
    <div
      className={`group relative rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
        isHovered ? "border-slate-600/80 shadow-xl shadow-black/20 -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {vehicle.make}
            </h3>
            <p className="text-sm text-slate-400">{vehicle.model}</p>
          </div>
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider border ${categoryColor}`}
          >
            {vehicle.category}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {formatCurrency(vehicle.price)}
          </span>
        </div>

        {/* Stock info */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-slate-900/50">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
            In Stock
          </span>
          <span
            className={`text-sm font-bold ${
              isOutOfStock
                ? "text-red-400"
                : vehicle.quantity <= 3
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `${vehicle.quantity} units`}
          </span>
        </div>

        {/* Purchase Button */}
        <button
          onClick={() => onPurchase(vehicle.id || vehicle._id)}
          disabled={isOutOfStock || isPurchasing}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            isOutOfStock
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : isPurchasing
              ? "bg-cyan-500/20 text-cyan-400 cursor-wait"
              : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-[0.98]"
          }`}
        >
          {isPurchasing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : isOutOfStock ? (
            "Out of Stock"
          ) : (
            "Purchase"
          )}
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
