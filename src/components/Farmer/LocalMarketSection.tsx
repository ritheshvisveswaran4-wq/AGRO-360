import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocalMarketItem } from '../../types';
import { PriceStockChart } from '../Charts/PriceStockChart';
import { TradeContactModal } from '../Trade/TradeContactModal';
import {
  Store,
  MapPin,
  Flame,
  CheckCircle2,
  ShoppingBag,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Truck,
  Star,
  FileCheck,
  Building2,
  User,
  Clock,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Mail
} from 'lucide-react';

export const LocalMarketSection: React.FC = () => {
  const {
    localMarkets,
    activeCycle,
    landDetails,
    placeOrder,
    orders,
    b2bMode,
    setB2bMode
  } = useApp();

  const [selectedMarket, setSelectedMarket] = useState<LocalMarketItem>(localMarkets[0]);
  const [orderQty, setOrderQty] = useState<number>(1000);
  const [b2cBagSize, setB2cBagSize] = useState<number>(10);
  const [b2cBagCount, setB2cBagCount] = useState<number>(5);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  // Yield Matching Calculation
  const estimatedYieldKg = activeCycle.targetYieldKg;
  const acreage = landDetails.areaAcres;
  const yieldPerAcre = acreage > 0 ? (estimatedYieldKg / acreage).toFixed(0) : 0;
  const expectedNormalYieldPerAcre = activeCycle.crop === 'Wheat' ? 2400 : (activeCycle.crop === 'Onion' ? 8500 : 3100);
  const yieldMatchPercentage = Math.min(100, Math.round((Number(yieldPerAcre) / expectedNormalYieldPerAcre) * 100));

  const handleB2bOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = orderQty * selectedMarket.currentPricePerKg;
    placeOrder({
      orderType: 'Pre-Order',
      marketType: 'Local B2B',
      crop: selectedMarket.crop,
      quantityKg: orderQty,
      totalPrice,
      buyerName: 'Wholesale APMC Trading Agent'
    });
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  const handleB2cOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const totalKg = b2cBagSize * b2cBagCount;
    const retailPricePerKg = selectedMarket.currentPricePerKg * 1.15;
    const totalPrice = totalKg * retailPricePerKg;
    placeOrder({
      orderType: 'Direct Order',
      marketType: 'Local B2C',
      crop: selectedMarket.crop,
      quantityKg: totalKg,
      totalPrice,
      buyerName: 'Direct Fresh Consumer'
    });
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-black to-emerald-900/40 p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Store className="w-4 h-4" />
            <span>Dedicated Local Commodity Market Page</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Local Market Terminal & Stock Price Analytics</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Real-time stock market price trends, local APMC mandi locations, direct trader contact (Phone, WhatsApp, Email), and distinct <b>B2B Wholesale</b> vs <b>B2C Fresh Retail</b> portals.
          </p>
        </div>

        {/* B2B vs B2C Switcher */}
        <div className="flex items-center space-x-2 bg-black/80 p-2 rounded-2xl border border-emerald-500/40 shadow-xl">
          <button
            onClick={() => setB2bMode(true)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              b2bMode
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>B2B Wholesale Mandi</span>
          </button>

          <button
            onClick={() => setB2bMode(false)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              !b2bMode
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>B2C Fresh Consumer</span>
          </button>
        </div>
      </div>

      {/* Embedded Stock Market Style Live Price Chart */}
      <PriceStockChart
        cropName={selectedMarket.crop}
        marketName={selectedMarket.marketName}
        currentPrice={selectedMarket.currentPricePerKg}
        previousPrice={selectedMarket.previousPricePerKg}
        priceTrend={selectedMarket.priceTrend}
        changePercentage={selectedMarket.changePercentage}
        highToday={selectedMarket.highToday}
        lowToday={selectedMarket.lowToday}
        history={selectedMarket.priceHistory}
      />

      {/* Production Area vs Yield Matching Bar */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-black to-emerald-950/40 p-5 rounded-3xl border border-emerald-500/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">Field Production Area</span>
            <span className="text-sm font-bold text-white">{acreage} Acres ({landDetails.location.district})</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">Estimated Harvest Yield</span>
            <span className="text-sm font-bold text-amber-300">{estimatedYieldKg} kg ({yieldPerAcre} kg / acre)</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">Area Yield Matching</span>
            <span className="text-sm font-bold text-emerald-400">{yieldMatchPercentage}% Verified Fit</span>
          </div>
        </div>
      </div>

      {/* DISTINCT B2B vs B2C INTERFACE SECTIONS */}
      {b2bMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          {/* Local Wholesale Mandis */}
          <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  B2B Commercial Wholesale
                </span>
                <h3 className="text-base font-bold text-white mt-1 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>Wholesale APMC Mandi Terminals</span>
                </h3>
              </div>
              <span className="text-xs text-gray-400">Truck Load Tonnage</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localMarkets.map((mkt) => {
                const isSelected = selectedMarket.id === mkt.id;
                return (
                  <div
                    key={mkt.id}
                    onClick={() => setSelectedMarket(mkt)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-950/60 via-black to-emerald-950/40 border-amber-400 shadow-xl'
                        : 'bg-black/50 border-gray-800 hover:border-amber-500/40'
                    }`}
                  >
                    {mkt.imageUrl && (
                      <div className="w-full h-32 rounded-xl overflow-hidden relative">
                        <img src={mkt.imageUrl} alt={mkt.crop} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-300">
                          ₹{mkt.currentPricePerKg}/kg
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{mkt.marketName}</h4>
                        <span className="text-[10px] text-gray-400">{mkt.distanceKm} km</span>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{mkt.location}</span>
                      </p>
                    </div>

                    {/* Explicit Contact Badges: Phone, WhatsApp, Email */}
                    <div className="pt-2 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <div className="space-y-0.5 text-gray-300">
                        <div className="flex items-center space-x-1 font-mono text-emerald-300">
                          <PhoneCall className="w-3 h-3 text-emerald-400" />
                          <span>{mkt.contactNumber}</span>
                        </div>
                        <div className="flex items-center space-x-1 font-mono text-cyan-300">
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span>{mkt.emailId}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMarket(mkt);
                          setIsContactModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-extrabold text-[11px] hover:bg-amber-400 flex items-center space-x-1 shadow-md"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Contact Trader</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B2B Wholesale Order Booking & Direct Negotiation Panel */}
          <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <span>B2B Commercial Contract & Contact</span>
            </h3>

            <div className="bg-black/60 p-4 rounded-2xl border border-amber-500/30 space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Selected Mandi:</span>
                <span className="font-bold text-amber-300">{selectedMarket.marketName}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Wholesale Crop:</span>
                <span className="font-bold text-white">{selectedMarket.crop}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Commercial Rate:</span>
                <span className="font-bold text-amber-400">₹{selectedMarket.currentPricePerKg} / kg</span>
              </div>
            </div>

            {/* Mandi Contact Badges Card */}
            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/30 space-y-2 text-xs">
              <div className="text-gray-400 text-[10px] uppercase font-bold">Mandi Official Contact Info</div>
              <div className="flex justify-between text-gray-300">
                <span>Contact Officer:</span>
                <span className="font-bold text-white">{selectedMarket.contactPerson}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Phone Call:</span>
                <span className="font-mono text-emerald-300 font-bold">{selectedMarket.contactNumber}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>WhatsApp:</span>
                <span className="font-mono text-green-300 font-bold">{selectedMarket.whatsappNumber}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Official Email:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedMarket.emailId}</span>
              </div>
            </div>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct Call / Email / WhatsApp Trader</span>
            </button>

            <form onSubmit={handleB2bOrder} className="space-y-4 text-xs pt-3 border-t border-gray-800">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Commercial Bulk Quantity (kg)</label>
                <input
                  type="number"
                  step="500"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Number(e.target.value))}
                  className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="bg-amber-950/40 p-3 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                <span className="text-gray-300">Total Contract Value:</span>
                <span className="text-base font-extrabold text-amber-300">
                  ₹{(orderQty * selectedMarket.currentPricePerKg).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm B2B Wholesale Order</span>
              </button>

              {orderSuccess && (
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center space-x-2 border border-amber-400 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>B2B Contract Pre-Order successfully booked!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        /* B2C DIRECT CONSUMER RETAIL INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  B2C Direct Farm-Gate Store
                </span>
                <h3 className="text-base font-bold text-white mt-1 flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <span>Fresh Farm Harvest Direct to Consumer</span>
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold">100% Organic & Fresh</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {localMarkets.map((mkt) => {
                const retailPrice = mkt.currentPricePerKg * 1.15;
                const isSelected = selectedMarket.id === mkt.id;
                return (
                  <div
                    key={mkt.id}
                    onClick={() => setSelectedMarket(mkt)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-950/80 via-black to-emerald-900/40 border-emerald-400 shadow-xl'
                        : 'bg-black/50 border-gray-800 hover:border-emerald-500/40'
                    }`}
                  >
                    {mkt.imageUrl && (
                      <div className="w-full h-36 rounded-xl overflow-hidden relative">
                        <img src={mkt.imageUrl} alt={mkt.crop} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-emerald-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                          Farm Gate Fresh
                        </div>
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-emerald-300">
                          ₹{retailPrice.toFixed(2)}/kg
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-base">{mkt.crop} Pack</h4>
                        <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>4.9 (128 reviews)</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        Harvested fresh from <b>{landDetails.farmerName}</b> ({mkt.location})
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs">
                      <span className="text-emerald-300 font-semibold">Delivery: 15 km</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMarket(mkt);
                          setIsContactModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-xl bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 flex items-center space-x-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Contact Farmer</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-emerald-500/30 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Direct Consumer Fresh Checkout</span>
            </h3>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Farmer ({selectedMarket.contactNumber})</span>
            </button>

            <form onSubmit={handleB2cOrder} className="space-y-4 text-xs pt-3 border-t border-gray-800">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Select Bag Pack Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 25].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setB2cBagSize(size)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        b2cBagSize === size
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                          : 'bg-black/50 border-gray-800 text-gray-300 hover:bg-emerald-950/40'
                      }`}
                    >
                      {size} kg Bag
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Number of Bags</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={b2cBagCount}
                  onChange={(e) => setB2cBagCount(Number(e.target.value))}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                <span className="text-gray-300">Total Price ({b2cBagSize * b2cBagCount} kg):</span>
                <span className="text-base font-extrabold text-emerald-400">
                  ₹{(b2cBagSize * b2cBagCount * selectedMarket.currentPricePerKg * 1.15).toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Order Doorstep Delivery</span>
              </button>

              {orderSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center space-x-2 border border-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Fresh Produce Order successfully placed!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Trade Contact Modal */}
      <TradeContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        targetName={selectedMarket.marketName}
        targetType="Local Market Mandi"
        cropName={selectedMarket.crop}
        initialPrice={selectedMarket.currentPricePerKg}
        phone={selectedMarket.contactNumber}
        email={selectedMarket.emailId}
        whatsapp={selectedMarket.whatsappNumber}
        location={selectedMarket.location}
      />
    </div>
  );
};
