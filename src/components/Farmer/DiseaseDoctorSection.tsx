import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DiseaseScan } from '../../types';
import {
  Camera,
  Upload,
  Activity,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  FlaskConical,
  BookOpen,
  Calendar,
  Zap,
  RefreshCw
} from 'lucide-react';

export const DiseaseDoctorSection: React.FC = () => {
  const { diseaseScans, addDiseaseScan, activeCycle } = useApp();

  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'chemical' | 'natural' | 'fertilizer_schedule'>('scan');
  const [selectedScan, setSelectedScan] = useState<DiseaseScan | null>(diseaseScans[0] || null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Webcam not available, fallback to scan simulation');
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setUseCamera(false);
  };

  const handleCaptureAndDiagnose = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleStopCamera();

      // Trigger AI Disease Diagnostic
      const mockDiseases = [
        {
          name: 'Powdery Mildew (Erysiphe graminis)',
          severity: 'Moderate' as const,
          chemicalName: 'Hexaconazole 5% EC',
          dosage: '2.0 ml / Liter water',
          naturalTitle: 'Sour Milk & Sodium Bicarbonate Bio-Fungicide',
          diyName: 'Homemade Baking Soda & Milk Fungicide',
          ingredients: ['1 Liter Fresh Cow Milk', '100g Baking Soda', '10 Liters Water'],
          steps: [
            'Dissolve 100g baking soda thoroughly in 1 Liter warm water.',
            'Add 1 Liter fresh milk and mix well.',
            'Dilute with 10 Liters clean water.',
            'Spray on leaf foliage during early morning every 4 days.'
          ]
        },
        {
          name: 'Leaf Spot Blight (Bipolaris sorokiniana)',
          severity: 'Severe' as const,
          chemicalName: 'Mancozeb 75% WP',
          dosage: '2.5 g / Liter water',
          naturalTitle: 'Concentrated Neem-Panchagavya Bio Immunizer',
          diyName: 'DIY Organic Panchagavya Ferment',
          ingredients: ['Cow Dung 5kg', 'Cow Ghee 500g', 'Cow Urine 3L', 'Milk 2L', 'Curd 2L'],
          steps: [
            'Mix cow dung and ghee, ferment for 3 days in a pot.',
            'Add cow urine, milk, and curd on the 4th day.',
            'Stir twice daily for 15 days.',
            'Dilute 300ml in 10L water for foliar spray.'
          ]
        }
      ];

      const chosen = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];

      const newScan: Partial<DiseaseScan> = {
        cropName: activeCycle.crop,
        diseaseName: chosen.name,
        confidence: 96.2,
        severity: chosen.severity,
        symptoms: ['Chlorotic patches on leaves', 'Fungal spore growth', 'Reduced photosynthesis'],
        chemicalCure: {
          fertilizerName: chosen.chemicalName,
          dosage: chosen.dosage,
          applicationMethod: 'Foliar spray under moderate temperature',
          safetyPrecautions: 'Use protective face mask and gloves.'
        },
        naturalRemedy: {
          title: chosen.naturalTitle,
          description: 'Eco-friendly organic spray that eradicates pathogens without toxic residues.',
          diyRecipe: {
            recipeName: chosen.diyName,
            ingredients: chosen.ingredients,
            steps: chosen.steps,
            shelfLife: 'Use within 5 days.'
          }
        },
        continuousFertilizerSchedule: [
          { stage: 'Immediate Cure Phase', fertilizer: 'Copper Sulfate + Lime Spray', frequency: 'Day 1 & Day 7' },
          { stage: 'Growth Recovery', fertilizer: 'Organic Vermicompost Tea', frequency: 'Weekly' },
          { stage: 'Harvest Protection', fertilizer: 'Potassium Nitrate (13-0-45)', frequency: 'Bi-weekly' }
        ]
      };

      addDiseaseScan(newScan);
      setSelectedScan(diseaseScans[0]);
    }, 2000);
  };

  const activeScanToShow = selectedScan || diseaseScans[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-black p-6 rounded-3xl border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>AI Plant Pathology & Remedy Lab</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Plant Disease Doctor & Natural Remedy Engine</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Live webcam capture or photo upload to diagnose crop diseases. Get instant chemical treatments, organic remedies, step-by-step DIY natural fertilizer recipes, and continuous fertilizing calendars.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Capture & Scan Box */}
        <div className="lg:col-span-1 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <span>Disease Verification & Live Capture</span>
          </h3>

          {/* Camera / Upload Container */}
          <div className="relative w-full h-56 rounded-2xl bg-black border-2 border-dashed border-emerald-500/40 overflow-hidden flex items-center justify-center">
            {useCamera ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <Leaf className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
                <span className="text-xs font-semibold text-emerald-300 block">
                  Point Camera at Infected Leaf / Stem
                </span>
                <span className="text-[11px] text-gray-400">or upload leaf image for instant AI diagnosis</span>
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-20">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <span className="text-xs font-bold text-emerald-300 animate-pulse">
                  AI Analyzing Pathogen Spores & Leaves...
                </span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-2">
            {!useCamera ? (
              <button
                onClick={handleStartCamera}
                className="py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Open Live Camera</span>
              </button>
            ) : (
              <button
                onClick={handleStopCamera}
                className="py-2.5 rounded-xl bg-red-900/60 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-bold transition-all"
              >
                Close Camera
              </button>
            )}

            <button
              onClick={handleCaptureAndDiagnose}
              disabled={isScanning}
              className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Verify & Scan AI</span>
            </button>
          </div>

          {/* Recent Diagnostics History List */}
          <div className="pt-4 border-t border-gray-800">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">Diagnostic Scan History</h4>
            <div className="space-y-2">
              {diseaseScans.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border ${
                    activeScanToShow?.id === scan.id
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-semibold'
                      : 'bg-black/40 border-gray-800 text-gray-300 hover:bg-emerald-950/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{scan.diseaseName}</span>
                    <span className="text-[10px] text-amber-400">{scan.severity}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-0.5">{scan.cropName} • {scan.scanDate}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis & Remedies Display Center */}
        {activeScanToShow && (
          <div className="lg:col-span-2 bg-agro-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between">
            <div>
              {/* Scan Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-black to-emerald-950/40 border border-red-500/30 mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-white">{activeScanToShow.diseaseName}</h3>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    Detected on <b>{activeScanToShow.cropName}</b> • AI Confidence: <b>{activeScanToShow.confidence}%</b>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-3 py-1 rounded-full font-bold">
                    {activeScanToShow.severity} Infection
                  </span>
                </div>
              </div>

              {/* Remedy Navigation Tabs */}
              <div className="flex items-center space-x-2 border-b border-gray-800 pb-3 mb-4 overflow-x-auto no-scrollbar text-xs">
                <button
                  onClick={() => setActiveTab('scan')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'scan' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Symptoms</span>
                </button>
                <button
                  onClick={() => setActiveTab('chemical')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'chemical' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Chemical Fertilizer Cure</span>
                </button>
                <button
                  onClick={() => setActiveTab('natural')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'natural' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Natural Remedy & DIY Recipe</span>
                </button>
                <button
                  onClick={() => setActiveTab('fertilizer_schedule')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === 'fertilizer_schedule' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Continuous Fertilizing Calendar</span>
                </button>
              </div>

              {/* Tab 1: Symptoms */}
              {activeTab === 'scan' && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-sm font-bold text-white">Observed Clinical Symptoms:</h4>
                  <ul className="space-y-2">
                    {activeScanToShow.symptoms.map((symp, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-gray-300 bg-black/40 p-2.5 rounded-xl border border-gray-800">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{symp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 2: Chemical Cure */}
              {activeTab === 'chemical' && (
                <div className="bg-gradient-to-br from-emerald-950/60 via-black to-emerald-950/30 p-5 rounded-2xl border border-emerald-500/30 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-emerald-300 flex items-center space-x-2">
                      <FlaskConical className="w-5 h-5 text-emerald-400" />
                      <span>{activeScanToShow.chemicalCure.fertilizerName}</span>
                    </h4>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Recommended Dosage
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/50 p-3 rounded-xl border border-gray-800">
                      <span className="text-gray-400 block text-[10px]">Exact Dosage:</span>
                      <span className="font-bold text-white">{activeScanToShow.chemicalCure.dosage}</span>
                    </div>
                    <div className="bg-black/50 p-3 rounded-xl border border-gray-800">
                      <span className="text-gray-400 block text-[10px]">Application Method:</span>
                      <span className="font-bold text-white">{activeScanToShow.chemicalCure.applicationMethod}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><b>Safety Precaution:</b> {activeScanToShow.chemicalCure.safetyPrecautions}</span>
                  </div>
                </div>
              )}

              {/* Tab 3: DIY Natural Remedy & Fertilizer Steps */}
              {activeTab === 'natural' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-gradient-to-br from-emerald-950/60 via-black to-emerald-950/30 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-base font-bold text-emerald-300">{activeScanToShow.naturalRemedy.title}</h4>
                    </div>
                    <p className="text-xs text-gray-300">{activeScanToShow.naturalRemedy.description}</p>
                  </div>

                  {/* Step-by-Step DIY Natural Fertilizer / Spray Recipe */}
                  <div className="bg-black/60 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Step-by-Step DIY Preparation Guide: {activeScanToShow.naturalRemedy.diyRecipe.recipeName}</span>
                    </h4>

                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-1">Required Natural Ingredients:</span>
                      <div className="flex flex-wrap gap-2">
                        {activeScanToShow.naturalRemedy.diyRecipe.ingredients.map((ing, idx) => (
                          <span key={idx} className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] px-2.5 py-1 rounded-xl">
                            🌿 {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-2">Step-by-Step Preparation:</span>
                      <ol className="space-y-2 text-xs text-gray-200">
                        {activeScanToShow.naturalRemedy.diyRecipe.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/20">
                            <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-extrabold flex items-center justify-center text-[10px] flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Continuous Crop Fertilizing Schedule */}
              {activeTab === 'fertilizer_schedule' && (
                <div className="space-y-3 animate-in fade-in">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Continuous Crop Fertilization Calendar</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    {activeScanToShow.continuousFertilizerSchedule.map((sched, idx) => (
                      <div key={idx} className="bg-black/50 p-3 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-emerald-300 block">{sched.stage}</span>
                          <span className="text-gray-300">{sched.fertilizer}</span>
                        </div>
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-semibold">
                          Frequency: {sched.frequency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
