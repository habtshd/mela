import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  Filter,
  DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';

export const ReportsPage: React.FC = () => {
  const { childrenList, therapists, appointments, sessions, invoices, showToast } = useDemo();

  const [dateRange, setDateRange] = useState('Quarter 3 (Jul - Sep)');
  const [activeTab, setActiveTab] = useState<'clinical' | 'attendance' | 'financial'>('clinical');

  // Report Metrics
  const totalMasteredGoals = childrenList.flatMap((c) => c.goals).filter((g) => g.status === 'mastered').length;
  const totalTrackedGoals = childrenList.flatMap((c) => c.goals).length;
  const averageMasteryScore = Math.round(
    sessions.reduce((sum, s) => sum + s.progressScore, 0) / (sessions.length || 1)
  );

  const completedApts = appointments.filter((a) => a.status === 'completed').length;
  const completionRate = Math.round((completedApts / (appointments.length || 1)) * 100);

  // Goal Mastery Progression by Domain
  const clinicalOutcomesData = [
    { domain: 'Sensory Reg', target: 85, current: 82 },
    { domain: 'Fine Motor', target: 80, current: 78 },
    { domain: 'Speech / AAC', target: 75, current: 74 },
    { domain: 'Behavioral', target: 90, current: 86 },
    { domain: 'Daily Living', target: 80, current: 83 }
  ];

  // Attendance Trend
  const attendanceData = [
    { week: 'Wk 1', attended: 42, cancelled: 3 },
    { week: 'Wk 2', attended: 46, cancelled: 2 },
    { week: 'Wk 3', attended: 48, cancelled: 4 },
    { week: 'Wk 4', attended: 52, cancelled: 1 }
  ];

  // Client-Side CSV Export Function
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeTab === 'clinical') {
      csvContent += 'Child Name,Primary Diagnosis,Goals Total,Goals Mastered,Lead Specialist\n';
      childrenList.forEach((c) => {
        const mastered = c.goals.filter((g) => g.status === 'mastered').length;
        csvContent += `"${c.firstName} ${c.lastName}","${c.primaryDiagnosis}",${c.goals.length},${mastered},"${c.assignedTherapistName}"\n`;
      });
    } else if (activeTab === 'attendance') {
      csvContent += 'Date,Time,Child Name,Program,Specialist,Status,Room\n';
      appointments.forEach((a) => {
        csvContent += `"${a.date}","${a.startTime}","${a.childName}","${a.programTitle}","${a.therapistName}","${a.status}","${a.room}"\n`;
      });
    } else {
      csvContent += 'Invoice Number,Child Name,Guardian,Issue Date,Total,Paid,Balance,Status\n';
      invoices.forEach((i) => {
        csvContent += `"${i.invoiceNumber}","${i.childName}","${i.guardianName}","${i.issueDate}",${i.total},${i.amountPaid},${i.balanceDue},"${i.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mela_${activeTab}_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${activeTab.toUpperCase()} report as CSV file!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Clinical Analytics & Operational Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Auditing patient progress, attendance rates, caseload capacity, and insurance reimbursement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Date Filter & Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Reporting Interval:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
          >
            <option value="Current Month (October 2026)">Current Month (October 2026)</option>
            <option value="Quarter 3 (Jul - Sep)">Quarter 3 (Jul - Sep)</option>
            <option value="Year to Date 2026">Year to Date 2026</option>
            <option value="All Time Baseline">All Time Baseline</option>
          </select>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-4 py-1.5 text-xs font-bold transition-colors ${
              activeTab === 'clinical' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinical Outcomes
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-1.5 text-xs font-bold transition-colors ${
              activeTab === 'attendance' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Attendance & Sessions
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-4 py-1.5 text-xs font-bold transition-colors ${
              activeTab === 'financial' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Financial & Superbills
          </button>
        </div>
      </div>

      {/* Quick KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-500 block mb-1">Average Session Score</span>
          <p className="text-2xl font-black text-teal-700">{averageMasteryScore}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all SOAP clinical entries</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-500 block mb-1">Appointment Retention</span>
          <p className="text-2xl font-black text-emerald-700">{completionRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Low cancellation / no-show index</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-500 block mb-1">IEP Goals Mastered</span>
          <p className="text-2xl font-black text-slate-900">
            {totalMasteredGoals} <span className="text-sm font-normal text-slate-400">/ {totalTrackedGoals}</span>
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold">Objective progress tracked</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-500 block mb-1">Active Pediatric Caseload</span>
          <p className="text-2xl font-black text-slate-900">{childrenList.length} Children</p>
          <p className="text-[11px] text-slate-400 mt-1">Under multi-specialty care</p>
        </div>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'clinical' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Target vs. Actual Milestone Progress by Therapy Domain
            </h3>
            <p className="text-xs text-slate-500">Benchmark goal attainment across pediatric categories</p>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clinicalOutcomesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="domain" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
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
                  <Bar dataKey="current" fill="#0d9488" radius={[6, 6, 0, 0]} name="Current Actual %" />
                  <Bar dataKey="target" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Baseline Target %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900">Children Goal Attainment Highlights</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {childrenList.slice(0, 4).map((c) => (
                <div key={c.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{c.firstName} {c.lastName}</p>
                    <p className="text-[11px] text-slate-500">{c.primaryDiagnosis}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-teal-700">
                      {c.goals.filter((g) => g.status === 'mastered').length} of {c.goals.length} Goals
                    </span>
                    <p className="text-[10px] text-slate-400">Mastered</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900">Weekly Clinical Attendance Rates</h3>
          <p className="text-xs text-slate-500">Completed therapy appointments vs patient cancellations</p>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
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
                <Area type="monotone" dataKey="attended" stroke="#0d9488" fill="#ccfbf1" name="Sessions Completed" />
                <Area type="monotone" dataKey="cancelled" stroke="#f43f5e" fill="#ffe4e6" name="Cancellations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Superbill & Invoicing Audit Summary</h3>
            <span className="text-xs font-semibold text-slate-500">{invoices.length} Registered Invoices</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-slate-100 text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Child Patient</th>
                <th className="px-4 py-3">Billed</th>
                <th className="px-4 py-3">Remitted</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3">{inv.childName}</td>
                  <td className="px-4 py-3 font-bold">${inv.total}</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">${inv.amountPaid}</td>
                  <td className="px-4 py-3 font-bold uppercase text-[10px]">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
