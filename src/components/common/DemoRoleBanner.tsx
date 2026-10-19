import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';
import { Shield, Stethoscope, Users, RotateCcw, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';

export const DemoRoleBanner: React.FC = () => {
  const { currentRole, switchRole, resetDemoData, currentUser } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isPublicPage = ['/', '/about', '/services', '/team', '/programs', '/gallery', '/faq', '/contact'].includes(location.pathname);

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    if (role === 'parent') {
      navigate('/parent');
    } else {
      if (location.pathname.startsWith('/parent')) {
        navigate('/dashboard');
      }
    }
  };

  const handleReset = () => {
    resetDemoData();
    setShowConfirmReset(false);
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed top-2 right-4 z-50 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-slate-800 transition-all no-print border border-slate-700"
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        Demo Controls
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white text-xs py-2 px-3 sm:px-6 shadow-md border-b border-teal-800/40 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="font-bold tracking-wide uppercase text-[10px] text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-700/50">
            Interactive Demo
          </span>
          <span className="text-slate-300 hidden md:inline">
            Active Persona: <strong className="text-white font-medium">{currentUser.name}</strong> ({currentUser.title})
          </span>
        </div>

        {/* Quick Persona Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Switch Role:</span>

          <button
            onClick={() => handleRoleSelect('admin')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              currentRole === 'admin'
                ? 'bg-teal-500 text-slate-950 shadow font-semibold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Switch to Administrator view (Full management platform)"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => handleRoleSelect('therapist')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              currentRole === 'therapist'
                ? 'bg-teal-500 text-slate-950 shadow font-semibold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Switch to Therapist view (Michael Chen - Caseload, SOAP Notes)"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Therapist</span>
          </button>

          <button
            onClick={() => handleRoleSelect('parent')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              currentRole === 'parent'
                ? 'bg-teal-500 text-slate-950 shadow font-semibold'
                : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Switch to Parent Portal (Sarah Jenkins - Liam's care, appointments)"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Parent Portal</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block"></div>

          {isPublicPage ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-2.5 py-1 rounded-md bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 border border-teal-500/30 flex items-center gap-1 font-medium"
            >
              <span>Go to Platform</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 font-medium"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-2 py-1 rounded-md text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors flex items-center gap-1 ml-1"
            title="Reset demo data to initial pristine values"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset</span>
          </button>

          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-white px-1.5 py-1 text-[11px]"
            title="Minimize banner"
          >
            ✕
          </button>
        </div>
      </div>

      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-500" />
              Reset Demo Data?
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              This will restore all sample records (children, appointments, session notes, and invoices) back to their fresh presentation baseline.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow transition-colors"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
