import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  Mail,
  FileText,
  Printer,
  CheckCircle2,
  X,
  Globe,
  Building2,
  DollarSign,
  Send,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';

interface TradeContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  targetType: 'Local Market Mandi' | 'Farmer Seller' | 'Commercial Buyer' | 'International Exporter';
  cropName: string;
  initialPrice: number;
  phone: string;
  email: string;
  whatsapp: string;
  location: string;
  isExport?: boolean;
}

export const TradeContactModal: React.FC<TradeContactModalProps> = ({
  isOpen,
  onClose,
  targetName,
  targetType,
  cropName,
  initialPrice,
  phone,
  email,
  whatsapp,
  location,
  isExport = false
}) => {
  const [offerPrice, setOfferPrice] = useState<number>(initialPrice);
  const [quantityKg, setQuantityKg] = useState<number>(isExport ? 10000 : 2000);
  const [traderName, setTraderName] = useState<string>('Agro Trade Representative');
  const [message, setMessage] = useState<string>(
    `Hello ${targetName}, I would like to negotiate a trade contract for ${quantityKg} kg of ${cropName} at ${isExport ? '$' : '₹'}${offerPrice}/kg.`
  );
  const [quotationGenerated, setQuotationGenerated] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalContractValue = quantityKg * offerPrice;
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(`Trade Inquiry: ${cropName} Contract`)}&body=${encodeURIComponent(message)}`;

  const handleGenerateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    setQuotationGenerated(true);
  };

  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#08130a] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              {isExport ? <Globe className="w-6 h-6 animate-pulse" /> : <Building2 className="w-6 h-6" />}
            </div>
            <div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {targetType}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-0.5">{targetName}</h2>
              <p className="text-xs text-gray-400">{location} • Direct Multi-Channel Contact & Negotiation Hub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-800 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Direct Communication Channels: Phone, WhatsApp, Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 print:hidden">
          <a
            href={`tel:${phone}`}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Trader</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-extrabold text-xs transition-all shadow-lg shadow-green-500/20 flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href={mailtoUrl}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Displayed Contact Info Details Box */}
        <div className="bg-black/60 p-4 rounded-2xl border border-emerald-500/20 space-y-2 text-xs print:hidden">
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-gray-400">Direct Phone:</span>
            <span className="font-mono font-bold text-emerald-300">{phone}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-gray-400">WhatsApp Number:</span>
            <span className="font-mono font-bold text-green-300">{whatsapp}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-gray-400">Official Email ID:</span>
            <span className="font-mono font-bold text-cyan-300">{email}</span>
          </div>
        </div>

        {/* Interactive Trade Contract & Sales Quotation Form */}
        {!quotationGenerated ? (
          <form onSubmit={handleGenerateQuotation} className="space-y-4 pt-2 border-t border-gray-800 text-xs print:hidden">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Generate Official Sales Quotation & Trade Terms</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Target Crop</label>
                <input
                  type="text"
                  readOnly
                  value={cropName}
                  className="w-full bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 text-emerald-300 font-bold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Your Organization / Trader Name</label>
                <input
                  type="text"
                  value={traderName}
                  onChange={(e) => setTraderName(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400 font-semibold"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Proposed Trade Quantity (kg)</label>
                <input
                  type="number"
                  step="100"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400 font-bold"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Offer Price ({isExport ? '$ USD/kg' : '₹/kg'})</label>
                <input
                  type="number"
                  step="0.05"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 font-semibold block mb-1">Negotiation Message</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="bg-emerald-950/50 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <span className="text-gray-300">Total Contract Value:</span>
              <span className="text-lg font-extrabold text-emerald-400">
                {isExport ? `$${totalContractValue.toLocaleString()} USD` : `₹${totalContractValue.toLocaleString()}`}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official Trade Quotation & Contract</span>
            </button>
          </form>
        ) : (
          /* Printable / Downloadable Official Quotation Document */
          <div className="space-y-4 pt-2 border-t border-gray-800 text-xs">
            <div className="bg-black/60 p-6 rounded-2xl border border-emerald-500/30 space-y-4 print:bg-white print:text-black print:p-0">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-white print:text-black">OFFICIAL TRADE SALES QUOTATION</h3>
                  <p className="text-[10px] text-emerald-400">Ref: QT-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full">
                  AgroPulse Certified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Seller / Contact</span>
                  <span className="font-bold text-white print:text-black">{targetName} ({phone})</span>
                  <span className="text-[10px] text-cyan-400 block">{email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Buyer / Representative</span>
                  <span className="font-bold text-white print:text-black">{traderName}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20 print:bg-gray-100">
                <div>
                  <span className="text-gray-400 block text-[10px]">Agreed Commodity</span>
                  <span className="font-bold text-white print:text-black">{cropName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Volume (kg)</span>
                  <span className="font-bold text-amber-300 print:text-amber-800">{quantityKg} kg</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Price Rate</span>
                  <span className="font-bold text-emerald-400 print:text-emerald-800">{isExport ? `$${offerPrice}` : `₹${offerPrice}`} / kg</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-800 font-extrabold text-sm">
                <span>Total Contract Payable:</span>
                <span className="text-emerald-400 print:text-emerald-800">
                  {isExport ? `$${totalContractValue.toLocaleString()} USD` : `₹${totalContractValue.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 print:hidden">
              <button
                onClick={() => setQuotationGenerated(false)}
                className="w-1/2 py-2.5 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs hover:bg-gray-700"
              >
                Edit Quotation Terms
              </button>
              <button
                onClick={handlePrintQuotation}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs hover:bg-emerald-400 flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF Quotation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
