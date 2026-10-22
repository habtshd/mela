import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileSpreadsheet,
  Layers,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  X,
  ExternalLink,
  Shield,
  UserCheck,
  Link2,
  Activity
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentUser, currentRole, switchRole, showToast } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  // Explicitly defined navigation for Therapist Clinical Portal
  const therapistNavItems = [
    { label: 'Therapist Dashboard', href: '/therapist-portal', icon: Stethoscope },
    { label: 'Live Clinical Workspace', href: '/therapist-workspace', icon: Activity, badge: 'Live', special: true },
    { label: 'Appointments & Schedule', href: '/appointments', icon: CalendarDays },
    { label: 'SOAP Notes & History', href: '/sessions', icon: FileSpreadsheet },
  ];

  // Explicitly defined navigation for Admin Operations Portal
  const adminNavItems = [
    { label: 'Executive Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Children & Intake', href: '/children', icon: Users, badge: '8' },
    { label: 'Therapists & Staffing', href: '/therapists', icon: Users },
    { label: 'Therapy Programs', href: '/admin-programs', icon: Layers },
    { label: 'Billing & Invoices', href: '/billing', icon: CreditCard, alert: true },
    { label: 'Facility Analytics', href: '/reports', icon: BarChart3 },
    { label: 'Portal Integrations', href: '/integrations', icon: Link2 },
    { label: 'Platform Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    showToast('Signed out from demo session', 'info');
    navigate('/login');
  };

  const isTherapistRoute =
    location.pathname === '/therapist-portal' ||
    location.pathname.startsWith('/therapist-workspace') ||
    location.pathname === '/sessions';

  const roleBadges = {
    admin: { label: 'Administrator', bg: 'bg-brand-100 text-brand-900 border-brand-300' },
    therapist: { label: 'Specialist / OT', bg: 'bg-brand-50 text-brand-800 border-brand-200' },
    parent: { label: 'Parent Portal', bg: 'bg-gold-100 text-gold-900 border-gold-300' }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 text-slate-200 flex flex-col transition-transform duration-300 ease-in-out border-r border-white/5 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print shadow-2xl`}
        style={{ background: 'linear-gradient(180deg, #112522 0%, #0c1c19 100%)' }}
      >
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/5">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl p-1.5 flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:border-[#F9E34D]/40 transition-colors">
              <img
                src="/logo.png"
                alt="Mela Special Needs Service Logo"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                Mela <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-[#F9E34D]/15 text-[#F9E34D] border border-[#F9E34D]/25">Care</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Special Needs Care Platform</p>
            </div>
          </NavLink>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. PORTAL DEFINITION SELECTOR SWITCH */}
        <div className="px-3 pt-3">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/5 text-[11px] font-bold">
            <button
              onClick={() => {
                switchRole('admin');
                navigate('/dashboard');
              }}
              type="button"
              className={`py-2 px-2.5 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
                !isTherapistRoute
                  ? 'bg-[#3B833A] text-white shadow-sm font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => {
                switchRole('therapist');
                navigate('/therapist-portal');
              }}
              type="button"
              className={`py-2 px-2.5 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 ${
                isTherapistRoute
                  ? 'bg-[#3B833A] text-white shadow-sm font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Therapist</span>
            </button>
          </div>
        </div>

        {/* Current User Role Info */}
        <div className="p-3 mx-3 my-2 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/10"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#112522]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] font-medium text-emerald-400/90 truncate capitalize">
                {roleBadges[currentRole]?.label || 'Active Specialist'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 px-3 py-1 space-y-4 overflow-y-auto">
          {/* SECTION 1: THERAPIST CLINICAL PORTAL */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-400/80">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Therapist Portal
              </span>
              <span className="text-[9px] lowercase font-normal opacity-70">clinical</span>
            </div>

            {therapistNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-white/[0.10] text-white font-bold ring-1 ring-white/10'
                      : item.special
                      ? 'text-emerald-300 hover:bg-white/[0.04]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#F9E34D]'
                            : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#F9E34D]/20 text-[#F9E34D]'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* SECTION 2: ADMIN OPERATIONS PORTAL */}
          <div className="space-y-0.5 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#F9E34D]/80">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F9E34D]" />
                Admin Portal
              </span>
              <span className="text-[9px] lowercase font-normal opacity-70">operations</span>
            </div>

            {adminNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-white/[0.10] text-white font-bold ring-1 ring-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#F9E34D]'
                            : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            isActive
                              ? 'bg-[#F9E34D]/20 text-[#F9E34D]'
                              : 'bg-white/[0.06] text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.alert && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F9E34D]" />
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* SECTION 3: CONNECTED PORTALS */}
          <div className="space-y-0.5 pt-2 border-t border-white/5">
            <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
              Connected Portals
            </div>

            <NavLink
              to="/parent"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-white/[0.10] text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Parent Portal View</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                Family
              </span>
            </NavLink>
          </div>
        </nav>

        {/* Bottom Section: Public Site Link & Sign Out */}
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
          <NavLink
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Live</span>
          </NavLink>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
