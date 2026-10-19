import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';
import {
  Heart,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Stethoscope,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const Login: React.FC = () => {
  const { switchRole, showToast } = useDemo();
  const navigate = useNavigate();

  const [email, setEmail] = useState('hanna.vance@melaspecialneeds.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleQuickSelect = (role: UserRole) => {
    setSelectedRole(role);
    const user = DEMO_USERS[role];
    setEmail(user.email);
    setPassword('••••••••••••');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    showToast(`Signed in successfully as ${DEMO_USERS[selectedRole].name}`, 'success');

    if (selectedRole === 'parent') {
      navigate('/parent');
    } else {
      navigate('/dashboard');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    showToast(`Password reset link dispatched to ${forgotEmail || email}`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Back Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white/20" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
              Mela <span className="text-teal-400">Special Needs</span>
            </span>
            <p className="text-[11px] text-teal-300 font-medium tracking-wide">
              Pediatric Care Management OS
            </p>
          </div>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-100">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portal Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your role below and sign in to access your pediatric dashboard.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="mb-6 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Sign In As:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Admin Card */}
              <button
                type="button"
                onClick={() => handleRoleQuickSelect('admin')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'admin'
                    ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                    <Shield className="w-4 h-4" />
                  </span>
                  {selectedRole === 'admin' && (
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Administrator</p>
                  <p className="text-[10px] text-slate-500">Dr. Hanna Vance</p>
                </div>
              </button>

              {/* Therapist Card */}
              <button
                type="button"
                onClick={() => handleRoleQuickSelect('therapist')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'therapist'
                    ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                    <Stethoscope className="w-4 h-4" />
                  </span>
                  {selectedRole === 'therapist' && (
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Therapist / OT</p>
                  <p className="text-[10px] text-slate-500">Michael Chen, MS</p>
                </div>
              </button>

              {/* Parent Card */}
              <button
                type="button"
                onClick={() => handleRoleQuickSelect('parent')}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedRole === 'parent'
                    ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
                    <Users className="w-4 h-4" />
                  </span>
                  {selectedRole === 'parent' && (
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Parent / Guardian</p>
                  <p className="text-[10px] text-slate-500">Sarah Jenkins</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-600">Remember this device</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Sign In as {DEMO_USERS[selectedRole].name.split(',')[0]}</span>
                <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium">
              ← Return to Public Website
            </Link>
            <span className="text-slate-400">Mela Special Needs Center</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Simulation Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false);
          setForgotSent(false);
        }}
        title="Reset Password"
        subtitle="Password recovery for Mela staff and parent accounts."
        maxWidth="md"
      >
        {forgotSent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Reset Link Dispatched</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A secure password reset link has been sent to <strong>{forgotEmail || email}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSent(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your account email address and we'll send you instructions to reset your password.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Email</label>
              <input
                type="email"
                required
                defaultValue={email}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
