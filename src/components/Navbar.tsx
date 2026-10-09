import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Sprout,
  Briefcase,
  Globe,
  ShieldCheck,
  UserCheck,
  Zap,
  ChevronRight,
  Sparkles,
  BarChart3,
  Lock,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    adminSuperViewRole,
    setAdminSuperViewRole
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState<boolean>(false);

  const activeViewRole: UserRole = role === 'admin' && adminSuperViewRole ? adminSuperViewRole : role;

  const roleInfo: Record<UserRole, { label: string; icon: any; color: string; bg: string }> = {
    farmer: { label: 'Farmers Portal', icon: Sprout, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    business_agent: { label: 'Business Agent Portal', icon: Briefcase, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    export_marketer: { label: 'Export Marketer Portal', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
    admin: { label: 'Admin Master Control', icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    if (role === 'admin') {
      setAdminSuperViewRole(selectedRole === 'admin' ? null : selectedRole);
    } else {
      setRole(selectedRole);
    }
    setIsRoleMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070d09]/90 backdrop-blur-xl border-b border-emerald-900/40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setRole('farmer')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-green-500 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 group">
            <div className="w-full h-full bg-[#09150d] rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-95">
              <Sprout className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                AgroPulse <span className="text-emerald-400 font-light text-base">3D</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest">
                AI Precision
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Smart Multi-Tier Agro-Market Hub</p>
          </div>
        </div>

        {/* Portal Switcher & User Profile */}
        <div className="flex items-center space-x-3">
          {/* Admin Override Alert Banner if Admin is viewing another portal */}
          {role === 'admin' && adminSuperViewRole && (
            <div className="hidden md:flex items-center space-x-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full text-xs text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
              <span>Admin Super-View Active: <b>{roleInfo[adminSuperViewRole].label}</b></span>
              <button
                onClick={() => setAdminSuperViewRole(null)}
                className="ml-2 text-purple-300 hover:text-white underline font-semibold text-[11px]"
              >
                Exit Super-View
              </button>
            </div>
          )}

          {/* Active Portal Badge Button */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition-all hover:scale-105 ${roleInfo[role].bg}`}
            >
              {React.createElement(roleInfo[role].icon, { className: `w-4 h-4 ${roleInfo[role].color}` })}
              <span className="hidden sm:inline text-gray-200">{roleInfo[role].label}</span>
              <ChevronRight className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isRoleMenuOpen ? 'rotate-90' : ''}`} />
            </button>

            {/* Role Switching Dropdown */}
            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0d1a10] border border-emerald-500/30 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-gray-800 mb-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Switch Portal View</p>
                  {role === 'admin' && (
                    <p className="text-[10px] text-purple-400 mt-0.5">⚡ Admin Master Mode Enabled</p>
                  )}
                </div>

                {(['farmer', 'business_agent', 'export_marketer', 'admin'] as UserRole[]).map((r) => {
                  const info = roleInfo[r];
                  const Icon = info.icon;
                  const isActive = role === r;

                  return (
                    <button
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                        isActive
                          ? 'bg-emerald-900/40 text-emerald-300 font-bold border border-emerald-500/40'
                          : 'text-gray-300 hover:bg-emerald-950/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${info.color}`} />
                        <span>{info.label}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
