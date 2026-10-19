import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Heart,
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
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentUser, currentRole, switchRole, showToast } = useDemo();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Children & Intake', href: '/children', icon: Users, badge: '8' },
    { label: 'Therapists & Staff', href: '/therapists', icon: Stethoscope },
    { label: 'Appointments & Cal', href: '/appointments', icon: CalendarDays },
    { label: 'Sessions & SOAP Notes', href: '/sessions', icon: FileSpreadsheet },
    { label: 'Therapy Programs', href: '/admin-programs', icon: Layers },
    { label: 'Billing & Invoices', href: '/billing', icon: CreditCard, alert: true },
    { label: 'Analytics & Reports', href: '/reports', icon: BarChart3 },
    { label: 'Parent Portal View', href: '/parent', icon: UserCheck, special: true },
    { label: 'Platform Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    showToast('Signed out from demo session', 'info');
    navigate('/login');
  };

  const roleBadges = {
    admin: { label: 'Administrator', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    therapist: { label: 'Specialist / OT', bg: 'bg-teal-100 text-teal-800 border-teal-200' },
    parent: { label: 'Parent Portal', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/50">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                Mela <span className="text-teal-400 text-sm font-bold">Admin</span>
              </span>
              <p className="text-[10px] text-teal-300/70 font-medium">Care Management OS</p>
            </div>
          </NavLink>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Role Pill */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold border mt-0.5 ${roleBadges[currentRole].bg}`}>
                {roleBadges[currentRole].label}
              </span>
            </div>
          </div>

          {currentRole === 'therapist' && (
            <div className="mt-2.5 p-2 rounded-lg bg-teal-950/60 border border-teal-800/50 text-[11px] text-teal-200">
              🩺 Filtered to Michael Chen's clinical caseload & notes
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Clinical Operations
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : item.special
                    ? 'text-teal-300 hover:bg-slate-800/80 bg-teal-950/20 border border-teal-900/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-slate-400 group-hover:text-teal-300 transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {item.badge}
                </span>
              )}
              {item.alert && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section: Public Site Link & Sign Out */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 space-y-2">
          <NavLink
            to="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span>View Public Website</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Live</span>
          </NavLink>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out (Demo)</span>
          </button>
        </div>
      </aside>
    </>
  );
};
