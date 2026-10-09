import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  BusinessSide,
  SoilTestReport,
  LandDetails,
  WeatherData,
  CropCycle,
  DiseaseScan,
  LocalMarketItem,
  ExportMarketItem,
  OrderItem,
  IntermediateDeal,
  SellerProfile,
  BuyerProfile
} from '../types';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  businessSide: BusinessSide;
  setBusinessSide: (side: BusinessSide) => void;
  adminSuperViewRole: UserRole | null;
  setAdminSuperViewRole: (role: UserRole | null) => void;

  // Farmers Data
  soilReport: SoilTestReport | null;
  saveSoilReport: (report: Partial<SoilTestReport>) => void;
  landDetails: LandDetails;
  updateLandDetails: (land: Partial<LandDetails>) => void;
  weatherData: WeatherData;
  activeCycle: CropCycle;
  updateSeedingDate: (seedingDate: string, crop: string) => void;
  diseaseScans: DiseaseScan[];
  addDiseaseScan: (scan: Partial<DiseaseScan>) => void;

  // Multiple Sellers & Buyers
  sellers: SellerProfile[];
  buyers: BuyerProfile[];

  // Market & Orders Data
  localMarkets: LocalMarketItem[];
  exportMarkets: ExportMarketItem[];
  orders: OrderItem[];
  placeOrder: (order: Partial<OrderItem>) => void;
  intermediateDeals: IntermediateDeal[];
  addIntermediateDeal: (deal: Partial<IntermediateDeal>) => void;
  b2bMode: boolean;
  setB2bMode: (mode: boolean) => void;

  // Admin Actions
  updateMarketPrice: (marketId: string, newPrice: number) => void;
  updateFarmerRecord: (farmerId: string, updatedCycle: Partial<CropCycle>) => void;
  updateDiseaseRecord: (diseaseId: string, updatedScan: Partial<DiseaseScan>) => void;
}

const initialSoilReport: SoilTestReport = {
  id: 'SOIL-8842',
  farmerId: 'FARM-101',
  nitrogen: 210,
  phosphorus: 42,
  potassium: 195,
  ph: 6.8,
  organicCarbon: 0.72,
  ec: 0.85,
  moisture: 28,
  soilType: 'Loamy',
  reportDate: '2026-09-15',
  labName: 'AgriTech Central Soils Lab',
  recommendations: [
    {
      crop: 'Wheat',
      suitabilityScore: 96,
      expectedYieldPerAcre: '2,400 kg',
      estimatedProfitPerAcre: '$1,850',
      soilAmendment: 'Add 25 kg/acre Urea before sowing',
      season: 'Rabi / Winter',
      waterRequirement: 'Medium',
    },
    {
      crop: 'Corn / Maize',
      suitabilityScore: 91,
      expectedYieldPerAcre: '3,100 kg',
      estimatedProfitPerAcre: '$2,100',
      soilAmendment: 'Incorporate Zinc Sulphate 10 kg/acre',
      season: 'Kharif / Monsoon',
      waterRequirement: 'Medium',
    },
    {
      crop: 'Onion',
      suitabilityScore: 88,
      expectedYieldPerAcre: '8,500 kg',
      estimatedProfitPerAcre: '$3,400',
      soilAmendment: 'Apply Sulfur 15 kg/acre for bulb growth',
      season: 'Late Kharif',
      waterRequirement: 'High',
    },
  ],
};

const initialLandDetails: LandDetails = {
  id: 'LAND-402',
  farmerId: 'FARM-101',
  farmerName: 'Ramesh Patel',
  fieldName: 'Green Valley Plot A',
  surveyNumber: 'SY-772/3',
  areaAcres: 3.5,
  soilType: 'Rich Loamy Soil',
  irrigationSource: 'Solar Borewell + Drip Irrigation',
  location: {
    district: 'Nashik',
    state: 'Maharashtra',
    latitude: 20.0063,
    longitude: 73.7898,
  },
};

const initialWeatherData: WeatherData = {
  temp: 29.4,
  humidity: 62,
  condition: 'Sunny',
  rainfall: '0.0 mm',
  windSpeed: '12 km/h NE',
  uvIndex: 7,
  alert: 'Optimal condition for sowing & fertigation today.',
  forecast: [
    { day: 'Mon', temp: 29, condition: 'Sunny', rainChance: 5 },
    { day: 'Tue', temp: 30, condition: 'Partly Cloudy', rainChance: 15 },
    { day: 'Wed', temp: 28, condition: 'Rainy', rainChance: 70 },
    { day: 'Thu', temp: 27, condition: 'Cloudy', rainChance: 40 },
    { day: 'Fri', temp: 29, condition: 'Sunny', rainChance: 10 },
  ],
};

const initialCropCycle: CropCycle = {
  id: 'CYCLE-2026-01',
  farmerId: 'FARM-101',
  farmerName: 'Ramesh Patel',
  location: 'Nashik, Maharashtra',
  crop: 'Wheat',
  seedingDate: '2026-09-01',
  expectedHarvestDate: '2026-12-20',
  targetYieldKg: 8400,
  currentStage: 'Vegetative',
  landAreaAcres: 3.5,
  status: 'Growing',
  askingPricePerKg: 32.50,
  imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
  stages: [
    { stage: 'Seeding', startDate: '2026-09-01', expectedEndDate: '2026-09-07', completed: true, notes: 'Seeds feeded with Bio-fertilizer treatment.' },
    { stage: 'Germination', startDate: '2026-09-08', expectedEndDate: '2026-09-16', completed: true, notes: '95% germination rate observed.' },
    { stage: 'Vegetative', startDate: '2026-09-17', expectedEndDate: '2026-10-25', completed: false, notes: 'Active tillering stage.' },
    { stage: 'Flowering', startDate: '2026-10-26', expectedEndDate: '2026-11-20', completed: false, notes: 'Maintain steady moisture.' },
    { stage: 'Yielding', startDate: '2026-11-21', expectedEndDate: '2026-12-10', completed: false, notes: 'Grain filling stage.' },
    { stage: 'Harvest Ready', startDate: '2026-12-11', expectedEndDate: '2026-12-20', completed: false, notes: 'Final moisture check.' },
  ],
};

const initialSellers: SellerProfile[] = [
  {
    id: 'SELL-101',
    farmerName: 'Ramesh Patel',
    location: 'Panchavati, Nashik',
    crop: 'Wheat',
    availableQuantityKg: 8400,
    askingPricePerKg: 32.50,
    landAreaAcres: 3.5,
    harvestDate: '2026-12-20',
    organicCertified: true,
    contactPhone: '+91 98230 11223',
    emailId: 'ramesh.patel@agropulse.org',
    whatsappNumber: '+919823011223',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SELL-102',
    farmerName: 'Suresh Deshmukh',
    location: 'Lasalgaon, Nashik',
    crop: 'Onion',
    availableQuantityKg: 25000,
    askingPricePerKg: 48.00,
    landAreaAcres: 5.0,
    harvestDate: '2026-11-15',
    organicCertified: false,
    contactPhone: '+91 98221 44556',
    emailId: 'suresh.onion@lasalgaonmandi.in',
    whatsappNumber: '+919822144556',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SELL-103',
    farmerName: 'Aniket Shinde',
    location: 'Gultekdi, Pune',
    crop: 'Corn / Maize',
    availableQuantityKg: 14000,
    askingPricePerKg: 24.80,
    landAreaAcres: 4.2,
    harvestDate: '2026-10-30',
    organicCertified: true,
    contactPhone: '+91 98900 88776',
    emailId: 'aniket.shinde@punefarms.com',
    whatsappNumber: '+919890088776',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'SELL-104',
    farmerName: 'Sunita Bhosale',
    location: 'Vashi, Navi Mumbai',
    crop: 'Tomato',
    availableQuantityKg: 12000,
    askingPricePerKg: 38.00,
    landAreaAcres: 2.8,
    harvestDate: '2026-11-05',
    organicCertified: true,
    contactPhone: '+91 98199 22334',
    emailId: 'sunita.tomatoes@vashiorganics.in',
    whatsappNumber: '+919819922334',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  }
];

const initialBuyers: BuyerProfile[] = [
  {
    id: 'BUY-201',
    companyName: 'Apex Food Processing Mills Ltd',
    buyerType: 'Wholesale Mill',
    location: 'Industrial Zone, Nashik',
    requestedCrop: 'Wheat',
    requestedQuantityKg: 15000,
    offerPricePerKg: 33.00,
    urgency: 'Pre-Harvest',
    contactPerson: 'Vikram Mehta',
    contactNumber: '+91 98200 55443',
    emailId: 'procurement@apexfoods.co.in',
    whatsappNumber: '+919820055443',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'BUY-202',
    companyName: 'Metro Supermarket Retail Chain',
    buyerType: 'Retail Supermarket',
    location: 'Bandra West, Mumbai',
    requestedCrop: 'Onion',
    requestedQuantityKg: 8000,
    offerPricePerKg: 49.50,
    urgency: 'Immediate',
    contactPerson: 'Rajesh Shah',
    contactNumber: '+91 98190 77665',
    emailId: 'sourcing@metrosupermarket.in',
    whatsappNumber: '+919819077665',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'BUY-203',
    companyName: 'FreshDirect Organic Outlets',
    buyerType: 'Direct Consumer',
    location: 'Koregaon Park, Pune',
    requestedCrop: 'Tomato',
    requestedQuantityKg: 5000,
    offerPricePerKg: 40.00,
    urgency: 'Immediate',
    contactPerson: 'Pooja Roy',
    contactNumber: '+91 98901 33221',
    emailId: 'orders@freshdirectorganics.com',
    whatsappNumber: '+919890133221',
    imageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'BUY-204',
    companyName: 'Al-Madina Global Produce FZE',
    buyerType: 'Exporter',
    location: 'Jebel Ali Port, Dubai (UAE)',
    requestedCrop: 'Onion',
    requestedQuantityKg: 50000,
    offerPricePerKg: 70.50,
    urgency: 'Immediate',
    contactPerson: 'Tariq Al-Mansoor',
    contactNumber: '+971 4 881 2234',
    emailId: 'trade@almadinaglobal.ae',
    whatsappNumber: '+97148812234',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80'
  }
];

const initialDiseaseScans: DiseaseScan[] = [
  {
    id: 'DISEASE-901',
    farmerId: 'FARM-101',
    cropName: 'Wheat',
    scanDate: '2026-09-18',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    diseaseName: 'Yellow Rust (Puccinia striiformis)',
    confidence: 94.8,
    severity: 'Moderate',
    symptoms: ['Yellow linear stripes of pustules on leaf surface', 'Powdery yellow spores', 'Stunted leaf growth'],
    chemicalCure: {
      fertilizerName: 'Propiconazole 25% EC Fungicide',
      dosage: '1.0 ml per liter of water (200 ml / acre)',
      applicationMethod: 'Foliar spray during early morning hours',
      safetyPrecautions: 'Wear protective mask and gloves. Observe 14-day pre-harvest interval.',
    },
    naturalRemedy: {
      title: 'Bio-Fungicidal Fermented Buttermilk & Garlic Spray',
      description: 'Sour buttermilk contains lactic acid bacteria and natural antimicrobial compounds that suppress fungal rust spores effectively without damaging earthworms.',
      diyRecipe: {
        recipeName: 'Fermented Neem-Garlic-Buttermilk Spray',
        ingredients: [
          '5 Liters Fresh Cow Buttermilk (Fermented for 5 days in a copper vessel)',
          '500g Crushed Fresh Garlic Cloves',
          '1 kg Fresh Neem Leaf Extract',
          '50 Liters Clean Water'
        ],
        steps: [
          'Mix 5L fermented sour buttermilk with crushed garlic in a 10L bucket.',
          'Boil 1kg neem leaves in 5L water for 20 mins, cool down, and filter.',
          'Combine the neem extract with buttermilk mixture and strain through a fine cloth.',
          'Dilute with 50 Liters of water and spray thoroughly on infected leaves every 5 days.'
        ],
        shelfLife: 'Use within 3 days of preparation.'
      }
    },
    continuousFertilizerSchedule: [
      { stage: 'Vegetative (Week 3)', fertilizer: 'Organic Vermicompost Tea + Zinc Sulphate', frequency: 'Once every 10 days' },
      { stage: 'Flowering (Week 7)', fertilizer: 'Pottasium Nitrate (13-0-45) Foliar Spray', frequency: 'Twice during bloom' },
      { stage: 'Grain Formation (Week 11)', fertilizer: 'Boron 20% Spray (1g/L)', frequency: 'Single spray at early seed set' }
    ]
  }
];

const initialLocalMarkets: LocalMarketItem[] = [
  {
    id: 'MKT-01',
    marketName: 'Nashik APMC Main Wholesale Market',
    location: 'Panchavati, Nashik (4.2 km away)',
    distanceKm: 4.2,
    crop: 'Wheat',
    currentPricePerKg: 32.50,
    previousPricePerKg: 30.00,
    priceTrend: 'up',
    changePercentage: +8.3,
    highToday: 34.00,
    lowToday: 29.50,
    demandLevel: 'High Demand',
    estimatedYieldAvailableKg: 12500,
    contactNumber: '+91 98230 11223',
    emailId: 'nashik.apmc@maharashtra.gov.in',
    whatsappNumber: '+919823011223',
    contactPerson: 'Secretary Patil',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { time: '09:00', price: 30.00, high: 30.50, low: 29.80, volume: 1200 },
      { time: '10:30', price: 31.20, high: 31.80, low: 30.50, volume: 2400 },
      { time: '12:00', price: 30.80, high: 31.50, low: 30.40, volume: 1800 },
      { time: '13:30', price: 32.00, high: 32.50, low: 31.00, volume: 3800 },
      { time: '15:00', price: 31.90, high: 32.80, low: 31.50, volume: 2900 },
      { time: '16:30', price: 33.40, high: 34.00, low: 32.10, volume: 4500 },
      { time: 'Live', price: 32.50, high: 34.00, low: 29.50, volume: 5200 },
    ]
  },
  {
    id: 'MKT-02',
    marketName: 'Lasalgaon Agro Trading Terminal',
    location: 'Lasalgaon, Maharashtra (28 km away)',
    distanceKm: 28,
    crop: 'Onion',
    currentPricePerKg: 48.00,
    previousPricePerKg: 52.00,
    priceTrend: 'down',
    changePercentage: -7.6,
    highToday: 53.50,
    lowToday: 46.00,
    demandLevel: 'High Demand',
    estimatedYieldAvailableKg: 45000,
    contactNumber: '+91 98221 44556',
    emailId: 'lasalgaon.oniondesk@agri.in',
    whatsappNumber: '+919822144556',
    contactPerson: 'Trader Deshmukh',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { time: '09:00', price: 52.00, high: 53.50, low: 51.50, volume: 3200 },
      { time: '10:30', price: 51.00, high: 52.20, low: 50.50, volume: 4400 },
      { time: '12:00', price: 49.50, high: 51.00, low: 48.80, volume: 6800 },
      { time: '13:30', price: 48.80, high: 50.00, low: 47.50, volume: 7800 },
      { time: '15:00', price: 47.20, high: 49.00, low: 46.00, volume: 8900 },
      { time: 'Live', price: 48.00, high: 53.50, low: 46.00, volume: 10200 },
    ]
  },
  {
    id: 'MKT-03',
    marketName: 'Pune Grain & Commodity Yard',
    location: 'Gultekdi, Pune (160 km away)',
    distanceKm: 160,
    crop: 'Corn / Maize',
    currentPricePerKg: 24.80,
    previousPricePerKg: 24.00,
    priceTrend: 'up',
    changePercentage: +3.3,
    highToday: 26.00,
    lowToday: 23.50,
    demandLevel: 'Moderate',
    estimatedYieldAvailableKg: 28000,
    contactNumber: '+91 98900 88776',
    emailId: 'punegrain.desk@apmc.org',
    whatsappNumber: '+919890088776',
    contactPerson: 'Officer Shinde',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { time: '09:00', price: 24.00, high: 24.50, low: 23.80, volume: 1500 },
      { time: '12:00', price: 24.40, high: 24.90, low: 24.00, volume: 2800 },
      { time: '15:00', price: 25.10, high: 26.00, low: 24.60, volume: 4100 },
      { time: 'Live', price: 24.80, high: 26.00, low: 23.50, volume: 4800 },
    ]
  },
  {
    id: 'MKT-04',
    marketName: 'Mumbai Central Vegetable Mandi',
    location: 'Vashi, Navi Mumbai (170 km away)',
    distanceKm: 170,
    crop: 'Tomato',
    currentPricePerKg: 38.00,
    previousPricePerKg: 34.00,
    priceTrend: 'up',
    changePercentage: +11.7,
    highToday: 41.00,
    lowToday: 33.50,
    demandLevel: 'High Demand',
    estimatedYieldAvailableKg: 18000,
    contactNumber: '+91 98199 22334',
    emailId: 'vashi.veggie.mandi@mumbaiapmc.in',
    whatsappNumber: '+919819922334',
    contactPerson: 'Director Bhosale',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    priceHistory: [
      { time: '09:00', price: 34.00, high: 35.00, low: 33.50, volume: 2200 },
      { time: '12:00', price: 36.50, high: 37.80, low: 35.50, volume: 3900 },
      { time: '15:00', price: 39.20, high: 41.00, low: 38.00, volume: 5100 },
      { time: 'Live', price: 38.00, high: 41.00, low: 33.50, volume: 6400 },
    ]
  }
];

const initialExportMarkets: ExportMarketItem[] = [
  {
    id: 'EXP-101',
    country: 'United Arab Emirates (Dubai)',
    port: 'Jebel Ali Port, Dubai',
    crop: 'Onion',
    bulkQuantityKg: 50000,
    exportPricePerKgUsd: 0.85,
    localEquivalentPricePerKg: 70.50,
    previousPricePerKgUsd: 0.75,
    priceTrend: 'up',
    changePercentage: 14.2,
    highTodayUsd: 0.88,
    lowTodayUsd: 0.72,
    demandUrgency: 'High Global Demand',
    buyerCompany: 'Al-Madina Global Produce FZE',
    contactPerson: 'Tariq Al-Mansoor',
    contactNumber: '+971 4 881 2234',
    emailId: 'trade@almadinaglobal.ae',
    whatsappNumber: '+97148812234',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
    flagUrl: '🇦🇪',
    priceHistory: [
      { time: '09:00', price: 0.75, high: 0.77, low: 0.74, volume: 15000 },
      { time: '11:00', price: 0.79, high: 0.81, low: 0.78, volume: 28000 },
      { time: '14:00', price: 0.83, high: 0.86, low: 0.82, volume: 42000 },
      { time: 'Live', price: 0.85, high: 0.88, low: 0.72, volume: 50000 },
    ]
  },
  {
    id: 'EXP-102',
    country: 'Singapore',
    port: 'Jurong Port, Singapore',
    crop: 'Wheat',
    bulkQuantityKg: 100000,
    exportPricePerKgUsd: 0.52,
    localEquivalentPricePerKg: 43.10,
    previousPricePerKgUsd: 0.49,
    priceTrend: 'up',
    changePercentage: 6.8,
    highTodayUsd: 0.54,
    lowTodayUsd: 0.48,
    demandUrgency: 'High Global Demand',
    buyerCompany: 'Pacific Agri Imports Ltd',
    contactPerson: 'Chen Wei',
    contactNumber: '+65 6789 1122',
    emailId: 'sourcing@pacificagri.sg',
    whatsappNumber: '+6567891122',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    flagUrl: '🇸🇬',
    priceHistory: [
      { time: '09:00', price: 0.49, high: 0.50, low: 0.48, volume: 30000 },
      { time: '13:00', price: 0.51, high: 0.53, low: 0.50, volume: 65000 },
      { time: 'Live', price: 0.52, high: 0.54, low: 0.48, volume: 100000 },
    ]
  },
  {
    id: 'EXP-103',
    country: 'Netherlands (Rotterdam)',
    port: 'Port of Rotterdam',
    crop: 'Rice',
    bulkQuantityKg: 75000,
    exportPricePerKgUsd: 1.15,
    localEquivalentPricePerKg: 95.40,
    previousPricePerKgUsd: 1.05,
    priceTrend: 'up',
    changePercentage: 9.1,
    highTodayUsd: 1.20,
    lowTodayUsd: 1.02,
    demandUrgency: 'High Global Demand',
    buyerCompany: 'EuroAgro Distribution B.V.',
    contactPerson: 'Jan De Jong',
    contactNumber: '+31 10 412 8890',
    emailId: 'imports@euroagro.nl',
    whatsappNumber: '+31104128890',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    flagUrl: '🇳🇱',
    priceHistory: [
      { time: '09:00', price: 1.05, high: 1.08, low: 1.02, volume: 20000 },
      { time: '13:00', price: 1.12, high: 1.16, low: 1.10, volume: 48000 },
      { time: 'Live', price: 1.15, high: 1.20, low: 1.02, volume: 75000 },
    ]
  }
];

const initialOrders: OrderItem[] = [
  {
    id: 'ORD-7001',
    orderType: 'Pre-Order',
    marketType: 'Local B2B',
    crop: 'Wheat',
    quantityKg: 3000,
    totalPrice: 97500,
    farmerId: 'FARM-101',
    farmerName: 'Ramesh Patel',
    buyerName: 'Apex Agro Processing Ltd',
    buyerRole: 'Business Agent',
    orderDate: '2026-09-19',
    harvestDateExpected: '2026-12-20',
    status: 'Confirmed'
  },
  {
    id: 'ORD-7002',
    orderType: 'Pre-Order',
    marketType: 'Export International',
    crop: 'Onion',
    quantityKg: 1000,
    totalPrice: 70500,
    farmerId: 'FARM-101',
    farmerName: 'Ramesh Patel',
    buyerName: 'Al-Madina Global Produce',
    buyerRole: 'Export Marketer',
    orderDate: '2026-09-20',
    harvestDateExpected: '2026-12-25',
    status: 'Pending Approval'
  }
];

const initialIntermediateDeals: IntermediateDeal[] = [
  {
    id: 'DEAL-301',
    crop: 'Wheat',
    quantityKg: 5000,
    farmerBuyingPricePerKg: 30.00,
    buyerSellingPricePerKg: 34.50,
    farmerId: 'FARM-101',
    farmerName: 'Ramesh Patel',
    endBuyerName: 'Metro Food Processors',
    brokerMarginPerKg: 4.50,
    totalBrokerProfit: 22500,
    status: 'Locked'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('farmer');
  const [businessSide, setBusinessSide] = useState<BusinessSide>('buyer');
  const [adminSuperViewRole, setAdminSuperViewRole] = useState<UserRole | null>(null);

  const [soilReport, setSoilReport] = useState<SoilTestReport | null>(initialSoilReport);
  const [landDetails, setLandDetails] = useState<LandDetails>(initialLandDetails);
  const [weatherData] = useState<WeatherData>(initialWeatherData);
  const [activeCycle, setActiveCycle] = useState<CropCycle>(initialCropCycle);
  const [diseaseScans, setDiseaseScans] = useState<DiseaseScan[]>(initialDiseaseScans);

  const [sellers] = useState<SellerProfile[]>(initialSellers);
  const [buyers] = useState<BuyerProfile[]>(initialBuyers);

  const [localMarkets, setLocalMarkets] = useState<LocalMarketItem[]>(initialLocalMarkets);
  const [exportMarkets] = useState<ExportMarketItem[]>(initialExportMarkets);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [intermediateDeals, setIntermediateDeals] = useState<IntermediateDeal[]>(initialIntermediateDeals);
  const [b2bMode, setB2bMode] = useState<boolean>(true);

  // Soil & Land updates
  const saveSoilReport = (report: Partial<SoilTestReport>) => {
    setSoilReport(prev => ({
      ...initialSoilReport,
      ...prev,
      ...report,
      id: `SOIL-${Math.floor(1000 + Math.random() * 9000)}`,
      reportDate: new Date().toISOString().split('T')[0]
    }));
  };

  const updateLandDetails = (land: Partial<LandDetails>) => {
    setLandDetails(prev => ({ ...prev, ...land }));
  };

  const updateSeedingDate = (seedingDate: string, cropName: string) => {
    const seedDateObj = new Date(seedingDate);
    const harvestDateObj = new Date(seedDateObj);
    harvestDateObj.setDate(harvestDateObj.getDate() + 110);

    setActiveCycle(prev => ({
      ...prev,
      crop: cropName as any,
      seedingDate,
      expectedHarvestDate: harvestDateObj.toISOString().split('T')[0],
      currentStage: 'Seeding',
      stages: prev.stages.map((s, idx) => ({
        ...s,
        completed: idx === 0,
        startDate: idx === 0 ? seedingDate : s.startDate
      }))
    }));
  };

  const addDiseaseScan = (scan: Partial<DiseaseScan>) => {
    const newScan: DiseaseScan = {
      id: `DISEASE-${Math.floor(100 + Math.random() * 900)}`,
      farmerId: 'FARM-101',
      cropName: activeCycle.crop,
      scanDate: new Date().toISOString().split('T')[0],
      diseaseName: scan.diseaseName || 'Leaf Spot Infection',
      confidence: scan.confidence || 92.5,
      severity: scan.severity || 'Moderate',
      symptoms: scan.symptoms || ['Spots on leaves', 'Mild chlorosis'],
      chemicalCure: scan.chemicalCure || {
        fertilizerName: 'Copper Oxychloride 50% WP',
        dosage: '2.5g per Liter water',
        applicationMethod: 'Foliar spray twice at 7-day intervals',
        safetyPrecautions: 'Avoid spraying during hot sunny noon hours.'
      },
      naturalRemedy: scan.naturalRemedy || {
        title: 'Neem-Garlic Bio Spray',
        description: 'Natural antiseptic spray that halts fungal spread safely.',
        diyRecipe: {
          recipeName: 'DIY Neem Oil & Soap Emulsion',
          ingredients: ['100ml Pure Neem Oil', '20ml Liquid Organic Soap', '10L Water'],
          steps: ['Mix soap into water.', 'Add neem oil slowly while stirring.', 'Spray thoroughly.'],
          shelfLife: 'Use within 24 hours.'
        }
      },
      continuousFertilizerSchedule: scan.continuousFertilizerSchedule || [
        { stage: 'Active Recovery', fertilizer: 'Seaweed Liquid Extract', frequency: 'Weekly spray' }
      ]
    };

    setDiseaseScans(prev => [newScan, ...prev]);
  };

  const placeOrder = (order: Partial<OrderItem>) => {
    const newOrder: OrderItem = {
      id: `ORD-${Math.floor(7000 + Math.random() * 1000)}`,
      orderType: order.orderType || 'Pre-Order',
      marketType: order.marketType || 'Local B2B',
      crop: order.crop || activeCycle.crop,
      quantityKg: order.quantityKg || 500,
      totalPrice: order.totalPrice || 16250,
      farmerId: 'FARM-101',
      farmerName: 'Ramesh Patel',
      buyerName: order.buyerName || 'Business Buyer',
      buyerRole: role === 'export_marketer' ? 'Export Marketer' : 'Business Agent',
      orderDate: new Date().toISOString().split('T')[0],
      harvestDateExpected: activeCycle.expectedHarvestDate,
      status: 'Confirmed'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const addIntermediateDeal = (deal: Partial<IntermediateDeal>) => {
    const qty = deal.quantityKg || 1000;
    const buyPrice = deal.farmerBuyingPricePerKg || 30;
    const sellPrice = deal.buyerSellingPricePerKg || 35;
    const margin = sellPrice - buyPrice;

    const newDeal: IntermediateDeal = {
      id: `DEAL-${Math.floor(300 + Math.random() * 900)}`,
      crop: deal.crop || activeCycle.crop,
      quantityKg: qty,
      farmerBuyingPricePerKg: buyPrice,
      buyerSellingPricePerKg: sellPrice,
      farmerId: 'FARM-101',
      farmerName: 'Ramesh Patel',
      endBuyerName: deal.endBuyerName || 'Regional Grain Outlet',
      brokerMarginPerKg: margin,
      totalBrokerProfit: margin * qty,
      status: 'Locked'
    };
    setIntermediateDeals(prev => [newDeal, ...prev]);
  };

  const updateMarketPrice = (marketId: string, newPrice: number) => {
    setLocalMarkets(prev =>
      prev.map(m => {
        if (m.id === marketId) {
          const trend = newPrice >= m.currentPricePerKg ? 'up' : 'down';
          const change = parseFloat((((newPrice - m.currentPricePerKg) / m.currentPricePerKg) * 100).toFixed(1));
          return {
            ...m,
            previousPricePerKg: m.currentPricePerKg,
            currentPricePerKg: newPrice,
            priceTrend: trend,
            changePercentage: change,
            highToday: Math.max(m.highToday, newPrice),
            lowToday: Math.min(m.lowToday, newPrice)
          };
        }
        return m;
      })
    );
  };

  const updateFarmerRecord = (farmerId: string, updated: Partial<CropCycle>) => {
    setActiveCycle(prev => ({ ...prev, ...updated }));
  };

  const updateDiseaseRecord = (diseaseId: string, updated: Partial<DiseaseScan>) => {
    setDiseaseScans(prev =>
      prev.map(d => (d.id === diseaseId ? { ...d, ...updated } : d))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        businessSide,
        setBusinessSide,
        adminSuperViewRole,
        setAdminSuperViewRole,
        soilReport,
        saveSoilReport,
        landDetails,
        updateLandDetails,
        weatherData,
        activeCycle,
        updateSeedingDate,
        diseaseScans,
        addDiseaseScan,
        sellers,
        buyers,
        localMarkets,
        exportMarkets,
        orders,
        placeOrder,
        intermediateDeals,
        addIntermediateDeal,
        b2bMode,
        setB2bMode,
        updateMarketPrice,
        updateFarmerRecord,
        updateDiseaseRecord
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
