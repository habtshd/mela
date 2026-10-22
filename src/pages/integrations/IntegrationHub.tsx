import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Link2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Globe,
  Users,
  Smartphone,
  Lock,
  Database,
  ArrowRight,
  Server,
  Key
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IntegrationHub: React.FC = () => {
  const { showToast, settings } = useDemo();
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [syncingPortal, setSyncingPortal] = useState<string | null>(null);

  const mockApiKey = 'mela_live_sec_8f9a2e1d0c4b7a65913e2840c9';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setApiKeyCopied(true);
    showToast('Secure API Key copied to clipboard', 'success');
    setTimeout(() => setApiKeyCopied(false), 2500);
  };

  const handleManualSync = (portalName: string) => {
    setSyncingPortal(portalName);
    setTimeout(() => {
      setSyncingPortal(null);
      showToast(`${portalName} state synchronized successfully`, 'success');
    }, 900);
  };

  const integrations = [
    {
      id: 'parent-portal',
      name: 'Mela Parent & Family Portal',
      description: 'Connected standalone portal for parents (Sarah Jenkins) to track therapy progress, appointments & pay invoices.',
      status: 'Connected & Live',
      type: 'Bidirectional Sync',
      endpoint: '/parent',
      icon: Users,
      lastSync: 'Real-time (Active)',
      color: 'emerald'
    },
    {
      id: 'public-website',
      name: 'Public Website & Intake Leads',
      description: 'Receives parent consultation requests, intake bookings, and shadow teaching registrations.',
      status: 'Connected & Live',
      type: 'Ingestion & Booking',
      endpoint: '/',
      icon: Globe,
      lastSync: 'Real-time (Active)',
      color: 'teal'
    },
    {
      id: 'telegram-community',
      name: 'Telegram Community Channel',
      description: 'Direct push integration with @MelaSpecialNeedsService and parent support discussions.',
      status: 'Webhook Ready',
      type: 'Broadcast Bot',
      endpoint: 'https://t.me/MelaSpecialNeedsService',
      icon: Smartphone,
      lastSync: '5 mins ago',
      color: 'sky'
    },
    {
      id: 'emr-superbill',
      name: 'Clinical EMR & Billing Export',
      description: 'Generates itemized superbills, receipts, and clinical progress reports in printable format.',
      status: 'Integrated',
      type: 'FHIR / PDF Exporter',
      endpoint: '/reports',
      icon: Database,
      lastSync: 'On-demand',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Integrations & Standalone Bridge</h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active Bridge
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mela Admin operates as an autonomous operational hub connected to the Parent Portal, Public Web, and Communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/parent"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
          >
            <span>Launch Parent Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F9E34D]" />
          </Link>
        </div>
      </div>

      {/* Standalone Architecture Banner */}
      <div className="rounded-3xl p-6 border text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1f4f49 0%, #13332f 100%)', borderColor: '#265e57' }}>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-[#F9E34D]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F9E34D]">
              Standalone Micro-Service Architecture
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Isolated Admin Dashboard with Unified Live Data Bus
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            The Admin Management OS runs in an autonomous security sandbox with independent authentication, role permissioning, and event-driven data propagation to client portals.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA-Compliant Sandbox</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F9E34D]" />
              <span>Real-Time Bi-Directional Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Connected Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800">
                    <item.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Sync: <strong className="text-slate-700">{item.lastSync}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleManualSync(item.name)}
                  disabled={syncingPortal === item.name}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Manual Sync"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingPortal === item.name ? 'animate-spin text-emerald-600' : ''}`} />
                </button>
                {item.endpoint.startsWith('http') ? (
                  <a
                    href={item.endpoint}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={item.endpoint}
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Credentials & Webhook Tokens */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">API Gateway & Webhook Secrets</h3>
              <p className="text-xs text-slate-500">Authorization key for external portal integrations</p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            TLS 1.3 Active
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Production Integration Secret Key
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 font-mono text-xs bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 select-all">
                {mockApiKey}
              </div>
              <button
                onClick={handleCopyKey}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                {apiKeyCopied ? 'Copied!' : 'Copy Key'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-0.5">Parent Portal Webhook</span>
              <code className="text-[11px] text-slate-500 block truncate">https://api.melaspecialneeds.org/v1/parent/webhook</code>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900 block mb-0.5">Public Website Lead Listener</span>
              <code className="text-[11px] text-slate-500 block truncate">https://api.melaspecialneeds.org/v1/leads/ingest</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
