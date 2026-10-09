import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlantViewer3D } from '../3d/PlantViewer3D';
import {
  Calendar,
  Sprout,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
  BarChart2
} from 'lucide-react';

export const SeedingLifecycleSection: React.FC = () => {
  const { activeCycle, updateSeedingDate, landDetails } = useApp();

  const [inputDate, setInputDate] = useState<string>(activeCycle.seedingDate);
  const [selectedCrop, setSelectedCrop] = useState<string>(activeCycle.crop);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSeedingUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeedingDate(inputDate, selectedCrop);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-black p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Yielding & Seeding Lifecycle Manager</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Crop Seeding Date & Growth Stage Monitor</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Record the exact date when seeds are feeded into the field. The AI system automatically tracks development stages, projects harvest timelines, and updates your yield report.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seeding Input Logger */}
        <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>Log Seed Feeding Date</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Updates your active crop cycle and report page automatically.
            </p>

            <form onSubmit={handleSeedingUpdate} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Select Crop Seeded</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-emerald-400"
                >
                  <option value="Wheat">Wheat (Rabi Grain)</option>
                  <option value="Corn / Maize">Corn / Maize (Kharif)</option>
                  <option value="Onion">Onion (Bulb Crop)</option>
                  <option value="Tomato">Tomato (Horticulture)</option>
                  <option value="Rice">Rice (Paddy)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Date Seeds Planted</label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Land Area:</span>
                  <span className="font-bold text-emerald-300">{landDetails.areaAcres} Acres</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>Est. Harvest Date:</span>
                  <span className="font-bold text-amber-300">{activeCycle.expectedHarvestDate}</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>Target Tonnage:</span>
                  <span className="font-bold text-emerald-400">{(activeCycle.targetYieldKg / 1000).toFixed(1)} Tons ({activeCycle.targetYieldKg} kg)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Seeding & Lifecycle</span>
              </button>

              {isSaved && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center space-x-2 border border-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Report updated with new seeding date!</span>
                </div>
              )}
            </form>
          </div>

          {/* 3D Animated Plant Canvas Visualizer */}
          <div>
            <h4 className="text-xs font-semibold text-gray-300 mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>3D Live Digital Twin Simulation</span>
            </h4>
            <PlantViewer3D selectedCrop={activeCycle.crop} growthStage={activeCycle.currentStage} />
          </div>
        </div>

        {/* Growth Stage Progress Timeline */}
        <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span>Growth Stage Progress Timeline ({activeCycle.crop})</span>
                </h3>
                <p className="text-xs text-gray-400">Current Stage: <b className="text-emerald-300">{activeCycle.currentStage}</b></p>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">
                Seeding Date: {activeCycle.seedingDate}
              </span>
            </div>

            {/* Stages Vertical / Horizontal Stepper */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-500/30">
              {activeCycle.stages.map((stg, index) => {
                const isCurrent = stg.stage === activeCycle.currentStage;
                return (
                  <div key={stg.stage} className="relative flex items-start space-x-4 group">
                    {/* Stage Bullet */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        stg.completed
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : isCurrent
                          ? 'bg-amber-400 border-amber-300 text-black animate-pulse shadow-lg shadow-amber-400/50'
                          : 'bg-black border-gray-700 text-gray-600'
                      }`}
                    >
                      {stg.completed ? (
                        <CheckCircle2 className="w-3 h-3 text-black font-extrabold" />
                      ) : (
                        <span className="text-[10px] font-bold">{index + 1}</span>
                      )}
                    </div>

                    <div
                      className={`w-full p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-emerald-950/80 via-black to-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/10'
                          : stg.completed
                          ? 'bg-black/50 border-emerald-500/30'
                          : 'bg-black/30 border-gray-800 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                          <span>{stg.stage}</span>
                          {isCurrent && (
                            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                              Active Stage Now
                            </span>
                          )}
                        </h4>

                        <span className="text-[11px] text-gray-400 font-mono">
                          {stg.startDate} → {stg.expectedEndDate}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300">{stg.notes}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
