import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Sprout,
  FlaskConical,
  Layers,
  CloudSun,
  Activity,
  ShoppingBag,
  CheckCircle2,
  DollarSign,
  Award
} from 'lucide-react';

export const ComprehensiveReportSection: React.FC = () => {
  const {
    soilReport,
    landDetails,
    weatherData,
    activeCycle,
    diseaseScans,
    orders,
    localMarkets
  } = useApp();

  const handlePrintReport = () => {
    window.print();
  };

  const totalRevenueBooked = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-black p-6 rounded-3xl border border-emerald-500/30 print:hidden">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Master Farm Audit & Lifecycle Report</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Farmer End-to-End Consolidated Report</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Automatically aggregates all your farm records: soil lab test metrics, field land survey details, seeding dates, growth stages, disease logs with natural remedies, and final sales revenue.
          </p>
        </div>

        <button
          onClick={handlePrintReport}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
        >
          <Printer className="w-4 h-4" />
          <span>Export PDF / Print Official Report</span>
        </button>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-[#09140c] p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-400 font-extrabold text-2xl print:bg-emerald-100 print:text-emerald-800">
              <Sprout className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white print:text-black">AGROPULSE PRECISION REPORT</h1>
              <p className="text-xs text-emerald-400 font-semibold print:text-emerald-700">Official Farmer Yield & Compliance Certificate</p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-400 print:text-gray-700">
            <p>Report Ref: <b>CERT-{activeCycle.id}</b></p>
            <p>Generated: <b>{new Date().toISOString().split('T')[0]}</b></p>
            <p>Farmer: <b className="text-white print:text-black">{landDetails.farmerName}</b></p>
          </div>
        </div>

        {/* Section 1: Land & Soil Lab Verification */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2 print:text-emerald-800">
            <Layers className="w-4 h-4" />
            <span>1. Land Boundaries & Soil Test Verification</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Field Name & Survey #</span>
              <span className="font-bold text-white print:text-black">{landDetails.fieldName} ({landDetails.surveyNumber})</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Total Land Area</span>
              <span className="font-bold text-emerald-300 print:text-emerald-800">{landDetails.areaAcres} Acres</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Soil Lab Profile</span>
              <span className="font-bold text-white print:text-black">N:{soilReport?.nitrogen} P:{soilReport?.phosphorus} K:{soilReport?.potassium}</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">pH & Soil Type</span>
              <span className="font-bold text-white print:text-black">pH {soilReport?.ph} ({soilReport?.soilType})</span>
            </div>
          </div>
        </div>

        {/* Section 2: Seeding & Growth Progress */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2 print:text-emerald-800">
            <Sprout className="w-4 h-4" />
            <span>2. Crop Seeding & Lifecycle Timeline</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Active Seeded Crop</span>
              <span className="font-bold text-white print:text-black text-sm">{activeCycle.crop}</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Seed Planted Date</span>
              <span className="font-bold text-amber-300 print:text-amber-800">{activeCycle.seedingDate}</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200">
              <span className="text-gray-400 block text-[10px]">Current Growth Stage</span>
              <span className="font-bold text-emerald-400 print:text-emerald-800">{activeCycle.currentStage}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Disease & Natural Remedy Log */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2 print:text-emerald-800">
            <Activity className="w-4 h-4" />
            <span>3. Disease Diagnostics & Remedial Action Log</span>
          </h3>

          <div className="space-y-2 text-xs">
            {diseaseScans.map((ds) => (
              <div key={ds.id} className="bg-black/50 p-4 rounded-2xl border border-emerald-500/20 print:bg-gray-50 print:border-gray-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-white print:text-black">{ds.diseaseName} ({ds.cropName})</span>
                  <span className="text-emerald-400 print:text-emerald-800">Cured via {ds.naturalRemedy.title}</span>
                </div>
                <p className="text-gray-300 print:text-gray-700">
                  <b>Chemical Action:</b> {ds.chemicalCure.fertilizerName} ({ds.chemicalCure.dosage})
                </p>
                <p className="text-gray-300 print:text-gray-700">
                  <b>DIY Natural Recipe Applied:</b> {ds.naturalRemedy.diyRecipe.recipeName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Harvest Tonnage & Booked Sales Revenue */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2 print:text-emerald-800">
            <ShoppingBag className="w-4 h-4" />
            <span>4. Production Yield & Commercial Orders</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gradient-to-br from-emerald-950/60 to-black p-4 rounded-2xl border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-200">
              <span className="text-gray-400 block text-[10px] uppercase">Final Target Harvest</span>
              <span className="text-xl font-extrabold text-white print:text-black">{activeCycle.targetYieldKg} kg</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/60 to-black p-4 rounded-2xl border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-200">
              <span className="text-gray-400 block text-[10px] uppercase">Active Pre-Orders Booked</span>
              <span className="text-xl font-extrabold text-amber-300 print:text-amber-800">{orders.length} Contracts</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/60 to-black p-4 rounded-2xl border border-emerald-500/30 print:bg-emerald-50 print:border-emerald-200">
              <span className="text-gray-400 block text-[10px] uppercase">Booked Sales Revenue</span>
              <span className="text-xl font-extrabold text-emerald-400 print:text-emerald-800">₹{totalRevenueBooked.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Official Stamp Footer */}
        <div className="pt-6 border-t border-gray-800 flex justify-between items-center text-xs text-gray-400 print:text-gray-700">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Certified by AgroPulse AI Precision Soil & Market System</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-white print:text-black">Authorized Digital Signature</p>
            <p className="text-[10px] text-emerald-400">VERIFIED-AGRO-2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
