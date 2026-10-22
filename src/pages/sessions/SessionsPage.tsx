import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { SessionRecord } from '../../types';
import {
  FileSpreadsheet,
  Plus,
  Printer,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  User,
  TrendingUp,
  Download,
  Share2,
  Eye
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const SessionsPage: React.FC = () => {
  const { sessions, childrenList, therapists, addSession, showToast, settings } = useDemo();

  const [search, setSearch] = useState('');
  const [selectedChildFilter, setSelectedChildFilter] = useState('all');

  // Modals
  const [selectedSession, setSelectedSession] = useState<SessionRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [printableModalOpen, setPrintableModalOpen] = useState(false);
  const [reportSession, setReportSession] = useState<SessionRecord | null>(null);

  // Add Form State
  const [formData, setFormData] = useState({
    childId: childrenList[0]?.id || 'child-1',
    therapistId: therapists[0]?.id || 'therapist-1',
    programTitle: 'Pediatric Occupational Therapy',
    durationMinutes: 45,
    date: new Date().toISOString().split('T')[0],
    soapSubjective: '',
    soapObjective: '',
    soapAssessment: '',
    soapPlan: '',
    milestonesWorkedOn: 'Bilateral hand coordination, Pincer grasp',
    progressScore: 85,
    homeExercises: '',
    parentVisible: true
  });

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.childName.toLowerCase().includes(search.toLowerCase()) ||
      s.therapistName.toLowerCase().includes(search.toLowerCase()) ||
      s.programTitle.toLowerCase().includes(search.toLowerCase());

    const matchesChild =
      selectedChildFilter === 'all' || s.childId === selectedChildFilter;

    return matchesSearch && matchesChild;
  });

  const handleOpenAddModal = () => {
    setFormData({
      childId: childrenList[0]?.id || 'child-1',
      therapistId: therapists[0]?.id || 'therapist-1',
      programTitle: 'Pediatric Occupational Therapy',
      durationMinutes: 45,
      date: new Date().toISOString().split('T')[0],
      soapSubjective: 'Child arrived in calm, regulated state. Parent reported good sleep.',
      soapObjective: 'Engaged in 15 min vestibular swing regulation. Completed 3 fine motor adaptive scissor trials with 85% accuracy.',
      soapAssessment: 'Demonstrated notable progress in bilateral stabilization and core posture.',
      soapPlan: 'Progress to cutting zig-zag shapes next session. Continue therapeutic putty.',
      milestonesWorkedOn: 'Bilateral motor, Scissor grip',
      progressScore: 88,
      homeExercises: '5 minutes of putty pinch play before bedtime.',
      parentVisible: true
    });
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find((c) => c.id === formData.childId);
    const therapist = therapists.find((t) => t.id === formData.therapistId);

    addSession({
      childId: formData.childId,
      childName: child ? `${child.firstName} ${child.lastName}` : 'Liam Jenkins',
      therapistId: formData.therapistId,
      therapistName: therapist ? therapist.name : 'Michael Chen',
      programTitle: formData.programTitle,
      date: formData.date,
      durationMinutes: Number(formData.durationMinutes),
      soapSubjective: formData.soapSubjective,
      soapObjective: formData.soapObjective,
      soapAssessment: formData.soapAssessment,
      soapPlan: formData.soapPlan,
      milestonesWorkedOn: formData.milestonesWorkedOn.split(',').map((m) => m.trim()),
      progressScore: Number(formData.progressScore),
      parentVisible: formData.parentVisible,
      homeExercises: formData.homeExercises
    });

    setIsAddModalOpen(false);
  };

  const handleOpenPrintableReport = (sess: SessionRecord) => {
    setReportSession(sess);
    setPrintableModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Sessions & SOAP Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clinical notes, milestone tracking, and reports.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New SOAP Note</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by child, specialist, or modality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedChildFilter}
            onChange={(e) => setSelectedChildFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Children</option>
            {childrenList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sessions Records List */}
      <div className="space-y-4">
        {filteredSessions.map((sess) => (
          <div
            key={sess.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            {/* Header: Child info, Progress Bar & Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Visual Progress Ring / Badge */}
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex-shrink-0">
                  <span className="text-base font-black leading-none">{sess.progressScore}%</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mt-0.5">Score</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{sess.childName}</h3>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {sess.durationMinutes} min
                    </span>
                    {sess.parentVisible && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800">
                        ● Shared with Parent
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700">{sess.programTitle}</span> • {sess.therapistName} • {sess.date}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => handleOpenPrintableReport(sess)}
                className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
            </div>

            {/* Visual Progress Line */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${sess.progressScore}%` }}
              />
            </div>

            {/* Visual Highlights & Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                  S • State / Mood
                </span>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="truncate">Regulated & Calm</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                  Sleep & transit well-tolerated
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  O • Activity Accuracy
                </span>
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[10px]">85%</span>
                  <span className="truncate">Target Trials Met</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                  Motor & sensory warm-up
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  A • Clinical Trend
                </span>
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                  <span className="text-emerald-600">▲</span>
                  <span className="truncate">Notable Coordination</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                  Spontaneous requests logged
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  P • Next Step Focus
                </span>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <span>🎯</span>
                  <span className="truncate">Graded Complexity</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                  Zipper board & putty exercises
                </span>
              </div>
            </div>

            {/* Bottom tags & home practice */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Milestones:</span>
                {sess.milestonesWorkedOn.map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full"
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>

              {sess.homeExercises && (
                <div className="text-[11px] text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/80">
                  <strong>Home Practice:</strong> {sess.homeExercises}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New SOAP Note Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New SOAP Session"
        subtitle="Clinical observations and progress notes."
        maxWidth="2xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Child *</label>
              <select
                value={formData.childId}
                onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specialist *</label>
              <select
                value={formData.therapistId}
                onChange={(e) => setFormData({ ...formData, therapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Min)</label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Score %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progressScore}
                onChange={(e) => setFormData({ ...formData, progressScore: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Program Modality</label>
            <input
              type="text"
              value={formData.programTitle}
              onChange={(e) => setFormData({ ...formData, programTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subjective (S)</label>
              <textarea
                rows={2}
                value={formData.soapSubjective}
                onChange={(e) => setFormData({ ...formData, soapSubjective: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Objective (O)</label>
              <textarea
                rows={2}
                value={formData.soapObjective}
                onChange={(e) => setFormData({ ...formData, soapObjective: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assessment (A)</label>
              <textarea
                rows={2}
                value={formData.soapAssessment}
                onChange={(e) => setFormData({ ...formData, soapAssessment: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Plan (P)</label>
              <textarea
                rows={2}
                value={formData.soapPlan}
                onChange={(e) => setFormData({ ...formData, soapPlan: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Home Exercises for Parents</label>
            <input
              type="text"
              value={formData.homeExercises}
              onChange={(e) => setFormData({ ...formData, homeExercises: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow"
            >
              Save SOAP Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Printable Clinical Progress Report Preview Modal */}
      {printableModalOpen && reportSession && (
        <Modal
          isOpen={printableModalOpen}
          onClose={() => setPrintableModalOpen(false)}
          title="Printable Progress Report Preview"
          subtitle="Official clinical progress summary for parents and IEP teams."
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* The Printable Document */}
            <div id="printable-report" className="p-8 bg-white border border-slate-300 rounded-2xl shadow-sm text-slate-900 space-y-6">
              {/* Header Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-teal-600 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-teal-200 p-1 flex items-center justify-center shadow-sm">
                    <img
                      src="/logo.png"
                      alt="Mela Special Needs Service Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">{settings.name}</h2>
                    <p className="text-xs text-slate-500">{settings.tagline}</p>
                    <p className="text-[10px] text-slate-400">License: {settings.licenseNumber} • {settings.phone}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                    Clinical Progress Report
                  </span>
                  <p className="text-slate-500 mt-1">Date: {reportSession.date}</p>
                </div>
              </div>

              {/* Patient Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Child Patient</span>
                  <p className="font-bold text-slate-900">{reportSession.childName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Therapy Service</span>
                  <p className="font-bold text-slate-900">{reportSession.programTitle}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Lead Specialist</span>
                  <p className="font-bold text-slate-900">{reportSession.therapistName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mastery Score</span>
                  <p className="font-bold text-teal-700">{reportSession.progressScore}% Target Met</p>
                </div>
              </div>

              {/* Clinical Narrative */}
              <div className="space-y-4 text-xs leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Subjective History & Transition
                  </h4>
                  <p className="text-slate-700">{reportSession.soapSubjective}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Objective Data & Interventions
                  </h4>
                  <p className="text-slate-700">{reportSession.soapObjective}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Clinical Assessment & Response
                  </h4>
                  <p className="text-slate-700">{reportSession.soapAssessment}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Plan & Recommended Home Reinforcement
                  </h4>
                  <p className="text-slate-700">{reportSession.soapPlan}</p>
                  {reportSession.homeExercises && (
                    <p className="mt-1 text-teal-800 font-medium">Home Activity: {reportSession.homeExercises}</p>
                  )}
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{reportSession.therapistName}</p>
                  <p className="text-[10px] text-slate-500">Board Licensed Pediatric Specialist</p>
                  <p className="text-[10px] text-slate-400">Electronic Signature Verified • {reportSession.date}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p>Mela Special Needs Center</p>
                  <p>Confidential Healthcare Record</p>
                </div>
              </div>
            </div>

            {/* Print & Action Controls */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                Ready for printing or PDF export via browser print dialog.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPrintableModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
