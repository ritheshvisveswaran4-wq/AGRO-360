import React, { useState } from 'react';
import { PricePoint } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart2
} from 'lucide-react';

interface PriceStockChartProps {
  cropName: string;
  marketName: string;
  currentPrice: number;
  previousPrice: number;
  priceTrend: 'up' | 'down' | 'stable';
  changePercentage: number;
  highToday: number;
  lowToday: number;
  history?: PricePoint[];
}

export const PriceStockChart: React.FC<PriceStockChartProps> = ({
  cropName,
  marketName,
  currentPrice,
  previousPrice,
  priceTrend,
  changePercentage,
  highToday,
  lowToday,
  history = [
    { time: '09:00', price: currentPrice * 0.94, high: currentPrice * 0.95, low: currentPrice * 0.93, volume: 1200 },
    { time: '10:30', price: currentPrice * 0.97, high: currentPrice * 0.98, low: currentPrice * 0.96, volume: 2400 },
    { time: '12:00', price: currentPrice * 0.95, high: currentPrice * 0.96, low: currentPrice * 0.94, volume: 1800 },
    { time: '13:30', price: currentPrice * 1.02, high: currentPrice * 1.03, low: currentPrice * 1.00, volume: 3800 },
    { time: '15:00', price: currentPrice * 0.99, high: currentPrice * 1.01, low: currentPrice * 0.98, volume: 2900 },
    { time: '16:30', price: currentPrice * 1.05, high: currentPrice * 1.06, low: currentPrice * 1.02, volume: 4500 },
    { time: 'Live', price: currentPrice, high: highToday, low: lowToday, volume: 5200 },
  ]
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  const isUp = priceTrend === 'up';

  // SVG Chart Calculations
  const prices = history.map(h => h.price);
  const minPrice = Math.min(...prices) * 0.98;
  const maxPrice = Math.max(...prices) * 1.02;
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 180;
  const padding = 20;

  const points = history.map((pt, index) => {
    const x = padding + (index / (history.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((pt.price - minPrice) / priceRange) * (svgHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${svgHeight - padding} ${points} ${svgWidth - padding},${svgHeight - padding}`;

  const strokeColor = isUp ? '#22c55e' : '#ef4444';
  const fillColor = isUp ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  return (
    <div className="bg-gradient-to-b from-[#0a180f] via-black to-[#050e09] p-5 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4">
      {/* Ticker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{marketName}</span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Stock Market Ticker
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white flex items-center space-x-2 mt-0.5">
            <span>{cropName} Spot Index</span>
          </h3>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block uppercase">Live Commodity Price</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-white">₹{currentPrice.toFixed(2)}</span>
              <span className="text-xs text-gray-400 font-normal">/ kg</span>
            </div>
          </div>

          <div
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-2xl text-xs font-extrabold shadow-lg ${
              isUp
                ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                : 'bg-red-500/20 border border-red-400 text-red-300 shadow-red-500/20'
            }`}
          >
            {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{isUp ? '+' : ''}{changePercentage}%</span>
          </div>
        </div>
      </div>

      {/* Stock Market Metrics Bar */}
      <div className="grid grid-cols-4 gap-2 bg-black/60 p-3 rounded-2xl border border-gray-800 text-center text-xs">
        <div>
          <span className="text-[10px] text-gray-400 block uppercase">24h High</span>
          <span className="font-bold text-emerald-400">₹{highToday.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block uppercase">24h Low</span>
          <span className="font-bold text-red-400">₹{lowToday.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block uppercase">Trade Volume</span>
          <span className="font-bold text-amber-300">5,200 Quintals</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block uppercase">Trend Signal</span>
          <span className={`font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? 'BULLISH INCREASE' : 'BEARISH DROP'}
          </span>
        </div>
      </div>

      {/* SVG Stock Market Candlestick / Area Chart */}
      <div className="relative w-full h-48 bg-black/40 rounded-2xl border border-emerald-500/20 p-2 flex flex-col justify-between overflow-hidden">
        {/* Timeframe Selector Overlay */}
        <div className="absolute top-3 left-3 z-10 flex space-x-1 bg-black/80 p-1 rounded-xl border border-gray-800">
          {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                timeframe === tf
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <line x1="0" y1="40" x2={svgWidth} y2="40" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="0" y1="90" x2={svgWidth} y2="90" stroke="#1f2937" strokeDasharray="3 3" />
          <line x1="0" y1="140" x2={svgWidth} y2="140" stroke="#1f2937" strokeDasharray="3 3" />

          {/* Fill Gradient Area */}
          <polygon points={areaPoints} fill="url(#priceGradient)" />

          {/* Price Line */}
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Node Circles */}
          {history.map((pt, idx) => {
            const x = padding + (idx / (history.length - 1)) * (svgWidth - padding * 2);
            const y = svgHeight - padding - ((pt.price - minPrice) / priceRange) * (svgHeight - padding * 2);
            return (
              <g key={idx}>
                <circle cx={x} cy={y} r="4" fill={strokeColor} className="animate-pulse" />
                <circle cx={x} cy={y} r="8" fill={strokeColor} opacity="0.2" />
              </g>
            );
          })}
        </svg>

        {/* X-Axis Time Labels */}
        <div className="flex justify-between text-[10px] text-gray-500 px-2 font-mono">
          {history.map((h, i) => (
            <span key={i}>{h.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
