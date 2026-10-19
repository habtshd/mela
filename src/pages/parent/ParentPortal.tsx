import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Heart,
  Calendar,
  Clock,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  MessageSquare,
  Send,
  Printer,
  ChevronRight,
  Stethoscope,
  Smile,
  ShieldCheck,
  CalendarDays,
  Award
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ParentPortal: React.FC = () => {
  const {
    childrenList,
    appointments,
    sessions,
    invoices,
    therapists,
    recordInvoicePayment,
    showToast,
    settings
  } = useDemo();

  // The parent persona Sarah Jenkins is assigned to child-1 (Liam Jenkins)
  const liam = childrenList.find((c) => c.id === 'child-1') || childrenList[0];
  const assignedTherapist = therapists.find((t) => t.id === liam.assignedTherapistId) || therapists[0];

  // Liam's specific data
  const liamAppointments = appointments.filter((a) => a.childId === liam.id);
  const liamSessions = sessions.filter((s) => s.childId === liam.id && s.parentVisible);
  const liamInvoices = invoices.filter((i) => i.childId === liam.id);

  const nextAppointment = liamAppointments.find((a) => a.status === 'confirmed' || a.status === 'scheduled');

  // Modals state
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleNotes, setRescheduleNotes] = useState('Would prefer Thursday afternoon if possible');
  const [selectedSessionNote, setSelectedSessionNote] = useState<any>(null);

  // Message Therapist state
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'Michael Chen, MS, OTR/L',
      time: 'Yesterday at 3:15 PM',
      text: 'Hi Sarah! Liam was wonderful today with the adaptive loop scissors. He cut three curved patterns with 85% accuracy. I sent home a play-dough pinch exercise for the dinner routine.',
      isTherapist: true
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const userMsg = {
      sender: 'Sarah Jenkins (You)',
      time: 'Just now',
      text: messageText,
      isTherapist: false
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessageText('');
    showToast('Message sent to Michael Chen', 'success');

    // Simulate therapist response after 2 seconds
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'Michael Chen, MS, OTR/L',
          time: 'Just now',
          text: 'Thanks for the update, Sarah! That is fantastic progress. Let’s definitely incorporate that into our sensory warm-up this Wednesday.',
          isTherapist: true
        }
      ]);
      showToast('New reply from therapist Michael Chen', 'info');
    }, 2000);
  };

  const handlePayInvoice = (invId: string, amount: number) => {
    recordInvoicePayment(invId, amount, 'Credit Card (Visa ending in 4108)');
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={liam.avatar}
              alt={liam.firstName}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-teal-400/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{liam.firstName}'s Family Portal</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
                  Parent Access
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Primary Diagnosis: <strong>{liam.primaryDiagnosis}</strong> • Age: {liam.age} yrs
              </p>
              <p className="text-[11px] text-teal-200 mt-0.5">
                Lead Specialist: <strong>{assignedTherapist.name} ({assignedTherapist.credentials})</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRescheduleModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow"
            >
              Request Reschedule
            </button>
          </div>
        </div>
      </div>

      {/* Next Appointment Card & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Appointment */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Next Scheduled Session
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Upcoming
            </span>
          </div>

          {nextAppointment ? (
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-800">{nextAppointment.programTitle}</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Wednesday, Oct 21, 2026 at {nextAppointment.startTime} AM
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Location: <strong>{nextAppointment.room}</strong> • Specialist: <strong>{nextAppointment.therapistName}</strong>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Target: {nextAppointment.notes || 'Sensory gym regulation & motor planning'}
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => showToast('Calendar reminder downloaded to your device', 'success')}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4">No upcoming appointments scheduled.</p>
          )}

          {/* Quick Roster of All Liam's Appointments */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recent & Upcoming Schedule
            </h4>
            <div className="divide-y divide-slate-100 text-xs">
              {liamAppointments.map((apt) => (
                <div key={apt.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900">{apt.date} • {apt.startTime}</span>
                    <p className="text-slate-500">{apt.programTitle} ({apt.room})</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    apt.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-teal-50 text-teal-800 border-teal-200'
                  }`}>
                    {apt.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Specialist Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={assignedTherapist.avatar}
                alt={assignedTherapist.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/20"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{assignedTherapist.name}</h3>
                <p className="text-xs font-bold text-teal-600">{assignedTherapist.credentials}</p>
                <p className="text-[11px] text-slate-500">{assignedTherapist.title}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4">
              <p>
                <strong>Office Room:</strong> {assignedTherapist.roomPreference}
              </p>
              <p>
                <strong>Direct Clinic Phone:</strong> {assignedTherapist.phone}
              </p>
              <p className="line-clamp-2 text-slate-500 mt-1">
                "{assignedTherapist.bio}"
              </p>
            </div>
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-2xl text-[11px] text-teal-950 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Specialist Note
            </span>
            <p>
              Great response to sensory warm-ups. Continue scissor exercises at home.
            </p>
          </div>
        </div>
      </div>

      {/* Goal Mastery & Progress Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Developmental Milestones & Goals
            </h2>
            <p className="text-xs text-slate-500">
              Updated after every clinical session
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {liam.goals.filter((g) => g.status === 'mastered').length} of {liam.goals.length} Goals Mastered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liam.goals.map((g) => (
            <div
              key={g.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {g.category}
                  </span>
                  <span className="text-xs font-black text-teal-700">{g.currentProgress}%</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{g.title}</h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{g.notes}</p>
              </div>

              <div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all"
                    style={{ width: `${g.currentProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  Baseline: {g.baseline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Progress Notes & Direct Chat with Therapist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOAP Notes Shared With Parent */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Progress Notes
            </h3>
            <span className="text-xs text-slate-400">{liamSessions.length} Notes</span>
          </div>

          <div className="space-y-3">
            {liamSessions.map((sess) => (
              <div
                key={sess.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">{sess.programTitle}</span>
                  <span className="text-slate-400 text-[11px]">{sess.date} • {sess.therapistName}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{sess.soapObjective}</p>
                {sess.homeExercises && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    <strong className="block mb-0.5 text-[10px] uppercase tracking-wider text-amber-800">
                      Home Practice:
                    </strong>
                    {sess.homeExercises}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Message Therapist Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Message Specialist</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Chat History */}
            <div className="my-4 space-y-3 max-h-56 overflow-y-auto p-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl text-xs space-y-1 ${
                    m.isTherapist
                      ? 'bg-teal-50/80 border border-teal-100 text-slate-800 mr-4'
                      : 'bg-slate-900 text-white ml-4'
                  }`}
                >
                  <div className="flex justify-between text-[10px] opacity-75 font-semibold">
                    <span>{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Ask Michael Chen a question about Liam..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Liam's Invoices & Payment Remittance */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            Liam’s Billing & Superbills
          </h3>
          <span className="text-xs text-slate-500">Itemized statements for insurance reimbursement</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {liamInvoices.map((inv) => (
            <div key={inv.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{inv.invoiceNumber}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    inv.status === 'paid'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {inv.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Issued: {inv.issueDate} • Due: {inv.dueDate}
                </p>
                <div className="mt-1 space-y-0.5 text-slate-600">
                  {inv.items.map((it) => (
                    <p key={it.id} className="text-[11px]">• {it.description}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-black text-slate-900 text-sm">${inv.total}</p>
                  {inv.balanceDue > 0 ? (
                    <p className="text-[11px] font-bold text-amber-700">Due: ${inv.balanceDue}</p>
                  ) : (
                    <p className="text-[11px] font-bold text-emerald-700">Paid in Full</p>
                  )}
                </div>

                {inv.balanceDue > 0 && (
                  <button
                    onClick={() => handlePayInvoice(inv.id, inv.balanceDue)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow"
                  >
                    Pay ${inv.balanceDue} Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reschedule Modal Simulation */}
      {rescheduleModalOpen && (
        <Modal
          isOpen={rescheduleModalOpen}
          onClose={() => setRescheduleModalOpen(false)}
          title="Request Appointment Reschedule"
          subtitle="Submit schedule preference to Mela intake coordinators."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Please share the date/time that works best for Liam's upcoming sensory session:
            </p>
            <textarea
              rows={3}
              value={rescheduleNotes}
              onChange={(e) => setRescheduleNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRescheduleModalOpen(false);
                  showToast('Reschedule request sent to clinical coordinator!', 'success');
                }}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow"
              >
                Submit Request
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
