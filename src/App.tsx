import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { FarmerPortal } from './components/Farmer/FarmerPortal';
import { BusinessAgentPortal } from './components/BusinessAgent/BusinessAgentPortal';
import { ExportMarketerPortal } from './components/ExportMarketer/ExportMarketerPortal';
import { AdminPortal } from './components/Admin/AdminPortal';
import { LoginModal } from './components/Auth/LoginModal';
import { UserRole } from './types';
import { Lock, UserCheck, ShieldCheck, Sprout, Briefcase, Globe } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, adminSuperViewRole } = useApp();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // Determine active view role (Admin super-view takes priority if active)
  const activeViewRole: UserRole = role === 'admin' && adminSuperViewRole ? adminSuperViewRole : role;

  return (
    <div className="min-h-screen flex flex-col bg-[#070d09] text-gray-100 font-sans selection:bg-emerald-500 selection:text-black relative">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeViewRole === 'farmer' && <FarmerPortal />}
        {activeViewRole === 'business_agent' && <BusinessAgentPortal />}
        {activeViewRole === 'export_marketer' && <ExportMarketerPortal />}
        {activeViewRole === 'admin' && <AdminPortal />}
      </main>

      {/* Floating Role Login Gateway Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-extrabold text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all border border-emerald-300"
        >
          <Lock className="w-4 h-4" />
          <span>Switch Portal Login</span>
        </button>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
