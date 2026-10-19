import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardTopNav } from '../components/dashboard/DashboardTopNav';
import { ToastContainer } from '../components/common/ToastContainer';

export const DashboardLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <div className="flex-1 flex overflow-hidden">
        <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <DashboardTopNav setMobileOpen={setMobileOpen} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
