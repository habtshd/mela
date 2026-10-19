import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Calendar,
  UserPlus,
  FileText,
  Check,
  ChevronDown,
  LogOut,
  ExternalLink,
  Shield,
  Stethoscope,
  Users
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface TopNavProps {
  setMobileOpen: (open: boolean) => void;
}

export const DashboardTopNav: React.FC<TopNavProps> = ({ setMobileOpen }) => {
  const {
    currentUser,
    currentRole,
    switchRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    childrenList,
    therapists,
    addChild,
    addAppointment,
    showToast
  } = useDemo();

  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  // Notification state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Profile menu
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Quick Action Modal states
  const [quickAddChildOpen, setQuickAddChildOpen] = useState(false);
  const [quickAddAptOpen, setQuickAddAptOpen] = useState(false);

  // Child form state
  const [childForm, setChildForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '2020-05-15',
    gender: 'Male' as const,
    primaryDiagnosis: 'Autism Spectrum (Level 1)',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    assignedTherapistId: therapists[0]?.id || 'therapist-1',
    allergiesSensoryNotes: ''
  });

  // Appointment form state
  const [aptForm, setAptForm] = useState({
    childId: childrenList[0]?.id || 'child-1',
    therapistId: therapists[0]?.id || 'therapist-1',
    programTitle: 'Pediatric Occupational Therapy',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '10:45',
    room: 'Sensory Gym A',
    notes: 'Regular weekly session'
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? {
        children: childrenList.filter(
          (c) =>
            c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        therapists: therapists.filter(
          (t) =>
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    : null;

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickAddChildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedTherapist = therapists.find((t) => t.id === childForm.assignedTherapistId);
    addChild({
      firstName: childForm.firstName,
      lastName: childForm.lastName,
      dateOfBirth: childForm.dateOfBirth,
      age: 5,
      gender: childForm.gender,
      primaryDiagnosis: childForm.primaryDiagnosis,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      guardian: {
        id: 'guard-' + Date.now(),
        name: childForm.guardianName || 'Parent',
        relationship: 'Parent',
        phone: childForm.guardianPhone || '(555) 000-0000',
        email: childForm.guardianEmail || 'parent@example.com',
        address: '452 Elm Street',
        preferredContactMethod: 'phone'
      },
      assignedTherapistId: childForm.assignedTherapistId,
      assignedTherapistName: assignedTherapist ? assignedTherapist.name : 'Michael Chen',
      programIds: ['prog-1'],
      emergencyContact: `${childForm.guardianName} - ${childForm.guardianPhone}`,
      allergiesSensoryNotes: childForm.allergiesSensoryNotes || 'None reported during intake.',
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
      goals: [
        {
          id: 'goal-' + Date.now(),
          title: 'Initial Intake Goal: Task Focus',
          category: 'Motor Skills',
          targetDate: '2026-12-31',
          baseline: 'Needs verbal prompting',
          currentProgress: 20,
          status: 'in_progress',
          notes: 'Baseline established at evaluation'
        }
      ]
    });
    setQuickAddChildOpen(false);
    navigate('/children');
  };

  const handleQuickAddAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find((c) => c.id === aptForm.childId);
    const therapist = therapists.find((t) => t.id === aptForm.therapistId);

    addAppointment({
      childId: aptForm.childId,
      childName: child ? `${child.firstName} ${child.lastName}` : 'Liam Jenkins',
      therapistId: aptForm.therapistId,
      therapistName: therapist ? therapist.name : 'Michael Chen',
      programId: 'prog-1',
      programTitle: aptForm.programTitle,
      date: aptForm.date,
      startTime: aptForm.startTime,
      endTime: aptForm.endTime,
      room: aptForm.room,
      status: 'scheduled',
      notes: aptForm.notes
    });
    setQuickAddAptOpen(false);
    navigate('/appointments');
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-[31px] z-30 shadow-sm no-print">
        {/* Left: Mobile hamburger & Search bar */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Interactive Global Search */}
          <div className="relative w-full max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search children, therapists, diagnoses..."
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-teal-500 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Search Dropdown Results */}
            {searchOpen && searchQuery.trim() && searchResults && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center text-xs text-slate-400 font-semibold">
                  <span>Search Results</span>
                  <button onClick={() => setSearchOpen(false)} className="hover:text-slate-600">Close</button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {searchResults.children.length > 0 && (
                    <div className="p-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Children Records</p>
                      {searchResults.children.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                            navigate('/children');
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-teal-50 flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">
                              {c.firstName} {c.lastName} ({c.age} yrs)
                            </p>
                            <p className="text-[11px] text-slate-500">{c.primaryDiagnosis}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                            {c.assignedTherapistName}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.therapists.length > 0 && (
                    <div className="p-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Therapists</p>
                      {searchResults.therapists.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                            navigate('/therapists');
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-teal-50 flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">{t.name}</p>
                            <p className="text-[11px] text-slate-500">{t.title}</p>
                          </div>
                          <span className="text-[10px] text-teal-600 font-semibold">{t.credentials}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.children.length === 0 && searchResults.therapists.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-500">
                      No matching child or therapist records found for "{searchQuery}".
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions: Quick Add, Notifications, Persona Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Button */}
          <div className="relative">
            <button
              onClick={() => setQuickAddAptOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-teal-600/20 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>+ Book Session</span>
            </button>
          </div>

          <button
            onClick={() => setQuickAddChildOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">+ Register Child</span>
            <span className="sm:hidden">+ Child</span>
          </button>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Clinical Alerts & Updates</h4>
                    <p className="text-[10px] text-slate-500">{unreadCount} unread notices</p>
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Mark all read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        n.unread ? 'bg-teal-50/40' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-teal-500" />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <p className={`text-xs font-bold ${n.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200"></div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/20"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 capitalize">{currentRole}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                    Role: {currentRole.toUpperCase()}
                  </span>
                </div>

                <div className="py-1">
                  <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Switch Role</p>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setProfileOpen(false);
                      navigate('/dashboard');
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'admin' ? 'font-bold text-teal-700' : 'text-slate-700'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    Administrator View
                  </button>
                  <button
                    onClick={() => {
                      switchRole('therapist');
                      setProfileOpen(false);
                      navigate('/dashboard');
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'therapist' ? 'font-bold text-teal-700' : 'text-slate-700'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                    Therapist (Michael Chen)
                  </button>
                  <button
                    onClick={() => {
                      switchRole('parent');
                      setProfileOpen(false);
                      navigate('/parent');
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'parent' ? 'font-bold text-teal-700' : 'text-slate-700'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    Parent Portal (Liam's Mother)
                  </button>
                </div>

                <div className="border-t border-slate-100 py-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Settings & Preferences
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      showToast('Signed out from demo session', 'info');
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Register Child Modal */}
      <Modal
        isOpen={quickAddChildOpen}
        onClose={() => setQuickAddChildOpen(false)}
        title="Register New Child Profile"
        subtitle="Create an intake record with clinical focus and guardian details."
        maxWidth="xl"
      >
        <form onSubmit={handleQuickAddChildSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Samuel"
                value={childForm.firstName}
                onChange={(e) => setChildForm({ ...childForm, firstName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Miller"
                value={childForm.lastName}
                onChange={(e) => setChildForm({ ...childForm, lastName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={childForm.dateOfBirth}
                onChange={(e) => setChildForm({ ...childForm, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={childForm.gender}
                onChange={(e) => setChildForm({ ...childForm, gender: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Diagnosis</label>
              <input
                type="text"
                required
                placeholder="e.g. Autism Spectrum"
                value={childForm.primaryDiagnosis}
                onChange={(e) => setChildForm({ ...childForm, primaryDiagnosis: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-800 mb-2">Guardian Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Miller"
                  value={childForm.guardianName}
                  onChange={(e) => setChildForm({ ...childForm, guardianName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Guardian Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  value={childForm.guardianPhone}
                  onChange={(e) => setChildForm({ ...childForm, guardianPhone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Guardian Email</label>
                <input
                  type="email"
                  placeholder="rachel@example.com"
                  value={childForm.guardianEmail}
                  onChange={(e) => setChildForm({ ...childForm, guardianEmail: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Lead Specialist</label>
              <select
                value={childForm.assignedTherapistId}
                onChange={(e) => setChildForm({ ...childForm, assignedTherapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.credentials})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sensory & Allergy Triggers</label>
              <input
                type="text"
                placeholder="e.g. Sensitive to sirens; loves weighted vest"
                value={childForm.allergiesSensoryNotes}
                onChange={(e) => setChildForm({ ...childForm, allergiesSensoryNotes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setQuickAddChildOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow transition-colors"
            >
              Save & Register Child
            </button>
          </div>
        </form>
      </Modal>

      {/* Quick Schedule Appointment Modal */}
      <Modal
        isOpen={quickAddAptOpen}
        onClose={() => setQuickAddAptOpen(false)}
        title="Schedule Therapy Session"
        subtitle="Book a 1-on-1 pediatric clinical session."
        maxWidth="lg"
      >
        <form onSubmit={handleQuickAddAptSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Child *</label>
              <select
                value={aptForm.childId}
                onChange={(e) => setAptForm({ ...aptForm, childId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.primaryDiagnosis})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Therapist *</label>
              <select
                value={aptForm.therapistId}
                onChange={(e) => setAptForm({ ...aptForm, therapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.credentials})
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
                value={aptForm.date}
                onChange={(e) => setAptForm({ ...aptForm, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                required
                value={aptForm.startTime}
                onChange={(e) => setAptForm({ ...aptForm, startTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
              <input
                type="time"
                required
                value={aptForm.endTime}
                onChange={(e) => setAptForm({ ...aptForm, endTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Program / Service</label>
              <select
                value={aptForm.programTitle}
                onChange={(e) => setAptForm({ ...aptForm, programTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Pediatric Occupational Therapy">Pediatric Occupational Therapy</option>
                <option value="Speech & Language Pathology">Speech & Language Pathology</option>
                <option value="Applied Behavior Analysis (ABA)">Applied Behavior Analysis (ABA)</option>
                <option value="Sensory Integration Gym & Therapy">Sensory Integration Gym & Therapy</option>
                <option value="Social Communication Group">Social Communication Group</option>
                <option value="Pediatric Physical Therapy">Pediatric Physical Therapy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Therapy Room / Suite</label>
              <select
                value={aptForm.room}
                onChange={(e) => setAptForm({ ...aptForm, room: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Sensory Gym A">Sensory Gym A</option>
                <option value="Speech Pod 1">Speech Pod 1</option>
                <option value="Behavioral Suite 2">Behavioral Suite 2</option>
                <option value="Motor Gym B">Motor Gym B</option>
                <option value="Sensory Music Studio">Sensory Music Studio</option>
                <option value="Consultation Room 3">Consultation Room 3</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Session Target Notes</label>
            <input
              type="text"
              placeholder="e.g. Focus on fine motor cutting and sensory swing regulation"
              value={aptForm.notes}
              onChange={(e) => setAptForm({ ...aptForm, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setQuickAddAptOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
