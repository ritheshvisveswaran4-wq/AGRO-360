import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sprout,
  Briefcase,
  Globe,
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { setRole, setAdminSuperViewRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [username, setUsername] = useState<string>('ramesh_farmer');
  const [password, setPassword] = useState<string>('••••••••');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    setAdminSuperViewRole(null);
    onClose();
  };

  const handleQuickDemoRole = (targetRole: UserRole) => {
    setSelectedRole(targetRole);
    setRole(targetRole);
    setAdminSuperViewRole(null);
    onClose();
  };

  const roleOptions: { role: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    {
      role: 'farmer',
      title: 'Farmers Portal Login',
      desc: 'Soil reports, AI crop selector, disease doctor, land weather, & pre-orders',
      icon: Sprout,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      role: 'business_agent',
      title: 'Business Agent Portal Login',
      desc: 'Seller, Buyer, and Intermediate broker margin & trading hub',
      icon: Briefcase,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      role: 'export_marketer',
      title: 'Export Marketer Login',
      desc: 'Global demand heatmaps, international commodity pricing, & bulk sourcing',
      icon: Globe,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      role: 'admin',
      title: 'Admin Master Portal Login',
      desc: 'Full access & override privileges across all 3 portals',
      icon: ShieldCheck,
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#09150d] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">AgroPulse 3D Portal Gateway</h2>
              <p className="text-xs text-gray-400">Select your role or click a demo portal to access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-800"
          >
            Close
          </button>
        </div>

        {/* 4 Role Cards Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roleOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedRole === opt.role;
            return (
              <div
                key={opt.role}
                onClick={() => setSelectedRole(opt.role)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? `${opt.color} shadow-lg shadow-emerald-500/10 font-semibold`
                    : 'bg-black/50 border-gray-800 hover:border-gray-700 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-bold text-white">{opt.title}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">{opt.desc}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickDemoRole(opt.role);
                  }}
                  className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Quick Demo Login</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-gray-800 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 font-semibold block mb-1">Username / Phone Number</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl py-2.5 pl-9 pr-3 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 font-semibold block mb-1">Passcode / PIN</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-500/30 rounded-xl py-2.5 pl-9 pr-3 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
          >
            <span>Authenticate & Launch Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
