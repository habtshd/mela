import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Users,
  CalendarCheck,
  Stethoscope,
  Layers,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Sparkles,
  FileSpreadsheet,
  Download,
  Filter,
  Plus
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const {
    currentRole,
    currentUser,
    childrenList,
    therapists,
    programs,
    appointments,
    invoices,
    activityLogs,
    updateAppointment,
    showToast
  } = useDemo();

  const navigate = useNavigate();

  // Metrics
  const activeChildrenCount = childrenList.filter((c) => c.status === 'active').length;
  const todayDate = '2026-10-19'; // Demo date aligned with mock data

  // Filter appointments if logged in as therapist (Michael Chen)
  const isTherapistView = currentRole === 'therapist';
  const displayedAppointments = isTherapistView
    ? appointments.filter((a) => a.therapistId === 'therapist-1')
    : appointments;

  const todayAppointments = displayedAppointments.filter((a) => a.date === todayDate);

  // Financial calculations
  const totalOutstanding = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.balanceDue, 0);

  // Weekly Appointment Chart Mock Data
  const weeklyData = [
    { day: 'Mon', completed: 18, scheduled: 24 },
    { day: 'Tue', completed: 16, scheduled: 22 },
    { day: 'Wed', completed: 20, scheduled: 25 },
    { day: 'Thu', completed: 17, scheduled: 21 },
    { day: 'Fri', completed: 15, scheduled: 19 },
    { day: 'Sat', completed: 8, scheduled: 10 }
  ];

  // Monthly Enrollment Trends Data
  const enrollmentTrendData = [
    { month: 'May', enrolled: 110 },
    { month: 'Jun', enrolled: 118 },
    { month: 'Jul', enrolled: 124 },
    { month: 'Aug', enrolled: 131 },
    { month: 'Sep', enrolled: 138 },
    { month: 'Oct', enrolled: 142 }
  ];

  // Therapy Domain Distribution
  const domainData = [
    { name: 'Occupational (OT)', value: 35, color: '#3B833A' },
    { name: 'Speech & AAC', value: 28, color: '#F9E34D' },
    { name: 'Applied Behavior (ABA)', value: 20, color: '#285427' },
    { name: 'Sensory Integration', value: 24, color: '#dfc428' },
    { name: 'Physical Therapy (PT)', value: 15, color: '#64b95e' }
  ];

  const handleQuickStatus = (aptId: string, status: 'completed' | 'cancelled') => {
    updateAppointment(aptId, { status });
    showToast(`Appointment status changed to ${status}`, 'info');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Greeting & Role Context Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isTherapistView ? `Welcome back, ${currentUser.name.split(',')[0]}` : 'Clinical Operations Center'}
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Live Demo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTherapistView
              ? `${todayAppointments.length} sessions today • 1 pending note`
              : `${activeChildrenCount} active children • ${therapists.length} therapists`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/appointments')}
            className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Open Calendar</span>
          </button>
          <button
            onClick={() => navigate('/sessions')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span>Log SOAP Note</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Children */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Total Children</span>
            <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{isTherapistView ? '14' : '142'}</p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% this quarter</span>
          </div>
        </div>

        {/* Active Programs */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Therapy Programs</span>
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-700">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{programs.length} Active</p>
          <div className="mt-2 text-[11px] font-medium text-slate-500">
            Across 6 pediatric domains
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Today's Sessions</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{todayAppointments.length} Scheduled</p>
          <div className="mt-2 text-[11px] font-semibold text-teal-700">
            {todayAppointments.filter((a) => a.status === 'completed').length} completed so far
          </div>
        </div>

        {/* Number of Therapists */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Clinical Staff</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{therapists.length} Specialists</p>
          <div className="mt-2 text-[11px] font-medium text-slate-500">
            OT, SLP, BCBA, DPT, PsyD
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">Outstanding Invoices</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-700">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">${totalOutstanding.toLocaleString()}</p>
          <Link
            to="/billing"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-800"
          >
            View pending billing →
          </Link>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Appointment Activity Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Appointment Volume</h3>
              <p className="text-xs text-slate-500">Scheduled vs Completed this week</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-2.5 rounded bg-brand-600 inline-block"></span> Completed
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <span className="w-2.5 h-2.5 rounded bg-gold-400 inline-block"></span> Scheduled
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="completed" fill="#3B833A" radius={[6, 6, 0, 0]} name="Completed" />
                <Bar dataKey="scheduled" fill="#F9E34D" radius={[6, 6, 0, 0]} name="Scheduled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Therapy Domain Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Caseload by Specialty</h3>
            <p className="text-xs text-slate-500">Active enrollments by therapy domain</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {domainData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-slate-600 truncate text-[11px] font-medium">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments Queue & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Appointments Queue */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Queue</h3>
              <p className="text-xs text-slate-500">Monday, Oct 19, 2026</p>
            </div>
            <Link
              to="/appointments"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              Full Schedule →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-hidden">
            {todayAppointments.map((apt) => {
              const statusBadges = {
                completed: 'bg-brand-100 text-brand-900 border-brand-300',
                confirmed: 'bg-gold-100 text-gold-900 border-gold-300',
                scheduled: 'bg-brand-50 text-brand-800 border-brand-200',
                cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
                no_show: 'bg-gold-50 text-gold-800 border-gold-200'
              };

              return (
                <div
                  key={apt.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 text-center flex-shrink-0 py-1 bg-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-900">{apt.startTime}</p>
                      <p className="text-[10px] text-slate-500">{apt.endTime}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{apt.childName}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadges[apt.status]}`}>
                          {apt.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {apt.programTitle} • <em>{apt.room}</em>
                      </p>
                      <p className="text-[11px] text-teal-700 font-medium mt-0.5">
                        Specialist: {apt.therapistName}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                      <>
                        <button
                          onClick={() => handleQuickStatus(apt.id, 'completed')}
                          className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1"
                          title="Mark completed"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Complete</span>
                        </button>
                        <button
                          onClick={() => handleQuickStatus(apt.id, 'cancelled')}
                          className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Cancel session"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {apt.status === 'completed' && (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Checked In
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Center Activity</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Real-time
            </span>
          </div>

          <div className="space-y-4">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-800">
                    <strong className="font-semibold text-slate-900">{log.actorName}</strong>{' '}
                    {log.action} <span className="font-semibold text-teal-700">{log.targetName}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => navigate('/reports')}
              className="w-full py-2 text-xs font-bold text-center text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
            >
              View Audit Trail →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
