import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SoilTestReport, CropRecommendation } from '../../types';
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  TrendingUp,
  Droplets,
  Zap,
  ArrowRight
} from 'lucide-react';

export const SoilTestSection: React.FC = () => {
  const { soilReport, saveSoilReport, updateSeedingDate } = useApp();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [showManualForm, setShowManualForm] = useState<boolean>(false);

  // Manual Soil Entry Form State
  const [nitrogen, setNitrogen] = useState<number>(210);
  const [phosphorus, setPhosphorus] = useState<number>(42);
  const [potassium, setPotassium] = useState<number>(195);
  const [ph, setPh] = useState<number>(6.8);
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.72);
  const [moisture, setMoisture] = useState<number>(28);
  const [soilType, setSoilType] = useState<SoilTestReport['soilType']>('Loamy');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
        saveSoilReport({
          labName: `Scanned: ${file.name}`,
          reportDate: new Date().toISOString().split('T')[0]
        });
        setTimeout(() => setUploadSuccess(false), 4000);
      }, 1500);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      saveSoilReport({
        nitrogen,
        phosphorus,
        potassium,
        ph,
        organicCarbon,
        moisture,
        soilType,
        labName: 'Manual Soil Lab Entry'
      });
      setShowManualForm(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-black p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>AI Soil Analyzer & Crop Selector</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Soil Test Report Upload & AI Recommendations</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Upload your laboratory soil test report or enter soil N-P-K metrics. Our AI analyzes soil composition and computes optimal crop seeding recommendations with expected yield.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all flex items-center space-x-2"
          >
            <FlaskConical className="w-4 h-4" />
            <span>{showManualForm ? 'Hide Form' : 'Manual Entry'}</span>
          </button>
        </div>
      </div>

      {/* Soil Report File Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
              <UploadCloud className="w-5 h-5 text-emerald-400" />
              <span>Upload Soil Report</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Supported formats: PDF, JPG, PNG (Scan of N-P-K, pH lab document)
            </p>

            <div className="relative border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-2xl p-6 text-center transition-all bg-emerald-950/20 group cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-300">
                  {isUploading ? 'Analyzing Soil Report...' : 'Click or Drag PDF/Image Here'}
                </span>
                <span className="text-[11px] text-gray-400">AI auto-extracts Nitrogen, Phosphorus, Potassium & pH</span>
              </div>
            </div>

            {uploadSuccess && (
              <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Soil Report successfully scanned & AI Recommendations updated!</span>
              </div>
            )}
          </div>

          {/* Current Active Soil Parameters Summary */}
          {soilReport && (
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-xs font-semibold text-gray-300 mb-3 flex items-center justify-between">
                <span>Active Soil Metrics</span>
                <span className="text-[11px] text-emerald-400 font-normal">{soilReport.labName}</span>
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">Nitrogen (N)</span>
                  <span className="font-bold text-emerald-300">{soilReport.nitrogen} <span className="text-[9px]">kg/ha</span></span>
                </div>
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">Phosphorus (P)</span>
                  <span className="font-bold text-amber-300">{soilReport.phosphorus} <span className="text-[9px]">kg/ha</span></span>
                </div>
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">Potassium (K)</span>
                  <span className="font-bold text-cyan-300">{soilReport.potassium} <span className="text-[9px]">kg/ha</span></span>
                </div>
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">pH Level</span>
                  <span className="font-bold text-emerald-300">{soilReport.ph}</span>
                </div>
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">Organic Carbon</span>
                  <span className="font-bold text-emerald-300">{soilReport.organicCarbon}%</span>
                </div>
                <div className="bg-emerald-950/50 p-2 rounded-xl border border-emerald-500/20">
                  <span className="text-[10px] text-gray-400 block">Soil Type</span>
                  <span className="font-bold text-emerald-300">{soilReport.soilType}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Recommended Crops Display */}
        <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>AI Recommended Crops to Seed</span>
              </h3>
              <p className="text-xs text-gray-400">
                Calculated based on N-P-K balance, pH {soilReport?.ph}, and moisture level ({soilReport?.moisture}%).
              </p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-semibold">
              Top 3 Matches
            </span>
          </div>

          <div className="space-y-4">
            {soilReport?.recommendations?.map((rec, index) => (
              <div
                key={rec.crop}
                className="bg-gradient-to-r from-emerald-950/60 via-black to-emerald-950/30 p-5 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center font-extrabold text-emerald-400 text-lg border border-emerald-500/30">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {rec.crop}
                        </h4>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          {rec.suitabilityScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">
                        Season: <b>{rec.season}</b> • Water: <b>{rec.waterRequirement}</b>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block uppercase">Est. Yield / Acre</span>
                      <span className="text-sm font-bold text-emerald-400">{rec.expectedYieldPerAcre}</span>
                    </div>
                    <div className="text-right pl-3 border-l border-gray-800">
                      <span className="text-[10px] text-gray-400 block uppercase">Profit Potential</span>
                      <span className="text-sm font-bold text-amber-400">{rec.estimatedProfitPerAcre}</span>
                    </div>
                    <button
                      onClick={() => updateSeedingDate(new Date().toISOString().split('T')[0], rec.crop)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center space-x-1 shadow-lg shadow-emerald-500/20"
                      title="Select this crop to seed in your field"
                    >
                      <span>Seed This</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-800/80 text-xs text-emerald-200 flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span><b>Soil Treatment:</b> {rec.soilAmendment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Entry Modal / Drawer Form */}
      {showManualForm && (
        <div className="bg-agro-card p-6 rounded-3xl border border-emerald-500/30 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <span>Manual Soil Test Data Input</span>
          </h3>

          <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">Nitrogen (N) kg/ha</label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(Number(e.target.value))}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">Phosphorus (P) kg/ha</label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(Number(e.target.value))}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">Potassium (K) kg/ha</label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(Number(e.target.value))}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">pH Level (0-14)</label>
              <input
                type="number"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">Organic Carbon (%)</label>
              <input
                type="number"
                step="0.01"
                value={organicCarbon}
                onChange={(e) => setOrganicCarbon(Number(e.target.value))}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold block mb-1">Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Loamy">Loamy Soil</option>
                <option value="Clay">Clay Soil</option>
                <option value="Sandy">Sandy Soil</option>
                <option value="Black Soil">Black Soil</option>
                <option value="Red Soil">Red Soil</option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end space-x-3 mt-2">
              <button
                type="button"
                onClick={() => setShowManualForm(false)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                Analyze & Generate Recommendations
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
