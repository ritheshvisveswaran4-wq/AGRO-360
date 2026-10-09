export type UserRole = 'farmer' | 'business_agent' | 'export_marketer' | 'admin';

export type BusinessSide = 'seller' | 'buyer' | 'intermediate';

export type CropType = 'Wheat' | 'Corn / Maize' | 'Onion' | 'Tomato' | 'Rice' | 'Cotton' | 'Sugarcane' | 'Soybean' | 'Potato';

export interface SoilTestReport {
  id: string;
  farmerId: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicCarbon: number;
  ec: number;
  moisture: number;
  soilType: 'Loamy' | 'Clay' | 'Sandy' | 'Black Soil' | 'Red Soil';
  reportDate: string;
  labName: string;
  recommendations?: CropRecommendation[];
}

export interface CropRecommendation {
  crop: CropType;
  suitabilityScore: number;
  expectedYieldPerAcre: string;
  estimatedProfitPerAcre: string;
  soilAmendment: string;
  season: string;
  waterRequirement: 'High' | 'Medium' | 'Low';
}

export interface LandDetails {
  id: string;
  farmerId: string;
  farmerName: string;
  fieldName: string;
  surveyNumber: string;
  areaAcres: number;
  soilType: string;
  irrigationSource: string;
  location: {
    district: string;
    state: string;
    latitude: number;
    longitude: number;
  };
}

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Stormy';
  rainfall: string;
  windSpeed: string;
  uvIndex: number;
  forecast: { day: string; temp: number; condition: string; rainChance: number }[];
  alert?: string;
}

export interface GrowthStage {
  stage: 'Seeding' | 'Germination' | 'Vegetative' | 'Flowering' | 'Yielding' | 'Harvest Ready';
  startDate: string;
  expectedEndDate: string;
  completed: boolean;
  notes: string;
}

export interface CropCycle {
  id: string;
  farmerId: string;
  farmerName: string;
  location: string;
  crop: CropType;
  seedingDate: string;
  expectedHarvestDate: string;
  targetYieldKg: number;
  currentStage: GrowthStage['stage'];
  stages: GrowthStage[];
  landAreaAcres: number;
  status: 'Growing' | 'Harvested' | 'Sold';
  askingPricePerKg: number;
  imageUrl?: string;
}

export interface DiseaseScan {
  id: string;
  farmerId: string;
  cropName: CropType;
  scanDate: string;
  imageUrl?: string;
  diseaseName: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
  chemicalCure: {
    fertilizerName: string;
    dosage: string;
    applicationMethod: string;
    safetyPrecautions: string;
  };
  naturalRemedy: {
    title: string;
    description: string;
    diyRecipe: {
      recipeName: string;
      ingredients: string[];
      steps: string[];
      shelfLife: string;
    };
  };
  continuousFertilizerSchedule: {
    stage: string;
    fertilizer: string;
    frequency: string;
  }[];
}

export interface PricePoint {
  time: string;
  price: number;
  high: number;
  low: number;
  volume: number;
}

export interface LocalMarketItem {
  id: string;
  marketName: string;
  location: string;
  distanceKm: number;
  crop: CropType;
  currentPricePerKg: number;
  previousPricePerKg: number;
  priceTrend: 'up' | 'down' | 'stable';
  changePercentage: number;
  highToday: number;
  lowToday: number;
  demandLevel: 'High Demand' | 'Moderate' | 'Normal';
  estimatedYieldAvailableKg: number;
  contactNumber: string;
  emailId: string;
  whatsappNumber: string;
  contactPerson: string;
  imageUrl?: string;
  priceHistory: PricePoint[];
}

export interface ExportMarketItem {
  id: string;
  country: string;
  port: string;
  crop: CropType;
  bulkQuantityKg: number;
  exportPricePerKgUsd: number;
  localEquivalentPricePerKg: number;
  previousPricePerKgUsd: number;
  priceTrend: 'up' | 'down';
  changePercentage: number;
  highTodayUsd: number;
  lowTodayUsd: number;
  demandUrgency: 'High Global Demand' | 'Normal' | 'Surplus';
  buyerCompany: string;
  contactPerson: string;
  contactNumber: string;
  emailId: string;
  whatsappNumber: string;
  imageUrl?: string;
  flagUrl?: string;
  priceHistory: PricePoint[];
}

export interface SellerProfile {
  id: string;
  farmerName: string;
  location: string;
  crop: CropType;
  availableQuantityKg: number;
  askingPricePerKg: number;
  landAreaAcres: number;
  harvestDate: string;
  organicCertified: boolean;
  contactPhone: string;
  emailId: string;
  whatsappNumber: string;
  imageUrl: string;
}

export interface BuyerProfile {
  id: string;
  companyName: string;
  buyerType: 'Wholesale Mill' | 'Retail Supermarket' | 'Exporter' | 'Direct Consumer';
  location: string;
  requestedCrop: CropType;
  requestedQuantityKg: number;
  offerPricePerKg: number;
  urgency: 'Immediate' | 'Pre-Harvest' | 'Flexible';
  contactPerson: string;
  contactNumber: string;
  emailId: string;
  whatsappNumber: string;
  imageUrl: string;
}

export interface OrderItem {
  id: string;
  orderType: 'Pre-Order' | 'Direct Order';
  marketType: 'Local B2B' | 'Local B2C' | 'Export International';
  crop: CropType;
  quantityKg: number;
  totalPrice: number;
  farmerId: string;
  farmerName: string;
  buyerName: string;
  buyerRole: string;
  orderDate: string;
  harvestDateExpected: string;
  status: 'Pending Approval' | 'Confirmed' | 'Dispatched' | 'Completed';
}

export interface IntermediateDeal {
  id: string;
  crop: CropType;
  quantityKg: number;
  farmerBuyingPricePerKg: number;
  buyerSellingPricePerKg: number;
  farmerId: string;
  farmerName: string;
  endBuyerName: string;
  brokerMarginPerKg: number;
  totalBrokerProfit: number;
  status: 'Negotiating' | 'Locked' | 'Completed';
}
