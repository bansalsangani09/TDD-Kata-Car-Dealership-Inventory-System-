import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  restockVehicle,
} from "../api/vehicleApi";
import VehicleForm from "../components/VehicleForm";
import Loading from "../components/Loading";
import { formatCurrency, getErrorMessage } from "../utils/helpers";

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [restockData, setRestockData] = useState({ id: null, amount: "" });
  const [deletingId, setDeletingId] = useState(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllVehicles();
      setVehicles(res.data.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // ─── Create / Update ──────────────────────────────────────────────
  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingVehicle) {
        const res = await updateVehicle(
          editingVehicle.id || editingVehicle._id,
          data
        );
        setVehicles((prev) =>
          prev.map((v) =>
            (v.id || v._id) === (editingVehicle.id || editingVehicle._id)
              ? res.data.data
              : v
          )
        );
        toast.success("Vehicle updated successfully");
      } else {
        const res = await createVehicle(data);
        setVehicles((prev) => [res.data.data, ...prev]);
        toast.success("Vehicle added successfully");
      }
      setShowForm(false);
      setEditingVehicle(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    setDeletingId(id);
    try {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => (v.id || v._id) !== id));
      toast.success("Vehicle deleted successfully");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Restock ───────────────────────────────────────────────────────
  const handleRestock = async (id) => {
    const amount = parseInt(restockData.amount, 10);
    if (!amount || amount <= 0) {
      toast.error("Enter a valid restock amount");
      return;
    }
    try {
      const res = await restockVehicle(id, amount);
      setVehicles((prev) =>
        prev.map((v) =>
          (v.id || v._id) === id ? { ...v, quantity: res.data.data.quantity } : v
        )
      );
      toast.success(`Restocked ${amount} units`);
      setRestockData({ id: null, amount: "" });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const startEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">
            Manage your vehicle inventory
          </p>
        </div>
        <button
          onClick={() => {
            setEditingVehicle(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Vehicle
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 sm:p-6 pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button
                onClick={cancelForm}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <VehicleForm
                onSubmit={handleSubmit}
                initialData={editingVehicle}
                isLoading={formLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <Loading message="Loading inventory..." />
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-1">
            No vehicles in inventory
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Add your first vehicle to get started
          </p>
          <button
            onClick={() => {
              setEditingVehicle(null);
              setShowForm(true);
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Add Vehicle
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile view cards (stacked on mobile) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {vehicles.map((vehicle) => {
              const vid = vehicle.id || vehicle._id;
              return (
                <div
                  key={vid}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/60 transition-all duration-200 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {vehicle.make}
                      </p>
                      <p className="text-xs text-slate-500">
                        {vehicle.model}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                      {vehicle.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-t border-b border-slate-800/60">
                    <div>
                      <span className="text-slate-500 block mb-0.5">Price</span>
                      <span className="text-sm font-bold text-slate-200">
                        {formatCurrency(vehicle.price)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-0.5">Stock</span>
                      <span
                        className={`text-sm font-bold ${
                          vehicle.quantity <= 0
                            ? "text-red-400"
                            : vehicle.quantity <= 3
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {vehicle.quantity}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    {/* Restock */}
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={
                          restockData.id === vid ? restockData.amount : ""
                        }
                        onChange={(e) =>
                          setRestockData({
                            id: vid,
                            amount: e.target.value,
                          })
                        }
                        className="w-14 px-2 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      />
                      <button
                        onClick={() => handleRestock(vid)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all cursor-pointer"
                      >
                        Restock
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(vehicle)}
                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(vid)}
                        disabled={deletingId === vid}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 cursor-pointer"
                        title="Delete"
                      >
                        {deletingId === vid ? (
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop/Tablet view table */}
          <div className="hidden md:block rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/60">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Restock
                    </th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {vehicles.map((vehicle) => {
                    const vid = vehicle.id || vehicle._id;
                    return (
                      <tr
                        key={vid}
                        className="bg-slate-900/20 hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {vehicle.make}
                            </p>
                            <p className="text-xs text-slate-500">
                              {vehicle.model}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                            {vehicle.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-slate-200">
                            {formatCurrency(vehicle.price)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-sm font-bold ${
                              vehicle.quantity <= 0
                                ? "text-red-400"
                                : vehicle.quantity <= 3
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {vehicle.quantity}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              placeholder="Qty"
                              value={
                                restockData.id === vid ? restockData.amount : ""
                              }
                              onChange={(e) =>
                                setRestockData({
                                  id: vid,
                                  amount: e.target.value,
                                })
                              }
                              className="w-16 px-2 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            />
                            <button
                              onClick={() => handleRestock(vid)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all cursor-pointer"
                            >
                              Restock
                            </button>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEdit(vehicle)}
                              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(vid)}
                              disabled={deletingId === vid}
                              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 cursor-pointer"
                              title="Delete"
                            >
                              {deletingId === vid ? (
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
