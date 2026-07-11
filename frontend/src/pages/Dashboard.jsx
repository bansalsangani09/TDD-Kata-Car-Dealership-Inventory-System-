import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getAllVehicles, searchVehicles, purchaseVehicle } from "../api/vehicleApi";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { getErrorMessage } from "../utils/helpers";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const filters = { ...activeFilters };
      if (searchQuery) {
        filters.make = searchQuery;
        filters.model = searchQuery;
      }

      let res;
      if (Object.keys(filters).length > 0) {
        res = await searchVehicles(filters);
      } else {
        res = await getAllVehicles();
      }
      setVehicles(res.data.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [activeFilters, searchQuery]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handlePurchase = async (vehicleId) => {
    setPurchasingId(vehicleId);
    try {
      const res = await purchaseVehicle(vehicleId);
      const updated = res.data.data;

      // Optimistically update the UI
      setVehicles((prev) =>
        prev.map((v) =>
          (v.id || v._id) === vehicleId
            ? { ...v, quantity: updated.quantity }
            : v
        )
      );

      toast.success("Vehicle purchased successfully!");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setPurchasingId(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters) => {
    setActiveFilters(filters);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Vehicle Inventory
        </h1>
        <p className="text-slate-400">
          Browse our collection and find your perfect vehicle
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} onReset={handleResetFilters} />
      </div>

      {/* Content */}
      {loading ? (
        <Loading message="Loading vehicles..." />
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-1">
            No vehicles found
          </h3>
          <p className="text-sm text-slate-500">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500">
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} found
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id || vehicle._id}
                vehicle={vehicle}
                onPurchase={handlePurchase}
                isPurchasing={purchasingId === (vehicle.id || vehicle._id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
