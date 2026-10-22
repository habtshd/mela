import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Stethoscope,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Plus,
  Printer,
  ChevronRight,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/common/Modal';

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

  // Selected therapist profile (defaults to Wanos Mesfin or therapist-1)
  const currentTherapist = therapists.find((t) => t.id === 'therapist-1') || therapists[0];

  // Specific therapist caseload and data
  const myChildren = childrenList.filter(
    (c) => c.assignedTherapistId === currentTherapist.id || c.assignedTherapistName.includes(currentTherapist.name)
  );

  const todayDate = '2026-10-19';
  const myAppointments = appointments.filter((a) => a.therapistId === currentTherapist.id);
  const todaySessions = myAppointments.filter((a) => a.date === todayDate);
  const mySessionRecords = sessions.filter(
    (s) => s.therapistId === currentTherapist.id || s.therapistName.includes(currentTherapist.name)
  );

  // Quick SOAP Note Modal
  const [soapModalOpen, setSoapModalOpen] = useState(false);
  const [selectedChildForSoap, setSelectedChildForSoap] = useState(myChildren[0]?.id || 'child-1');
  const [soapForm, setSoapForm] = useState({
    subjective: 'Child entered session regulated and engaged with warm greeting.',
    objective: 'Completed 15 min fine motor sensory warmup. Met 80% accuracy in structured tasks.',
    assessment: 'Demonstrated notable progress in sustained attention and self-advocacy.',
    plan: 'Maintain current intervention frequency. Add home sensory play routine.',
    score: 85,
    milestone: 'Sensory self-regulation',
    homeTip: 'Practice 5 min table-top sensory task before bedtime.'
  });

  const handleSaveSoap = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find((c) => c.id === selectedChildForSoap);
    if (!child) return;

    addSession({
      childId: child.id,
      childName: `${child.firstName} ${child.lastName}`,
      therapistId: currentTherapist.id,
      therapistName: currentTherapist.name,
      date: todayDate,
      durationMinutes: 45,
      programTitle: 'Pediatric Clinical Therapy',
      soapSubjective: soapForm.subjective,
      soapObjective: soapForm.objective,
      soapAssessment: soapForm.assessment,
      soapPlan: soapForm.plan,
      milestonesWorkedOn: [soapForm.milestone],
      progressScore: Number(soapForm.score),
      parentVisible: true,
      homeExercises: soapForm.homeTip
    });

    setSoapModalOpen(false);
    showToast(`SOAP Note logged and shared for ${child.firstName}`, 'success');
  };

  const handleCheckIn = (aptId: string, childName: string) => {
    updateAppointment(aptId, { status: 'completed' });
    showToast(`${childName} checked in and marked completed`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
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
                Specialist Clinical Workspace
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Live Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentTherapist.name} • {currentTherapist.credentials}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSoapModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#F9E34D]" />
            <span>Fast SOAP Note</span>
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

      {/* Overview Metrics Cards */}
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
            Assigned Caseload
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">{myChildren.length || 6} Active Children</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-500 block mt-1">
            OT, ABA & Speech programs
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Average Goal Mastery
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">86.4%</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
            ▲ +4.2% vs previous month
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Parent Portals Connected
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900">100% Live</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-500 block mt-1">
            Instant parent sync enabled
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Clinical Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today's Appointment Queue</h2>
                <p className="text-xs text-slate-500">October 19, 2026 • Clinic & Therapy Pod Rotations</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {todaySessions.length} Sessions
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
                      {apt.status !== 'completed' && (
                        <button
                          onClick={() => handleCheckIn(apt.id, apt.childName)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          Check In
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedChildForSoap(apt.childId);
                          setSoapModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                        <span>SOAP Note</span>
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

          {/* Recent Signed Progress Records */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Signed Clinical Notes & Parent Sync</h2>
              <Link to="/sessions" className="text-xs font-bold text-emerald-700 hover:underline">
                View All SOAP Notes →
              </Link>
            </div>

            <div className="space-y-3">
              {mySessionRecords.slice(0, 3).map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-black text-xs flex items-center justify-center">
                      {sess.progressScore}%
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{sess.childName}</h4>
                      <p className="text-[11px] text-slate-400">
                        {sess.date} • {sess.programTitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Synced to Parent
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Active Caseload Roster */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">My Clinical Caseload</h2>
              <span className="text-xs font-bold text-slate-500">{myChildren.length || 6} Children</span>
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
                      setSelectedChildForSoap(child.id);
                      setSoapModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors flex-shrink-0"
                    title="Log session"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Specialist Actions */}
          <div className="rounded-3xl p-6 border text-white space-y-3" style={{ background: 'linear-gradient(135deg, #1f4f49 0%, #13332f 100%)', borderColor: '#265e57' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F9E34D] block">
              Quick Resources
            </span>
            <h3 className="text-sm font-bold">Inclusive Education CPD Toolkit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access standardized IEP forms, EthSL sign flashcards, and sensory gym safety checklists.
            </p>
            <div className="pt-1">
              <Link
                to="/programs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9E34D] hover:underline"
              >
                <span>Browse Clinical Curriculums</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fast SOAP Note Modal */}
      {soapModalOpen && (
        <Modal
          isOpen={soapModalOpen}
          onClose={() => setSoapModalOpen(false)}
          title="Fast Clinical SOAP Note Entry"
          subtitle="Signed note will automatically update parent portal & clinical dashboard"
          maxWidth="xl"
        >
          <form onSubmit={handleSaveSoap} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Child</label>
              <select
                value={selectedChildForSoap}
                onChange={(e) => setSelectedChildForSoap(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.primaryDiagnosis.split('(')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Milestone</label>
                <input
                  type="text"
                  value={soapForm.milestone}
                  onChange={(e) => setSoapForm({ ...soapForm, milestone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Progress Score (0 - 100%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={soapForm.score}
                  onChange={(e) => setSoapForm({ ...soapForm, score: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">S • Subjective (State & Mood)</label>
                <textarea
                  rows={2}
                  value={soapForm.subjective}
                  onChange={(e) => setSoapForm({ ...soapForm, subjective: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">O • Objective (Trials & Warmup)</label>
                <textarea
                  rows={2}
                  value={soapForm.objective}
                  onChange={(e) => setSoapForm({ ...soapForm, objective: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">A • Assessment (Coordination/Progress)</label>
                <textarea
                  rows={2}
                  value={soapForm.assessment}
                  onChange={(e) => setSoapForm({ ...soapForm, assessment: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">P • Plan (Next Week Strategy)</label>
                <textarea
                  rows={2}
                  value={soapForm.plan}
                  onChange={(e) => setSoapForm({ ...soapForm, plan: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Home Sensory Tip for Parent</label>
              <input
                type="text"
                value={soapForm.homeTip}
                onChange={(e) => setSoapForm({ ...soapForm, homeTip: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSoapModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
              >
                Sign & Sync Note
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
