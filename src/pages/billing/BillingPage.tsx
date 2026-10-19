import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Invoice } from '../../types';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  Filter,
  FileText,
  Eye,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Modal } from '../../components/common/Modal';

export const BillingPage: React.FC = () => {
  const { invoices, recordInvoicePayment, showToast, settings } = useDemo();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa/Mastercard)');

  // Revenue overview metrics
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalCollected = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const overdueCount = invoices.filter((inv) => inv.status === 'overdue').length;

  const monthlyRevenueData = [
    { month: 'May', revenue: 14200 },
    { month: 'Jun', revenue: 16800 },
    { month: 'Jul', revenue: 18400 },
    { month: 'Aug', revenue: 19100 },
    { month: 'Sep', revenue: 21500 },
    { month: 'Oct (MTD)', revenue: 22800 }
  ];

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.childName.toLowerCase().includes(search.toLowerCase()) ||
      inv.guardianName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPayment = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setPaymentAmount(inv.balanceDue);
    setPaymentModalOpen(true);
  };

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    recordInvoicePayment(selectedInvoice.id, Number(paymentAmount), paymentMethod);
    setPaymentModalOpen(false);

    // Update selected invoice reference
    setSelectedInvoice((prev) =>
      prev
        ? {
            ...prev,
            amountPaid: prev.amountPaid + Number(paymentAmount),
            balanceDue: Math.max(0, prev.balanceDue - Number(paymentAmount)),
            status: prev.balanceDue - Number(paymentAmount) <= 0 ? 'paid' : prev.status
          }
        : null
    );
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const styles = {
      paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pending: 'bg-amber-50 text-amber-800 border-amber-200',
      overdue: 'bg-rose-50 text-rose-800 border-rose-200'
    };
    return (
      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Billing & Invoices</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Invoices, superbills, and payment tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            🔒 Demo Mode
          </span>
        </div>
      </div>

      {/* Financial Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Invoiced (MTD)</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">${totalInvoiced.toLocaleString()}</p>
          <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +8.4% vs last mo
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Collected Receipts</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700">${totalCollected.toLocaleString()}</p>
          <span className="text-[11px] font-medium text-slate-500 block mt-1">
            Settled via HSA, Credit & Check
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Outstanding Balance</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-700">${totalOutstanding.toLocaleString()}</p>
          <span className="text-[11px] font-medium text-slate-500 block mt-1">
            Pending parent remittance
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Overdue Invoices</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-700">{overdueCount} Invoices</p>
          <span className="text-[11px] font-medium text-rose-600 block mt-1">
            Automated reminder sent
          </span>
        </div>
      </div>

      {/* Monthly Revenue Trend Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Monthly Clinical Revenue Trend</h3>
            <p className="text-xs text-slate-500">Gross billed therapy revenue across recent months</p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Average: $18,800 / mo
          </span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px'
                }}
                formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Billed Revenue']}
              />
              <Bar dataKey="revenue" fill="#0d9488" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoices Table and Filters */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice #, child or guardian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="all">All Invoices</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-slate-100 text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-6 py-3">Invoice #</th>
                <th className="px-6 py-3">Child / Guardian</th>
                <th className="px-6 py-3">Issue Date</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Balance Due</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{inv.childName}</p>
                    <p className="text-[11px] text-slate-400">{inv.guardianName}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{inv.issueDate}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.dueDate}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${inv.total}</td>
                  <td className="px-6 py-4 font-bold text-amber-700">
                    ${inv.balanceDue}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded-lg font-bold"
                    >
                      View
                    </button>
                    {inv.balanceDue > 0 && (
                      <button
                        onClick={() => handleOpenPayment(inv)}
                        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-sm"
                      >
                        Record Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail & Receipt Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice ${selectedInvoice.invoiceNumber}`}
          subtitle={`Issued: ${selectedInvoice.issueDate} • Due: ${selectedInvoice.dueDate}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Header Letterhead */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-black text-slate-900 text-lg">{settings.name}</h3>
                <p className="text-xs text-slate-500">{settings.address}</p>
                <p className="text-xs text-slate-500">Phone: {settings.phone}</p>
              </div>
              <div className="text-right">
                {getStatusBadge(selectedInvoice.status)}
                <p className="text-xs text-slate-500 mt-1">Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-4 rounded-xl bg-slate-50 text-xs grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px]">Billed To Guardian</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedInvoice.guardianName}</p>
                <p className="text-slate-500">{selectedInvoice.guardianEmail}</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px]">Patient Record</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedInvoice.childName}</p>
                <p className="text-slate-500">Pediatric Therapy Superbill</p>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-y border-slate-200 text-slate-600 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Therapy Service Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${item.unitPrice}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Calculation */}
            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">${selectedInvoice.subtotal}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-teal-700">
                    <span>Family Benefit Discount:</span>
                    <span>-${selectedInvoice.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>${selectedInvoice.total}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Amount Paid:</span>
                  <span className="font-semibold">${selectedInvoice.amountPaid}</span>
                </div>
                <div className="flex justify-between text-base font-black text-amber-700 pt-1 border-t border-slate-200">
                  <span>Balance Due:</span>
                  <span>${selectedInvoice.balanceDue}</span>
                </div>
              </div>
            </div>

            {selectedInvoice.paidAt && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Paid in full on {selectedInvoice.paidAt} via {selectedInvoice.paymentMethod}
                </span>
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Superbill Receipt
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                {selectedInvoice.balanceDue > 0 && (
                  <button
                    onClick={() => {
                      setPaymentAmount(selectedInvoice.balanceDue);
                      setPaymentModalOpen(true);
                    }}
                    className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Record Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Record Payment Demonstration Modal */}
      {paymentModalOpen && selectedInvoice && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          title="Record Payment Simulation"
          subtitle={`Invoice ${selectedInvoice.invoiceNumber} for ${selectedInvoice.childName}`}
          maxWidth="md"
        >
          <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              Current Outstanding Balance: <strong>${selectedInvoice.balanceDue}</strong>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Amount ($) *</label>
              <input
                type="number"
                required
                max={selectedInvoice.balanceDue}
                min={1}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Credit Card (Visa ending in 4108)">Credit Card (Visa/Mastercard)</option>
                <option value="HSA / Flex Spending Card">HSA / Flex Spending Card</option>
                <option value="Bank ACH Remittance">Direct Bank ACH</option>
                <option value="Paper Check #1042">Paper Check</option>
                <option value="Cash / Reception Receipt">Cash at Reception</option>
              </select>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white shadow"
              >
                Confirm & Record Payment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
