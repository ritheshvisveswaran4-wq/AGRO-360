import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BusinessSide } from '../../types';
import { TradeContactModal } from '../Trade/TradeContactModal';
import { PriceStockChart } from '../Charts/PriceStockChart';
import {
  Briefcase,
  ShoppingBag,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ArrowRightLeft,
  Plus,
  Phone,
  PhoneCall,
  MessageSquare,
  Mail,
  Building2,
  Award,
  User,
  Leaf
} from 'lucide-react';

export const BusinessAgentPortal: React.FC = () => {
  const {
    businessSide,
    setBusinessSide,
    sellers,
    buyers,
    localMarkets,
    activeCycle,
    placeOrder,
    intermediateDeals,
    addIntermediateDeal
  } = useApp();

  const [brokerFarmerBuyPrice, setBrokerFarmerBuyPrice] = useState<number>(30);
  const [brokerBuyerSellPrice, setBrokerBuyerSellPrice] = useState<number>(35);
  const [brokerQty, setBrokerQty] = useState<number>(2000);
  const [brokerBuyerName, setBrokerBuyerName] = useState<string>('Metro Wholesale Distributors');
  const [dealSuccess, setDealSuccess] = useState<boolean>(false);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  // Contact modal state
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    targetName: string;
    targetType: 'Farmer Seller' | 'Commercial Buyer' | 'Local Market Mandi' | 'International Exporter';
    cropName: string;
    initialPrice: number;
    phone: string;
    email: string;
    whatsapp: string;
    location: string;
  }>({
    isOpen: false,
    targetName: '',
    targetType: 'Farmer Seller',
    cropName: '',
    initialPrice: 0,
    phone: '',
    email: '',
    whatsapp: '',
    location: ''
  });

  const handleCreateBrokerDeal = (e: React.FormEvent) => {
    e.preventDefault();
    addIntermediateDeal({
      crop: activeCycle.crop,
      quantityKg: brokerQty,
      farmerBuyingPricePerKg: brokerFarmerBuyPrice,
      buyerSellingPricePerKg: brokerBuyerSellPrice,
      endBuyerName: brokerBuyerName
    });
    setDealSuccess(true);
    setTimeout(() => setDealSuccess(false), 4000);
  };

  const handleBuyFromSeller = (sellerName: string, crop: any, price: number, qty: number) => {
    placeOrder({
      orderType: 'Pre-Order',
      marketType: 'Local B2B',
      crop,
      quantityKg: Math.min(qty, 2000),
      totalPrice: Math.min(qty, 2000) * price,
      buyerName: 'Business Agent Wholesale Sourcing'
    });
    setOrderNotice(`Successfully booked ${Math.min(qty, 2000)} kg of ${crop} from ${sellerName}!`);
    setTimeout(() => setOrderNotice(null), 4000);
  };

  const openSellerContact = (sel: typeof sellers[0]) => {
    setContactModal({
      isOpen: true,
      targetName: sel.farmerName,
      targetType: 'Farmer Seller',
      cropName: sel.crop,
      initialPrice: sel.askingPricePerKg,
      phone: sel.contactPhone,
      email: sel.emailId,
      whatsapp: sel.whatsappNumber,
      location: sel.location
    });
  };

  const openBuyerContact = (buy: typeof buyers[0]) => {
    setContactModal({
      isOpen: true,
      targetName: buy.companyName,
      targetType: 'Commercial Buyer',
      cropName: buy.requestedCrop,
      initialPrice: buy.offerPricePerKg,
      phone: buy.contactNumber,
      email: buy.emailId,
      whatsapp: buy.whatsappNumber,
      location: buy.location
    });
  };

  const selectedMarketChart = localMarkets[0];

  return (
    <div className="space-y-6">
      {/* Title Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/80 via-black to-emerald-950/40 p-6 rounded-3xl border border-amber-500/30">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Commercial Agro-Trading & Sourcing Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Business Agent Sourcing & Broker Portal</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Browse multiple verified farmer sellers and buyer offers. Direct contact via Phone, WhatsApp & Email. Switch between <b>Seller</b>, <b>Buyer</b>, and <b>Intermediate Broker</b> roles.
          </p>
        </div>

        {/* 3 Sides Mode Selector */}
        <div className="flex items-center space-x-1.5 bg-black/60 p-1.5 rounded-2xl border border-amber-500/30">
          {(['seller', 'buyer', 'intermediate'] as BusinessSide[]).map((side) => (
            <button
              key={side}
              onClick={() => setBusinessSide(side)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                businessSide === side
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {side === 'intermediate' ? 'Intermediate (Broker)' : `${side} Side`}
            </button>
          ))}
        </div>
      </div>

      {/* Live Price Chart - show for seller and buyer */}
      {businessSide !== 'intermediate' && selectedMarketChart && (
        <PriceStockChart
          cropName={businessSide === 'seller' ? `${sellers[0]?.crop || 'Wheat'} — Farmer Wholesale Rate` : `${buyers[0]?.requestedCrop || 'Onion'} — Buyer Demand Rate`}
          marketName={businessSide === 'seller' ? 'Agro B2B Seller Exchange' : 'Commercial Buyer Market Terminal'}
          currentPrice={businessSide === 'seller' ? (sellers[0]?.askingPricePerKg || 32.5) : (buyers[0]?.offerPricePerKg || 49.5)}
          previousPrice={businessSide === 'seller' ? ((sellers[0]?.askingPricePerKg || 32.5) * 0.96) : ((buyers[0]?.offerPricePerKg || 49.5) * 0.97)}
          priceTrend="up"
          changePercentage={businessSide === 'seller' ? 4.2 : 3.1}
          highToday={businessSide === 'seller' ? (sellers[0]?.askingPricePerKg || 32.5) * 1.06 : (buyers[0]?.offerPricePerKg || 49.5) * 1.05}
          lowToday={businessSide === 'seller' ? (sellers[0]?.askingPricePerKg || 32.5) * 0.93 : (buyers[0]?.offerPricePerKg || 49.5) * 0.92}
          history={selectedMarketChart.priceHistory}
        />
      )}

      {orderNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-bold">{orderNotice}</span>
        </div>
      )}

      {/* Side 1: SELLER SIDE (Farmer Sellers with Full Contact) */}
      {businessSide === 'seller' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-agro-card p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>Seller Side: Farmer Sellers Inventory Directory ({sellers.length} Listed)</span>
                </h3>
                <p className="text-xs text-gray-400">Direct contact & procurement from verified farmer sellers. Phone, WhatsApp & Email available.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sellers.map((sel) => (
                <div
                  key={sel.id}
                  className="bg-gradient-to-br from-amber-950/40 via-black to-emerald-950/30 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={sel.imageUrl}
                      alt={sel.crop}
                      className="w-20 h-20 rounded-2xl object-cover border border-amber-500/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white">{sel.farmerName}</h4>
                        {sel.organicCertified && (
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                            <Leaf className="w-2.5 h-2.5" />
                            <span>Organic</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{sel.location}</span>
                      </p>
                      <span className="text-xs font-bold text-amber-300 block mt-1">
                        Crop: {sel.crop} ({sel.landAreaAcres} Acres)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-black/60 p-3 rounded-xl border border-gray-800 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Available Tonnage</span>
                      <span className="font-extrabold text-white">{sel.availableQuantityKg.toLocaleString()} kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Asking Wholesale Price</span>
                      <span className="font-extrabold text-emerald-400">₹{sel.askingPricePerKg.toFixed(2)} / kg</span>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/20 space-y-1.5 text-[11px]">
                    <div className="text-gray-400 text-[10px] uppercase font-bold mb-1">Farmer Direct Contact</div>
                    <div className="flex items-center space-x-2 text-emerald-300 font-mono">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{sel.contactPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-300 font-mono">
                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                      <span>{sel.whatsappNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cyan-300 font-mono">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{sel.emailId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openSellerContact(sel)}
                      className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1 hover:scale-[1.02]"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact Farmer</span>
                    </button>

                    <button
                      onClick={() => handleBuyFromSeller(sel.farmerName, sel.crop, sel.askingPricePerKg, sel.availableQuantityKg)}
                      className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Procure Stock</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Side 2: BUYER SIDE (More Buyer Profiles with Contact) */}
      {businessSide === 'buyer' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-agro-card p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <span>Buyer Side: Downstream Commercial Buyers ({buyers.length} Active Requests)</span>
                </h3>
                <p className="text-xs text-gray-400">Wholesale mills, retail chains, and exporters seeking crop supplies. Direct contact details included.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {buyers.map((buy) => (
                <div
                  key={buy.id}
                  className="bg-gradient-to-br from-amber-950/40 via-black to-emerald-950/30 p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={buy.imageUrl}
                      alt={buy.companyName}
                      className="w-20 h-20 rounded-2xl object-cover border border-amber-500/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                        {buy.buyerType}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{buy.companyName}</h4>
                      <p className="text-xs text-gray-400 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{buy.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-black/60 p-3 rounded-xl border border-gray-800 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Requested Crop & Vol.</span>
                      <span className="font-bold text-white">{buy.requestedCrop} ({buy.requestedQuantityKg.toLocaleString()} kg)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Buyer Budget Offer</span>
                      <span className="font-extrabold text-amber-300">₹{buy.offerPricePerKg.toFixed(2)} / kg</span>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/20 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-[10px] uppercase font-bold">Buyer Contact ({buy.contactPerson})</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        buy.urgency === 'Immediate'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>{buy.urgency}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-300 font-mono">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{buy.contactNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-300 font-mono">
                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                      <span>{buy.whatsappNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-cyan-300 font-mono">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{buy.emailId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openBuyerContact(buy)}
                      className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1 hover:scale-[1.02]"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Contact Buyer</span>
                    </button>

                    <button
                      onClick={() => {
                        placeOrder({
                          orderType: 'Pre-Order',
                          marketType: 'Local B2B',
                          crop: buy.requestedCrop,
                          quantityKg: buy.requestedQuantityKg,
                          totalPrice: buy.requestedQuantityKg * buy.offerPricePerKg,
                          buyerName: buy.companyName
                        });
                        setOrderNotice(`Contract signed with ${buy.companyName}!`);
                        setTimeout(() => setOrderNotice(null), 4000);
                      }}
                      className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept Contract</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Side 3: INTERMEDIATE (BROKER) SIDE */}
      {businessSide === 'intermediate' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Broker Margin Calculator Form */}
            <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                <span>Broker Intermediate Deal Creator</span>
              </h3>
              <p className="text-xs text-gray-400">
                Intermediary buying from farmers at wholesale price and selling to buyers with margin calculations.
              </p>

              <form onSubmit={handleCreateBrokerDeal} className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Farmer Buying Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={brokerFarmerBuyPrice}
                    onChange={(e) => setBrokerFarmerBuyPrice(Number(e.target.value))}
                    className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Downstream Selling Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={brokerBuyerSellPrice}
                    onChange={(e) => setBrokerBuyerSellPrice(Number(e.target.value))}
                    className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    step="500"
                    value={brokerQty}
                    onChange={(e) => setBrokerQty(Number(e.target.value))}
                    className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-semibold block mb-1">End Buyer Name</label>
                  <input
                    type="text"
                    value={brokerBuyerName}
                    onChange={(e) => setBrokerBuyerName(e.target.value)}
                    className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="bg-amber-950/40 p-3.5 rounded-2xl border border-amber-500/30 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Margin per kg:</span>
                    <span className="font-bold text-amber-300">₹{(brokerBuyerSellPrice - brokerFarmerBuyPrice).toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Total Net Broker Profit:</span>
                    <span className="font-extrabold text-emerald-400">
                      ₹{((brokerBuyerSellPrice - brokerFarmerBuyPrice) * brokerQty).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lock Intermediate Deal</span>
                </button>

                {dealSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center space-x-2 border border-emerald-400 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Intermediate Deal locked successfully!</span>
                  </div>
                )}
              </form>
            </div>

            {/* Intermediate Deals History List */}
            <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span>Active Intermediate Deals & Margins</span>
              </h3>

              <div className="space-y-3">
                {intermediateDeals.map((dl) => (
                  <div key={dl.id} className="p-4 rounded-2xl bg-black/50 border border-amber-500/20 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold">
                      <span className="text-white text-sm">{dl.crop} ({dl.quantityKg.toLocaleString()} kg)</span>
                      <span className="text-amber-400">Broker Margin: ₹{dl.brokerMarginPerKg.toFixed(2)} / kg</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-gray-300 pt-2 border-t border-gray-800">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Farmer ({dl.farmerName}):</span>
                        <span className="font-semibold text-emerald-300">Buy @ ₹{dl.farmerBuyingPricePerKg}/kg</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Buyer ({dl.endBuyerName}):</span>
                        <span className="font-semibold text-amber-300">Sell @ ₹{dl.buyerSellingPricePerKg}/kg</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Total Profit:</span>
                        <span className="font-bold text-emerald-400">₹{dl.totalBrokerProfit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trade Contact Modal */}
      <TradeContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal(prev => ({ ...prev, isOpen: false }))}
        targetName={contactModal.targetName}
        targetType={contactModal.targetType}
        cropName={contactModal.cropName}
        initialPrice={contactModal.initialPrice}
        phone={contactModal.phone}
        email={contactModal.email}
        whatsapp={contactModal.whatsapp}
        location={contactModal.location}
      />
    </div>
  );
};
