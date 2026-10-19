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
        className="fixed top-2 right-4 z-50 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-slate-800 transition-all no-print border border-slate-700"
      >
        <Sparkles className="w-3 h-3 text-teal-400" />
        Demo Roles
        <ChevronDown className="w-3 h-3" />
      </button>
    );
  }

  return (
    <>
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-3 sm:px-6 border-b border-slate-800 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Persona badge */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="font-bold text-teal-300 uppercase tracking-wider text-[10px]">
              Demo
            </span>
            <span className="text-slate-400 hidden sm:inline">
              User: <strong className="text-white font-medium">{currentUser.name}</strong>
            </span>
          </div>

          {/* Right: Quick Role Switcher Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                currentRole === 'admin'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Administrator view (Dr. Hanna Vance)"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => handleRoleSelect('therapist')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                currentRole === 'therapist'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Therapist view (Michael Chen - Caseload, SOAP Notes)"
            >
              <Stethoscope className="w-3 h-3" />
              <span>Therapist</span>
            </button>

            <button
              onClick={() => handleRoleSelect('parent')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                currentRole === 'parent'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Parent Portal (Sarah Jenkins - Liam's care)"
            >
              <Users className="w-3 h-3" />
              <span>Parent</span>
            </button>

            <span className="text-slate-700">|</span>

            <button
              onClick={() => setShowGuideModal(true)}
              className="px-2 py-0.5 rounded text-[11px] text-teal-300 hover:text-teal-200 hover:bg-slate-800 flex items-center gap-1 font-semibold"
            >
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline">Pitch Guide</span>
            </button>

            {isPublicPage ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-2 py-0.5 rounded text-[11px] bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 border border-teal-500/30 flex items-center gap-1 font-medium"
              >
                <span>Dashboard</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 font-medium"
              >
                <span>Website</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            )}

            <button
              onClick={() => setShowConfirmReset(true)}
              className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
              title="Reset sample records to initial state"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            <button
              onClick={() => setCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white rounded text-[10px]"
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
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Family Retention</span>
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
