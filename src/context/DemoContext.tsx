import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Child,
  Therapist,
  Program,
  Appointment,
  SessionRecord,
  Invoice,
  ActivityLog,
  NotificationItem,
  OrganizationSettings
} from '../types';
import {
  DEMO_USERS,
  INITIAL_CHILDREN,
  INITIAL_THERAPISTS,
  INITIAL_PROGRAMS,
  INITIAL_APPOINTMENTS,
  INITIAL_SESSIONS,
  INITIAL_INVOICES,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface DemoContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  childrenList: Child[];
  therapists: Therapist[];
  programs: Program[];
  appointments: Appointment[];
  sessions: SessionRecord[];
  invoices: Invoice[];
  activityLogs: ActivityLog[];
  notifications: NotificationItem[];
  settings: OrganizationSettings;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  addChild: (child: Omit<Child, 'id'>) => Child;
  updateChild: (id: string, updates: Partial<Child>) => void;
  archiveChild: (id: string) => void;
  deleteChild: (id: string) => void;
  addAppointment: (apt: Omit<Appointment, 'id'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  addSession: (session: Omit<SessionRecord, 'id'>) => SessionRecord;
  recordInvoicePayment: (invoiceId: string, amount: number, paymentMethod: string) => void;
  addTherapist: (therapist: Omit<Therapist, 'id'>) => Therapist;
  updateTherapist: (id: string, updates: Partial<Therapist>) => void;
  addProgram: (program: Omit<Program, 'id'>) => Program;
  updateProgram: (id: string, updates: Partial<Program>) => void;
  updateSettings: (newSettings: Partial<OrganizationSettings>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'mela_demo_role',
  CHILDREN: 'mela_demo_children',
  THERAPISTS: 'mela_demo_therapists',
  PROGRAMS: 'mela_demo_programs',
  APPOINTMENTS: 'mela_demo_appointments',
  SESSIONS: 'mela_demo_sessions',
  INVOICES: 'mela_demo_invoices',
  ACTIVITY: 'mela_demo_activity',
  NOTIFICATIONS: 'mela_demo_notifications',
  SETTINGS: 'mela_demo_settings'
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'admin';
  });

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.admin;

  const [childrenList, setChildrenList] = useState<Child[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHILDREN);
    return saved ? JSON.parse(saved) : INITIAL_CHILDREN;
  });

  const [therapists, setTherapists] = useState<Therapist[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THERAPISTS);
    return saved ? JSON.parse(saved) : INITIAL_THERAPISTS;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [sessions, setSessions] = useState<SessionRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState<OrganizationSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(childrenList));
  }, [childrenList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THERAPISTS, JSON.stringify(therapists));
  }, [therapists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const target = DEMO_USERS[role];
    showToast(`Switched view to ${target.name} (${target.title})`, 'info');
  };

  const logActivity = (action: string, targetName: string, category: ActivityLog['category']) => {
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      timestamp: 'Just now',
      actorName: currentUser.name,
      actorRole: currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'therapist' ? 'Therapist' : 'Parent',
      action,
      targetName,
      category
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 20)]);
  };

  const addChild = (childData: Omit<Child, 'id'>): Child => {
    const newChild: Child = {
      ...childData,
      id: 'child-' + Date.now()
    };
    setChildrenList((prev) => [newChild, ...prev]);
    logActivity('Registered new child', `${newChild.firstName} ${newChild.lastName}`, 'clinical');
    showToast(`Successfully registered ${newChild.firstName} ${newChild.lastName}!`, 'success');
    return newChild;
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    const target = childrenList.find((c) => c.id === id);
    if (target) {
      logActivity('Updated profile & goals for', `${target.firstName} ${target.lastName}`, 'clinical');
    }
    showToast('Child profile updated successfully', 'success');
  };

  const archiveChild = (id: string) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'on_hold' as const } : c))
    );
    showToast('Child status changed to On Hold / Archived', 'info');
  };

  const deleteChild = (id: string) => {
    const child = childrenList.find((c) => c.id === id);
    setChildrenList((prev) => prev.filter((c) => c.id !== id));
    if (child) {
      logActivity('Removed record for', `${child.firstName} ${child.lastName}`, 'administrative');
      showToast(`Removed record for ${child.firstName} ${child.lastName}`, 'warning');
    }
  };

  const addAppointment = (aptData: Omit<Appointment, 'id'>): Appointment => {
    const newApt: Appointment = {
      ...aptData,
      id: 'apt-' + Date.now()
    };
    setAppointments((prev) => [newApt, ...prev]);
    logActivity('Scheduled session for', `${newApt.childName} with ${newApt.therapistName}`, 'scheduling');
    showToast(`Appointment booked for ${newApt.childName} on ${newApt.date}`, 'success');
    return newApt;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    showToast('Appointment updated successfully', 'success');
  };

  const cancelAppointment = (id: string, reason = 'Cancelled by request') => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'cancelled', cancellationReason: reason } : a
      )
    );
    showToast('Appointment has been marked cancelled', 'info');
  };

  const addSession = (sessionData: Omit<SessionRecord, 'id'>): SessionRecord => {
    const newSession: SessionRecord = {
      ...sessionData,
      id: 'sess-' + Date.now()
    };
    setSessions((prev) => [newSession, ...prev]);
    logActivity('Logged SOAP progress note for', newSession.childName, 'clinical');
    showToast(`SOAP note recorded for ${newSession.childName}`, 'success');
    return newSession;
  };

  const recordInvoicePayment = (invoiceId: string, amount: number, paymentMethod: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = inv.amountPaid + amount;
          const newBalance = Math.max(0, inv.total - newPaid);
          const newStatus = newBalance === 0 ? 'paid' : inv.status;
          return {
            ...inv,
            amountPaid: newPaid,
            balanceDue: newBalance,
            status: newStatus,
            paymentMethod,
            paidAt: new Date().toISOString().split('T')[0]
          };
        }
        return inv;
      })
    );
    const target = invoices.find((i) => i.id === invoiceId);
    if (target) {
      logActivity(`Recorded payment of $${amount} for`, target.invoiceNumber, 'billing');
    }
    showToast(`Payment of $${amount} recorded! Balance updated.`, 'success');
  };

  const addTherapist = (therapistData: Omit<Therapist, 'id'>): Therapist => {
    const newT: Therapist = {
      ...therapistData,
      id: 'therapist-' + Date.now()
    };
    setTherapists((prev) => [...prev, newT]);
    logActivity('Added team specialist', `${newT.name} (${newT.title})`, 'administrative');
    showToast(`Specialist ${newT.name} added to directory`, 'success');
    return newT;
  };

  const updateTherapist = (id: string, updates: Partial<Therapist>) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast('Therapist profile updated', 'success');
  };

  const addProgram = (programData: Omit<Program, 'id'>): Program => {
    const newP: Program = {
      ...programData,
      id: 'prog-' + Date.now()
    };
    setPrograms((prev) => [...prev, newP]);
    logActivity('Created new therapy program', newP.title, 'administrative');
    showToast(`Program "${newP.title}" created successfully!`, 'success');
    return newP;
  };

  const updateProgram = (id: string, updates: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Program details updated', 'success');
  };

  const updateSettings = (newSettings: Partial<OrganizationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Platform settings saved successfully', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked read', 'info');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCurrentRole('admin');
    setChildrenList(INITIAL_CHILDREN);
    setTherapists(INITIAL_THERAPISTS);
    setPrograms(INITIAL_PROGRAMS);
    setAppointments(INITIAL_APPOINTMENTS);
    setSessions(INITIAL_SESSIONS);
    setInvoices(INITIAL_INVOICES);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    showToast('Demo data restored to initial state!', 'info');
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        childrenList,
        therapists,
        programs,
        appointments,
        sessions,
        invoices,
        activityLogs,
        notifications,
        settings,
        toasts,
        showToast,
        removeToast,
        addChild,
        updateChild,
        archiveChild,
        deleteChild,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        addSession,
        recordInvoicePayment,
        addTherapist,
        updateTherapist,
        addProgram,
        updateProgram,
        updateSettings,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
