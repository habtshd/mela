import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LogOut,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ADMIN_SIDEBAR_SECTIONS, NavItemConfig } from '../../config/adminNavigation';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentUser, currentRole, switchRole, showToast } = useDemo();
  const navigate = useNavigate();

  const handleSignOut = () => {
    showToast('Signed out from demo session', 'info');
    navigate('/login');
  };

  const roleBadges: Record<string, { label: string; tag: string }> = {
    admin: { label: 'Administrator', tag: 'Care Operations' },
    therapist: { label: 'Specialist / OT', tag: 'Clinical Staff' },
    parent: { label: 'Parent Portal', tag: 'Family Care' }
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

      {/* Standard Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 text-slate-200 flex flex-col transition-transform duration-300 ease-in-out border-r border-white/5 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print shadow-2xl`}
        style={{ background: 'linear-gradient(180deg, #112522 0%, #0c1c19 100%)' }}
      >
        {/* 1. Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/5 flex-shrink-0">
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
                Mela <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#F9E34D]/15 text-[#F9E34D] border border-[#F9E34D]/25">Admin</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Care Management OS</p>
            </div>
          </NavLink>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Current User Profile Card & Role Switcher */}
        <div className="p-3 mx-3 my-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#112522]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-emerald-400/90 capitalize">
                  {roleBadges[currentRole]?.label || 'User'}
                </span>
                <span className="text-[9px] text-slate-500">•</span>
                <span className="text-[9px] text-slate-400 font-medium truncate">
                  {roleBadges[currentRole]?.tag}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Standard Categorized Navigation Sections */}
        <nav className="flex-1 px-3 py-1 space-y-4 overflow-y-auto custom-scrollbar">
          {ADMIN_SIDEBAR_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-black tracking-wider uppercase text-slate-400/60">
                {section.category}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item: NavItemConfig) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group relative ${
                        isActive
                          ? 'bg-white/[0.08] text-white font-semibold shadow-sm'
                          : item.special
                          ? 'text-emerald-300 hover:bg-white/[0.04]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active vertical accent indicator bar */}
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#F9E34D]" />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          <item.icon
                            className={`w-4 h-4 flex-shrink-0 transition-colors ${
                              isActive
                                ? 'text-[#F9E34D]'
                                : item.special
                                ? 'text-emerald-400'
                                : 'text-slate-400 group-hover:text-slate-300'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-tight ${
                                item.badgeVariant === 'live'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : item.badgeVariant === 'warning'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : isActive
                                  ? 'bg-[#F9E34D]/20 text-[#F9E34D]'
                                  : 'bg-white/[0.06] text-slate-400'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.alert && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          )}
                        </div>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* 4. Bottom Standard Section: Public Website & Sign Out */}
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex-shrink-0">
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
