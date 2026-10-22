import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';
import {
  Shield,
  Stethoscope,
  Users,
  RotateCcw,
  ExternalLink,
  Sparkles,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Modal } from './Modal';

export const DemoRoleBanner: React.FC = () => {
  const { currentRole, switchRole, resetDemoData, currentUser } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
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
        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
        Demo Controls
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <>
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
            <button
              onClick={() => setShowGuideModal(true)}
              className="px-2.5 py-1 rounded-md bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/30 font-semibold flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pitch Guide</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block"></div>

            <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Role:</span>

            <button
              onClick={() => handleRoleSelect('admin')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-all ${
                currentRole === 'admin'
                  ? 'bg-teal-500 text-slate-950 shadow font-semibold'
                  : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
              title="Switch to Administrator view (Dr. Hanna Vance)"
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
                <span>Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 font-medium"
              >
                <span>Website</span>
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
      </div>

      {/* Reset Confirmation Modal */}
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

      {/* Presentation Pitch Guide Modal */}
      {showGuideModal && (
        <Modal
          isOpen={showGuideModal}
          onClose={() => setShowGuideModal(false)}
          title="Mela Leadership Presentation Flow (5-Minute Walkthrough)"
          subtitle="Recommended talking points and flow to showcase the software to Mela's executives."
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-teal-950 space-y-1">
              <strong className="text-sm font-black block">Core Pitch Value Proposition:</strong>
              <p className="leading-relaxed">
                "Mela Special Needs platform unifies what is currently fragmented across phone calls, paper binders, and spreadsheets: parent acquisition, clinical scheduling, standardized SOAP documentation, milestone tracking, and transparent billing."
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Step 1: The Public Website</span>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Trust & Acquisition</span>
                </div>
                <p className="text-slate-600">
                  Showcase the welcoming homepage, clinical services roadmap, specialist bios, and interactive sensory gym tour to demonstrate how new parents feel immediately understood and confident in booking an evaluation.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Step 2: Administrator Operations</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Efficiency & Control</span>
                </div>
                <p className="text-slate-600">
                  Switch to <strong>Admin</strong>. Show the live dashboard metrics, the <strong>Children Directory</strong> with IEP goal tracking, the multi-view calendar (Week/Day/Month), and instant CSV report export.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Step 3: Specialist & Therapist Experience</span>
                  <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">Clinician Productivity</span>
                </div>
                <p className="text-slate-600">
                  Switch to <strong>Therapist (Michael Chen)</strong>. Demonstrate logging a SOAP note (Subjective, Objective, Assessment, Plan) with milestone progress scores and generating a one-click <strong>Printable Progress Report</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Step 4: Dedicated Parent Portal</span>
                  <span className="text-[10px] font-bold bg-gold-100 text-gold-900 border border-gold-300 px-2 py-0.5 rounded">Family Retention</span>
                </div>
                <p className="text-slate-600">
                  Switch to <strong>Parent Portal (Sarah Jenkins)</strong>. Highlight that parents only see their assigned child (Liam), track % goal completion in real time, view recommended home routines, chat with the specialist, and pay superbills online.
                </p>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
              >
                Start Presentation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
