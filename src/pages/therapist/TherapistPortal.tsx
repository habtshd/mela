import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Calendar,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Play,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Bookmark,
  ChevronDown,
  X,
  Printer
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../../components/common/Modal';

// Clinical Domain Tags adapted from Brightside reference
const DOMAIN_OPTIONS = [
  'Communication & AAC',
  'Engagement & Focus',
  'Behavioral Regulation (ABA)',
  'Fine & Gross Motor Skills',
  'Social & Play Skills',
  'Sensory Integration'
];

// Rapid 1-Click Clinical Observation Chips
const HIGHLIGHT_TEMPLATES = [
  { keyword: 'Sign Language', text: 'Independently used EthSL gestures' },
  { keyword: 'Requesting', text: 'Used pointing & AAC board to make requests' },
  { keyword: 'Engagement', text: 'Successfully completed structured tasks' },
  { keyword: 'Focus', text: 'Maintained 15+ mins sustained attention' },
  { keyword: 'Prompting', text: 'Required minimal verbal prompting' },
  { keyword: 'Regulation', text: 'Remained calm and behaviorally regulated' },
  { keyword: 'Transitions', text: 'Smooth transitions between activity stations' },
  { keyword: 'Social', text: 'Shared positive joint attention & eye contact' }
];

export const TherapistPortal: React.FC = () => {
  const {
    currentUser,
    therapists,
    childrenList,
    appointments,
    sessions,
    addSession,
    updateAppointment,
    showToast
  } = useDemo();

  const navigate = useNavigate();

  const currentTherapist = therapists.find((t) => t.id === 'therapist-1') || therapists[0];
  const myChildren = childrenList.filter(
    (c) => c.assignedTherapistId === currentTherapist.id || c.assignedTherapistName.includes(currentTherapist.name)
  );

  const todayDate = '2026-10-19';
  const myAppointments = appointments.filter((a) => a.therapistId === currentTherapist.id);
  const todaySessions = myAppointments.filter((a) => a.date === todayDate);
  const mySessionRecords = sessions.filter(
    (s) => s.therapistId === currentTherapist.id || s.therapistName.includes(currentTherapist.name)
  );

  // Rapid Note Builder Modal State
  const [rapidBuilderOpen, setRapidBuilderOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState(myChildren[0]?.id || 'child-1');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['Communication & AAC', 'Engagement & Focus']);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    'Independently used EthSL gestures',
    'Maintained 15+ mins sustained attention'
  ]);
  const [rapidCounters, setRapidCounters] = useState({
    signsUsed: 12,
    tasksDone: 6,
    focusMins: 25,
    trialsMet: 85
  });
  const [soapPlan, setSoapPlan] = useState('Continue graded complexity. Send home visual cards.');
  const [homeExercise, setHomeExercise] = useState('Practice 5 min table-top sensory task before dinner.');

  // Postpone/Cancel Modal State
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Child illness / fever');
  const [notifyParent, setNotifyParent] = useState(true);

  // Badge Decision Modal State
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [badgeChildId, setBadgeChildId] = useState(myChildren[0]?.id || 'child-1');
  const [selectedBadge, setSelectedBadge] = useState('Sensory Regulation Tier 1');

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const toggleHighlight = (text: string) => {
    setSelectedHighlights((prev) =>
      prev.includes(text) ? prev.filter((h) => h !== text) : [...prev, text]
    );
  };

  const handleSaveRapidNote = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find((c) => c.id === selectedChildId);
    if (!child) return;

    addSession({
      childId: child.id,
      childName: `${child.firstName} ${child.lastName}`,
      therapistId: currentTherapist.id,
      therapistName: currentTherapist.name,
      date: todayDate,
      durationMinutes: 45,
      programTitle: 'Pediatric Clinical Therapy',
      soapSubjective: `Child arrived regulated and ready. Highlights: ${selectedHighlights.join('; ')}`,
      soapObjective: `Metrics recorded: ${rapidCounters.signsUsed} signs used, ${rapidCounters.tasksDone} structured tasks completed, ${rapidCounters.focusMins}m sustained focus, ${rapidCounters.trialsMet}% accuracy.`,
      soapAssessment: `Domains addressed: ${selectedDomains.join(', ')}. Strong progress logged across milestones.`,
      soapPlan: soapPlan,
      milestonesWorkedOn: selectedDomains,
      progressScore: Number(rapidCounters.trialsMet),
      parentVisible: true,
      homeExercises: homeExercise
    });

    setRapidBuilderOpen(false);
    showToast(`Rapid Clinical Note saved and synchronized for ${child.firstName}`, 'success');
  };

  const handleConfirmCancelOrPostpone = () => {
    if (!targetSessionId) return;
    updateAppointment(targetSessionId, {
      status: 'cancelled',
      cancellationReason: cancelReason
    });
    setCancelModalOpen(false);
    showToast(`Session updated: ${cancelReason}. Parent notified: ${notifyParent ? 'Yes' : 'No'}`, 'info');
  };

  const handleAwardBadge = () => {
    const child = childrenList.find((c) => c.id === badgeChildId);
    setBadgeModalOpen(false);
    showToast(`Mastery Badge "${selectedBadge}" awarded to ${child?.firstName || 'Student'}! Synced to Parent Portal.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP HEADER & RAPID ACTIONS ROW (Brightside Inspired) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-emerald-500/20 shadow-sm flex-shrink-0">
            <img
              src={currentTherapist.avatar}
              alt={currentTherapist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Therapist Clinical Workspace
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Workspace Live
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentTherapist.name} • {currentTherapist.credentials}
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setRapidBuilderOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-[#F9E34D]" />
            <span>Rapid Note Builder</span>
          </button>

          <button
            onClick={() => setBadgeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#F9E34D]/20 hover:bg-[#F9E34D]/30 text-amber-900 border border-[#F9E34D]/40 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span>Award Badge</span>
          </button>

          <Link
            to="/appointments"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Schedule</span>
          </Link>
        </div>
      </div>

      {/* 2. TOP KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Today's Sessions
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">{todaySessions.length} Scheduled</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
            {todaySessions.filter((s) => s.status === 'completed').length} completed so far
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Active Students
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">{myChildren.length || 6} Students</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-500 block mt-1">
            Assigned caseload
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Pending SOAP Reports
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-700">1 Report</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-amber-600 block mt-1">
            Needs sign & sync
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Goal Mastery Average
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-700">86.4%</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
            ▲ +4.2% this quarter
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Session Queue & Clinical Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Queue with Postpone/Cancel and Fast Observation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today's Appointment Queue</h2>
                <p className="text-xs text-slate-500">October 19, 2026 • Therapy Pod Rotations</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {todaySessions.length} Sessions Today
              </span>
            </div>

            <div className="space-y-3">
              {todaySessions.length > 0 ? (
                todaySessions.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 text-center py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex-shrink-0">
                        <span className="text-xs font-black text-slate-900 block">{apt.startTime}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{apt.endTime}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{apt.childName}</h4>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              apt.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : apt.status === 'cancelled'
                                ? 'bg-slate-200 text-slate-600 line-through'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{apt.programTitle}</p>
                        <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          Room: {apt.room}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => {
                              updateAppointment(apt.id, { status: 'completed' });
                              showToast(`${apt.childName} checked in and marked completed`, 'success');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                          >
                            Check In
                          </button>
                          <button
                            onClick={() => {
                              setTargetSessionId(apt.id);
                              setCancelModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
                          >
                            Postpone
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedChildId(apt.childId);
                          setRapidBuilderOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Rapid Note</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No sessions scheduled for today.
                </div>
              )}
            </div>
          </div>

          {/* Clinical Insights Banner (Inspired by BrightAI in reference repo) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Clinical Focus Insights</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  <strong>Liam Jenkins:</strong> Achieved 85% on bilateral loop scissors. Recommended to advance to curved graded pattern cutting sheet this week.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">
                  <strong>Maya Patel:</strong> Completed 18/25 bilabial sound repetitions. Parent reports consistent bubble-blowing practice at home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Active Caseload & Mastery Badges */}
        <div className="space-y-6">
          {/* Active Students Caseload */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">My Students</h2>
              <span className="text-xs font-bold text-slate-500">{myChildren.length || 6} Enrolled</span>
            </div>

            <div className="space-y-3">
              {myChildren.map((child) => (
                <div
                  key={child.id}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={child.avatar}
                      alt={child.firstName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {child.firstName} {child.lastName}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Age {child.age} • {child.primaryDiagnosis.split('(')[0]}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedChildId(child.id);
                      setRapidBuilderOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors flex-shrink-0"
                    title="Rapid Note"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Mastery Decider Widget (Inspired by TherapistBadgeDecisionsWidget) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Mastery Badges</h3>
              <Award className="w-4 h-4 text-[#F9E34D]" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Liam Jenkins</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Bilateral Scissor Master</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Awarded
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Maya Patel</span>
                  <span className="text-[11px] text-amber-700 font-semibold">Speech Bilabial Hero</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  In Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RAPID CLINICAL NOTE BUILDER MODAL (Based on Brightside SessionNoteRapidBuilder.jsx) */}
      {rapidBuilderOpen && (
        <Modal
          isOpen={rapidBuilderOpen}
          onClose={() => setRapidBuilderOpen(false)}
          title="Rapid Clinical Note Builder"
          subtitle="Fast clinical documentation with 1-click domain chips & metric counters"
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveRapidNote} className="space-y-5 text-xs">
            {/* Child Selection */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Student / Child</label>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.primaryDiagnosis.split('(')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Clinical Domain Pills */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Target Clinical Domains (Click to select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DOMAIN_OPTIONS.map((domain) => {
                  const isSelected = selectedDomains.includes(domain);
                  return (
                    <button
                      type="button"
                      key={domain}
                      onClick={() => toggleDomain(domain)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all border ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {domain}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Metric Counters */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Session Performance Counters
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Signs / Gestures</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, signsUsed: Math.max(0, p.signsUsed - 1) }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="font-black text-base text-slate-900">{rapidCounters.signsUsed}</span>
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, signsUsed: p.signsUsed + 1 }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Tasks Done</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, tasksDone: Math.max(0, p.tasksDone - 1) }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="font-black text-base text-slate-900">{rapidCounters.tasksDone}</span>
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, tasksDone: p.tasksDone + 1 }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Focus (Mins)</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, focusMins: Math.max(0, p.focusMins - 5) }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="font-black text-base text-slate-900">{rapidCounters.focusMins}m</span>
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, focusMins: p.focusMins + 5 }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Trial Accuracy</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, trialsMet: Math.max(0, p.trialsMet - 5) }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="font-black text-base text-emerald-700">{rapidCounters.trialsMet}%</span>
                    <button
                      type="button"
                      onClick={() => setRapidCounters((p) => ({ ...p, trialsMet: Math.min(100, p.trialsMet + 5) }))}
                      className="w-6 h-6 rounded bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Highlight Chips */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Quick Observation Chips (Click to toggle)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {HIGHLIGHT_TEMPLATES.map((t) => {
                  const isSelected = selectedHighlights.includes(t.text);
                  return (
                    <button
                      type="button"
                      key={t.text}
                      onClick={() => toggleHighlight(t.text)}
                      className={`p-2 rounded-xl text-left border flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{t.text}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                        {t.keyword}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plan & Home Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Plan for Next Session</label>
                <input
                  type="text"
                  value={soapPlan}
                  onChange={(e) => setSoapPlan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Home Sensory Tip for Parent</label>
                <input
                  type="text"
                  value={homeExercise}
                  onChange={(e) => setHomeExercise(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRapidBuilderOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
              >
                Save & Sync Rapid Note
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 5. POSTPONE / CANCEL MODAL (Based on Brightside SessionPostponeCancelModal.jsx) */}
      {cancelModalOpen && (
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title="Postpone or Cancel Session"
          subtitle="Record clinical reason and optionally send automated notification to parent"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Reason for Postponing</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                <option value="Child illness / fever">Child illness / fever</option>
                <option value="School schedule conflict">School schedule conflict</option>
                <option value="Transportation / commute delay">Transportation / commute delay</option>
                <option value="Therapist emergency coverage">Therapist emergency coverage</option>
                <option value="Severe weather / transit alert">Severe weather / transit alert</option>
              </select>
            </div>

            <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyParent}
                onChange={(e) => setNotifyParent(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300"
              />
              <span className="text-slate-800 font-semibold">
                Send automated push & SMS notification to Parent Portal
              </span>
            </label>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleConfirmCancelOrPostpone}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow"
              >
                Confirm Postpone
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 6. BADGE DECISION MODAL (Inspired by TherapistBadgeDecisionsWidget) */}
      {badgeModalOpen && (
        <Modal
          isOpen={badgeModalOpen}
          onClose={() => setBadgeModalOpen(false)}
          title="Award Clinical Mastery Badge"
          subtitle="Celebrates breakthrough achievements and unlocks badges in the Parent Portal"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Student</label>
              <select
                value={badgeChildId}
                onChange={(e) => setBadgeChildId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Achievement Badge</label>
              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                <option value="Sensory Regulation Tier 1">Sensory Regulation Tier 1</option>
                <option value="Bilateral Scissor Master">Bilateral Scissor Master</option>
                <option value="AAC Picture Communicator">AAC Picture Communicator</option>
                <option value="EthSL Sign Language Starter">EthSL Sign Language Starter</option>
                <option value="Inclusive Classroom Star">Inclusive Classroom Star</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setBadgeModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAwardBadge}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
              >
                Award & Notify Family
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
