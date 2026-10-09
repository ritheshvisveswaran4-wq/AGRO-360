import React, { useState } from 'react';
import { SoilTestSection } from './SoilTestSection';
import { LandWeatherSection } from './LandWeatherSection';
import { SeedingLifecycleSection } from './SeedingLifecycleSection';
import { DiseaseDoctorSection } from './DiseaseDoctorSection';
import { LocalMarketSection } from './LocalMarketSection';
import { ComprehensiveReportSection } from './ComprehensiveReportSection';
import {
  FlaskConical,
  MapPin,
  Calendar,
  Activity,
  Store,
  FileText,
  Sprout,
  Sparkles,
  TrendingUp,
  CloudSun
} from 'lucide-react';

export const FarmerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'soil' | 'land_weather' | 'seeding' | 'disease' | 'market' | 'report'>('soil');

  const tabs = [
    { id: 'soil', label: 'Soil Test & AI Crops', icon: FlaskConical },
    { id: 'land_weather', label: 'Land & Weather', icon: MapPin },
    { id: 'seeding', label: 'Seeding & Growth 3D', icon: Calendar },
    { id: 'disease', label: 'Disease Doctor & DIY Remedy', icon: Activity },
    { id: 'market', label: 'Local Market & Pre-Orders', icon: Store },
    { id: 'report', label: 'Master Report Page', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center space-x-2 bg-agro-card p-2 rounded-2xl border border-emerald-500/20 shadow-xl overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-gray-300 hover:bg-emerald-950/40 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-emerald-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Farmer Tab */}
      <div>
        {activeTab === 'soil' && <SoilTestSection />}
        {activeTab === 'land_weather' && <LandWeatherSection />}
        {activeTab === 'seeding' && <SeedingLifecycleSection />}
        {activeTab === 'disease' && <DiseaseDoctorSection />}
        {activeTab === 'market' && <LocalMarketSection />}
        {activeTab === 'report' && <ComprehensiveReportSection />}
      </div>
    </div>
  );
};
