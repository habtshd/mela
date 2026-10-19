import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Services } from './pages/public/Services';
import { Team } from './pages/public/Team';
import { Programs } from './pages/public/Programs';
import { Gallery } from './pages/public/Gallery';
import { FAQ } from './pages/public/FAQ';
import { Contact } from './pages/public/Contact';

// Auth Page
import { Login } from './pages/auth/Login';

// Dashboard Management Pages
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { ChildrenManagement } from './pages/children/ChildrenManagement';
import { TherapistManagement } from './pages/therapists/TherapistManagement';
import { AppointmentsPage } from './pages/appointments/AppointmentsPage';
import { SessionsPage } from './pages/sessions/SessionsPage';
import { ProgramsAdminPage } from './pages/programs/ProgramsAdminPage';
import { BillingPage } from './pages/billing/BillingPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

// Parent Portal
import { ParentPortal } from './pages/parent/ParentPortal';

export function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Sign In Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Management Platform & Parent Portal */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/children" element={<ChildrenManagement />} />
            <Route path="/therapists" element={<TherapistManagement />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/admin-programs" element={<ProgramsAdminPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/parent" element={<ParentPortal />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
