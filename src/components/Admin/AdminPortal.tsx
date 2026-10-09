import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Sprout,
  Briefcase,
  Globe,
  Sliders,
  Users,
  Layers,
  Activity,
  DollarSign,
  Edit2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Save,
  Check,
  X,
  FileEdit,
  Flame,
  Search
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    setAdminSuperViewRole,
    setRole,
    localMarkets,
    updateMarketPrice,
    orders,
    activeCycle,
    updateFarmerRecord,
    diseaseScans,
    updateDiseaseRecord,
    landDetails
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'farmers' | 'markets' | 'diseases' | 'orders'>('farmers');
  const [editingMarketId, setEditingMarketId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(35);

  // Farmer Edit State
  const [isEditingFarmer, setIsEditingFarmer] = useState<boolean>(false);
  const [editTargetYield, setEditTargetYield] = useState<number>(activeCycle.targetYieldKg);
  const [editAskingPrice, setEditAskingPrice] = useState<number>(activeCycle.askingPricePerKg);

  // Disease Edit State
  const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);
  const [editChemicalName, setEditChemicalName] = useState<string>('');
  const [editDiyRecipeName, setEditDiyRecipeName] = useState<string>('');

  const handleSwitchToPortal = (targetRole: UserRole) => {
    setAdminSuperViewRole(targetRole);
    setRole(targetRole);
  };

  const handleSavePrice = (marketId: string) => {
    updateMarketPrice(marketId, newPrice);
    setEditingMarketId(null);
  };

  const handleSaveFarmerEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerRecord(activeCycle.farmerId, {
      targetYieldKg: editTargetYield,
      askingPricePerKg: editAskingPrice
    });
    setIsEditingFarmer(false);
  };

  const handleSaveDiseaseEdit = (diseaseId: string) => {
    updateDiseaseRecord(diseaseId, {
      chemicalCure: {
        ...diseaseScans[0].chemicalCure,
        fertilizerName: editChemicalName || diseaseScans[0].chemicalCure.fertilizerName
      },
      naturalRemedy: {
        ...diseaseScans[0].naturalRemedy,
        diyRecipe: {
          ...diseaseScans[0].naturalRemedy.diyRecipe,
          recipeName: editDiyRecipeName || diseaseScans[0].naturalRemedy.diyRecipe.recipeName
        }
      }
    });
    setEditingDiseaseId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/80 via-black to-emerald-950/40 p-6 rounded-3xl border border-purple-500/40">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Master System Administration & Supervision</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Full Master Edit & Supervision Control Center</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Edit farmer yields, prices, disease formulas, and order statuses. Jump instantly into Farmer, Business Agent, or Exporters portal views with full super-view permissions.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-purple-500/20 border border-purple-500/40 px-4 py-2 rounded-2xl text-xs text-purple-300 font-extrabold">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Supervise & Edit Master Control Active</span>
        </div>
      </div>

      {/* 1-Click Super View Switches to 3 Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => handleSwitchToPortal('farmer')}
          className="bg-gradient-to-br from-emerald-950/60 via-black to-emerald-950/20 p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sprout className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              Super-View Access
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Farmer Portal View
          </h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Supervise Soil Tests, Seeding Dates, Disease Diagnostics, & Lifecycle Reports.
          </p>
          <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400">
            <span>Enter Farmer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => handleSwitchToPortal('business_agent')}
          className="bg-gradient-to-br from-amber-950/60 via-black to-amber-950/20 p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Briefcase className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
              Super-View Access
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            Business Agent View
          </h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Supervise Seller, Buyer, and Intermediate Broker margin calculations & deals.
          </p>
          <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
            <span>Enter Business Portal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => handleSwitchToPortal('export_marketer')}
          className="bg-gradient-to-br from-cyan-950/60 via-black to-cyan-950/20 p-6 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
              Super-View Access
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            Export Marketer View
          </h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Supervise global export tickers, port demand, & international bulk sourcing contracts.
          </p>
          <div className="flex items-center space-x-1 text-xs font-bold text-cyan-400">
            <span>Enter Exporter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Admin Tabbed Control Panel */}
      <div className="bg-agro-card p-6 rounded-3xl border border-purple-500/30 shadow-xl space-y-6">
        <div className="flex items-center space-x-2 border-b border-gray-800 pb-3 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveAdminTab('farmers')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeAdminTab === 'farmers'
                ? 'bg-purple-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Edit Farmers & Crop Yields
          </button>

          <button
            onClick={() => setActiveAdminTab('markets')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeAdminTab === 'markets'
                ? 'bg-purple-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Override Live Market Prices
          </button>

          <button
            onClick={() => setActiveAdminTab('diseases')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeAdminTab === 'diseases'
                ? 'bg-purple-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Edit Disease AI Formulas & DIY Recipes
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeAdminTab === 'orders'
                ? 'bg-purple-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Supervise Pre-Orders ({orders.length})
          </button>
        </div>

        {/* Tab 1: Edit Farmers & Yields */}
        {activeAdminTab === 'farmers' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Supervise & Edit Registered Farmer Accounts</span>
            </h4>

            <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-base">{landDetails.farmerName}</h5>
                  <p className="text-gray-400">{landDetails.location.district} • {landDetails.fieldName} ({landDetails.areaAcres} Acres)</p>
                </div>
                <button
                  onClick={() => setIsEditingFarmer(!isEditingFarmer)}
                  className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center space-x-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingFarmer ? 'Cancel Edit' : 'Edit Farmer Metrics'}</span>
                </button>
              </div>

              {isEditingFarmer ? (
                <form onSubmit={handleSaveFarmerEdit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-800">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Target Yield (kg)</label>
                    <input
                      type="number"
                      step="500"
                      value={editTargetYield}
                      onChange={(e) => setEditTargetYield(Number(e.target.value))}
                      className="w-full bg-black border border-purple-500/50 rounded-xl p-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Asking Price (₹/kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editAskingPrice}
                      onChange={(e) => setEditAskingPrice(Number(e.target.value))}
                      className="w-full bg-black border border-purple-500/50 rounded-xl p-2 text-white font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-500 text-black font-extrabold text-xs hover:bg-purple-400 flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Farmer Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-purple-950/20 p-3 rounded-xl border border-purple-500/20 text-gray-300">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Active Crop</span>
                    <span className="font-bold text-white">{activeCycle.crop}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Target Tonnage</span>
                    <span className="font-bold text-amber-300">{activeCycle.targetYieldKg} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Asking Price</span>
                    <span className="font-bold text-emerald-400">₹{activeCycle.askingPricePerKg}/kg</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Override Live Market Prices */}
        {activeAdminTab === 'markets' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Admin Live Market Price Override Controller</span>
            </h4>

            <div className="space-y-3">
              {localMarkets.map((mkt) => (
                <div key={mkt.id} className="p-4 rounded-2xl bg-black/50 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-white">{mkt.marketName}</h5>
                    <p className="text-gray-400 text-[11px]">{mkt.crop} • {mkt.location}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {editingMarketId === mkt.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          step="0.5"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-24 bg-black border border-purple-500/50 rounded-xl p-1.5 text-white text-xs font-bold"
                        />
                        <button
                          onClick={() => handleSavePrice(mkt.id)}
                          className="px-3 py-1.5 rounded-xl bg-purple-500 text-black font-bold text-xs hover:bg-purple-400"
                        >
                          Save Rate
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block">Current Mandi Rate</span>
                          <span className="font-extrabold text-white text-sm">₹{mkt.currentPricePerKg.toFixed(2)} / kg</span>
                        </div>

                        <button
                          onClick={() => {
                            setEditingMarketId(mkt.id);
                            setNewPrice(mkt.currentPricePerKg);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center space-x-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Override</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Edit Disease AI Formulas */}
        {activeAdminTab === 'diseases' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Supervise & Edit AI Disease Database Rules</span>
            </h4>

            {diseaseScans.map((ds) => (
              <div key={ds.id} className="p-4 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white text-sm">{ds.diseaseName} ({ds.cropName})</span>
                  <button
                    onClick={() => {
                      setEditingDiseaseId(editingDiseaseId === ds.id ? null : ds.id);
                      setEditChemicalName(ds.chemicalCure.fertilizerName);
                      setEditDiyRecipeName(ds.naturalRemedy.diyRecipe.recipeName);
                    }}
                    className="px-3 py-1 rounded-xl bg-purple-900/60 text-purple-300 border border-purple-500/30 font-bold"
                  >
                    {editingDiseaseId === ds.id ? 'Cancel' : 'Edit Formula'}
                  </button>
                </div>

                {editingDiseaseId === ds.id ? (
                  <div className="space-y-3 pt-2 border-t border-gray-800">
                    <div>
                      <label className="text-gray-300 font-semibold block mb-1">Chemical Treatment Name</label>
                      <input
                        type="text"
                        value={editChemicalName}
                        onChange={(e) => setEditChemicalName(e.target.value)}
                        className="w-full bg-black border border-purple-500/50 rounded-xl p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 font-semibold block mb-1">DIY Natural Recipe Title</label>
                      <input
                        type="text"
                        value={editDiyRecipeName}
                        onChange={(e) => setEditDiyRecipeName(e.target.value)}
                        className="w-full bg-black border border-purple-500/50 rounded-xl p-2 text-white"
                      />
                    </div>
                    <button
                      onClick={() => handleSaveDiseaseEdit(ds.id)}
                      className="px-4 py-2 rounded-xl bg-purple-500 text-black font-extrabold text-xs"
                    >
                      Save Disease Formula
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-gray-300">
                    <p><b>Chemical Cure:</b> {ds.chemicalCure.fertilizerName} ({ds.chemicalCure.dosage})</p>
                    <p><b>DIY Natural Recipe:</b> {ds.naturalRemedy.diyRecipe.recipeName}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Supervise Orders */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Supervise & Approve Commercial Pre-Orders</span>
            </h4>

            <div className="space-y-2 text-xs">
              {orders.map((ord) => (
                <div key={ord.id} className="p-3.5 rounded-2xl bg-black/50 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-white">{ord.crop} ({ord.quantityKg} kg)</span>
                    <span className="text-gray-400 block text-[11px]">Buyer: {ord.buyerName} • Type: {ord.marketType}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-extrabold text-emerald-400">₹{ord.totalPrice.toLocaleString()}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
