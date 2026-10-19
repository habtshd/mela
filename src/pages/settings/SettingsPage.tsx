import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Settings as SettingsIcon,
  RotateCcw,
  Building,
  Bell,
  Eye,
  Check,
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData, showToast } = useDemo();

  const [formData, setFormData] = useState({ ...settings });
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure clinic organizational details, automated reminders, and presentation demo state.
          </p>
        </div>

        <button
          onClick={() => setConfirmResetOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>Reset Demo Dataset</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Clinic Profile & Licensure</h2>
              <p className="text-xs text-slate-500">Official clinic identifiers used on invoices and reports</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Center Legal Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinic Phone Hotline</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">State License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Facility Physical Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Operating Hours Schedule</label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Notifications & Automation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Automated Communications</h2>
              <p className="text-xs text-slate-500">Configure client SMS and email reminder notifications</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <strong className="block text-slate-900 font-semibold">SMS Appointment Reminders (24h Before)</strong>
                <span className="text-slate-500">Automatically dispatches SMS reminders to parents for scheduled sessions.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.smsReminders}
                onChange={(e) => setFormData({ ...formData, smsReminders: e.target.checked })}
                className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <strong className="block text-slate-900 font-semibold">Email Progress Reports & SOAP Notes</strong>
                <span className="text-slate-500">Notify parents whenever a therapist signs off on a new session note.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.emailProgressReports}
                onChange={(e) => setFormData({ ...formData, emailProgressReports: e.target.checked })}
                className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <strong className="block text-slate-900 font-semibold">Billing Superbill Dispatches</strong>
                <span className="text-slate-500">Send itemized superbill receipts upon recorded payment.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.billingAlerts}
                onChange={(e) => setFormData({ ...formData, billingAlerts: e.target.checked })}
                className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setConfirmResetOpen(false);
          setFormData({ ...settings });
        }}
        title="Restore Initial Sample Data?"
        message="This will reset all children, therapist records, scheduled appointments, SOAP notes, and billing items back to their pristine demo defaults."
        confirmLabel="Yes, Reset All Data"
        variant="warning"
      />
    </div>
  );
};
