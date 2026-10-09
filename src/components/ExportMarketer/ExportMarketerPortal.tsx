import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExportMarketItem } from '../../types';
import { PriceStockChart } from '../Charts/PriceStockChart';
import { TradeContactModal } from '../Trade/TradeContactModal';
import {
  Globe,
  TrendingUp,
  Ship,
  MapPin,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Flame,
  Package,
  Layers,
  PhoneCall,
  MessageSquare,
  Mail,
  FileText
} from 'lucide-react';

export const ExportMarketerPortal: React.FC = () => {
  const {
    exportMarkets,
    activeCycle,
    landDetails,
    placeOrder,
    orders
  } = useApp();

  const [selectedExport, setSelectedExport] = useState<ExportMarketItem>(exportMarkets[0]);
  const [exportQty, setExportQty] = useState<number>(10000);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [isExportContactOpen, setIsExportContactOpen] = useState<boolean>(false);

  const handleExportPreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = exportQty * selectedExport.localEquivalentPricePerKg;
    placeOrder({
      orderType: 'Pre-Order',
      marketType: 'Export International',
      crop: selectedExport.crop,
      quantityKg: exportQty,
      totalPrice,
      buyerName: selectedExport.buyerCompany,
      buyerRole: 'Export Marketer'
    });
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/80 via-black to-emerald-950/40 p-6 rounded-3xl border border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Global Export & International Trade Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Export Marketer Portal & Stock Price Analytics</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Stock market commodity price trends, international demand heatmaps, direct phone/WhatsApp/Email contact for global export desks (Dubai Jebel Ali, Singapore, Rotterdam).
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-2xl text-xs text-cyan-300 font-bold">
          <Ship className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Container Shipping Sync Active</span>
        </div>
      </div>

      {/* Embedded Stock Market Style Live Export Price Chart */}
      <PriceStockChart
        cropName={`${selectedExport.crop} (${selectedExport.country})`}
        marketName={`${selectedExport.buyerCompany} - ${selectedExport.port}`}
        currentPrice={selectedExport.localEquivalentPricePerKg}
        previousPrice={selectedExport.localEquivalentPricePerKg * 0.95}
        priceTrend={selectedExport.priceTrend}
        changePercentage={selectedExport.changePercentage}
        highToday={selectedExport.localEquivalentPricePerKg * 1.08}
        lowToday={selectedExport.localEquivalentPricePerKg * 0.92}
        history={selectedExport.priceHistory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Export Commodity Prices & Demand Heatmap */}
        <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Global Commodity Demand & Export Desks Directory</span>
            </h3>
            <span className="text-xs text-cyan-300 font-semibold">Live International Exchange Rates</span>
          </div>

          <div className="space-y-4">
            {exportMarkets.map((exp) => {
              const isSelected = selectedExport.id === exp.id;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExport(exp)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 via-black to-emerald-950/40 border-cyan-400 shadow-xl'
                      : 'bg-black/50 border-gray-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{exp.flagUrl || '🌐'}</span>
                        <h4 className="text-base font-bold text-white">{exp.country}</h4>
                        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/30 flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-cyan-400 animate-pulse" />
                          <span>{exp.demandUrgency}</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 flex items-center space-x-1">
                        <Ship className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Port: <b>{exp.port}</b> • Company: <b>{exp.buyerCompany}</b></span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block uppercase">Export Rate</span>
                        <span className="text-lg font-extrabold text-cyan-300">${exp.exportPricePerKgUsd.toFixed(2)} USD/kg</span>
                        <span className="text-[10px] text-emerald-400 block font-bold">~₹{exp.localEquivalentPricePerKg}/kg</span>
                      </div>

                      <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>+{exp.changePercentage}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Explicit Contact Badges: Phone, WhatsApp, Email */}
                  <div className="pt-3 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-3 text-gray-300">
                      <span className="flex items-center space-x-1 text-emerald-300">
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono">{exp.contactNumber}</span>
                      </span>

                      <span className="flex items-center space-x-1 text-green-300">
                        <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                        <span className="font-mono">{exp.whatsappNumber}</span>
                      </span>

                      <span className="flex items-center space-x-1 text-cyan-300">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-mono">{exp.emailId}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExport(exp);
                        setIsExportContactOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs hover:scale-105 transition-all shadow-md flex items-center space-x-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact Export Desk</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Sourcing Banner */}
          <div className="pt-4 border-t border-gray-800">
            <h4 className="text-xs font-semibold text-gray-300 mb-3">Direct Farmer Bulk Stock Sourcing (1,000+ kg)</h4>
            <div className="bg-gradient-to-r from-emerald-950/60 via-black to-cyan-950/40 p-4 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Bulk Sourcing Lot: {activeCycle.crop} ({activeCycle.targetYieldKg} kg Available)</h5>
                  <p className="text-gray-300 text-[11px]">
                    Farmer: <b>{landDetails.farmerName}</b> • Location: <b>{landDetails.location.district}, Maharashtra</b>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExportContactOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs hover:scale-105 transition-all flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Exporter Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Place International Export Bulk Pre-Order Form */}
        <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-cyan-500/20 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Ship className="w-5 h-5 text-cyan-400" />
            <span>Place Export Pre-Order Contract</span>
          </h3>

          <div className="bg-black/60 p-4 rounded-2xl border border-cyan-500/30 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Destination Country:</span>
              <span className="font-bold text-cyan-300">{selectedExport.country}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Target Crop:</span>
              <span className="font-bold text-white">{selectedExport.crop}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Export Rate:</span>
              <span className="font-bold text-amber-300">${selectedExport.exportPricePerKgUsd} / kg</span>
            </div>
          </div>

          {/* Contact Details Display Card */}
          <div className="bg-cyan-950/40 p-4 rounded-2xl border border-cyan-500/30 space-y-2 text-xs">
            <div className="text-gray-400 text-[10px] uppercase font-bold">Desk Contact Credentials</div>
            <div className="flex justify-between text-gray-300">
              <span>Representative:</span>
              <span className="font-bold text-white">{selectedExport.contactPerson}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Phone / Call:</span>
              <span className="font-mono text-emerald-300 font-bold">{selectedExport.contactNumber}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>WhatsApp:</span>
              <span className="font-mono text-green-300 font-bold">{selectedExport.whatsappNumber}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Email ID:</span>
              <span className="font-mono text-cyan-300 font-bold">{selectedExport.emailId}</span>
            </div>
          </div>

          <button
            onClick={() => setIsExportContactOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Open Multi-Channel Contact Hub</span>
          </button>

          <form onSubmit={handleExportPreOrder} className="space-y-4 text-xs pt-3 border-t border-gray-800">
            <div>
              <label className="text-gray-300 font-semibold block mb-1">Bulk Quantity (kg) e.g. 10,000 kg</label>
              <input
                type="number"
                step="500"
                value={exportQty}
                onChange={(e) => setExportQty(Number(e.target.value))}
                className="w-full bg-black/60 border border-cyan-500/30 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="bg-cyan-950/40 p-3 rounded-2xl border border-cyan-500/20 flex items-center justify-between">
              <span className="text-gray-300">Total Contract Value:</span>
              <span className="text-base font-extrabold text-cyan-300">
                ${(exportQty * selectedExport.exportPricePerKgUsd).toLocaleString()} (₹{(exportQty * selectedExport.localEquivalentPricePerKg).toLocaleString()})
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm International Export Contract</span>
            </button>

            {orderSuccess && (
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center space-x-2 border border-cyan-400 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Export Pre-Order successfully booked & dispatched!</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Export Trade Contact Modal */}
      <TradeContactModal
        isOpen={isExportContactOpen}
        onClose={() => setIsExportContactOpen(false)}
        targetName={selectedExport.buyerCompany}
        targetType="International Exporter"
        cropName={selectedExport.crop}
        initialPrice={selectedExport.exportPricePerKgUsd}
        phone={selectedExport.contactNumber}
        email={selectedExport.emailId}
        whatsapp={selectedExport.whatsappNumber}
        location={`${selectedExport.country} (${selectedExport.port})`}
        isExport={true}
      />
    </div>
  );
};
