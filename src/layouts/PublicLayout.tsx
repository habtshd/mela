import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoRoleBanner } from '../components/common/DemoRoleBanner';
import { PublicHeader } from '../components/public/PublicHeader';
import { PublicFooter } from '../components/public/PublicFooter';
import { ToastContainer } from '../components/common/ToastContainer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <DemoRoleBanner />
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <ToastContainer />
    </div>
  );
};
