import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Therapist, Child } from '../../types';
import {
  Search,
  UserPlus,
  Edit2,
  Clock,
  Phone,
  Mail,
  Shield,
  Users,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const TherapistManagement: React.FC = () => {
  const { therapists, childrenList, addTherapist, updateTherapist, showToast } = useDemo();

  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [therapistToEdit, setTherapistToEdit] = useState<Therapist | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    credentials: '',
    email: '',
    phone: '',
    bio: '',
    specializations: 'Sensory Integration, Fine Motor',
    weeklyHours: 35,
    roomPreference: 'Sensory Gym A',
    avatar: 'https://images.unsplash.com/photo-1594824813587-0b1a03004d16?auto=format&fit=crop&q=80&w=300'
  });

  const specialties = ['All', 'Sensory Integration', 'Fine Motor Development', 'AAC', 'Applied Behavior Analysis', 'Gross Motor Skills'];

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      t.specializations.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    return matchesSearch && matchesSpecialty;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      title: 'Pediatric Clinical Specialist',
      credentials: 'MS, OTR/L',
      email: '',
      phone: '(555) 000-0000',
      bio: 'Compassionate pediatric therapist dedicated to child development.',
      specializations: 'Sensory Integration, Bilateral Motor',
      weeklyHours: 35,
      roomPreference: 'Sensory Gym B',
      avatar: 'https://images.unsplash.com/photo-1594824813587-0b1a03004d16?auto=format&fit=crop&q=80&w=300'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (t: Therapist) => {
    setTherapistToEdit(t);
    setFormData({
      name: t.name,
      title: t.title,
      credentials: t.credentials,
      email: t.email,
      phone: t.phone,
      bio: t.bio,
      specializations: t.specializations.join(', '),
      weeklyHours: t.weeklyHours,
      roomPreference: t.roomPreference || 'Main Clinic',
      avatar: t.avatar
    });
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTherapist({
      name: formData.name,
      title: formData.title,
      credentials: formData.credentials,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      specializations: formData.specializations.split(',').map((s) => s.trim()),
      activeCaseloadCount: 0,
      weeklyHours: Number(formData.weeklyHours),
      availability: ['Mon: 8am-4pm', 'Tue: 8am-4pm', 'Wed: 8am-4pm', 'Thu: 8am-4pm'],
      avatar: formData.avatar,
      joinedYear: new Date().getFullYear(),
      roomPreference: formData.roomPreference
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!therapistToEdit) return;

    updateTherapist(therapistToEdit.id, {
      name: formData.name,
      title: formData.title,
      credentials: formData.credentials,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      specializations: formData.specializations.split(',').map((s) => s.trim()),
      weeklyHours: Number(formData.weeklyHours),
      roomPreference: formData.roomPreference
    });
    setIsEditModalOpen(false);
    setTherapistToEdit(null);
  };

  // Get assigned caseload for a therapist
  const getAssignedChildren = (therapistId: string): Child[] => {
    return childrenList.filter((c) => c.assignedTherapistId === therapistId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Staff & Specialists</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Therapist credentials, caseload distributions, room preferences, and weekly hours.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Specialist</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by specialist name or focus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSpecialty(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSpecialty === s
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Therapists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map((t) => {
          const assignedChildren = getAssignedChildren(t.id);
          return (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/20"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                      <p className="text-xs font-bold text-teal-600">{t.credentials}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t.title}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                    title="Edit profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {t.bio}
                </p>

                {/* Caseload and Hours Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Active Caseload
                    </span>
                    <p className="text-sm font-black text-slate-900">
                      {assignedChildren.length || t.activeCaseloadCount} Children
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Weekly Capacity
                    </span>
                    <p className="text-sm font-black text-teal-700">{t.weeklyHours} hrs / wk</p>
                  </div>
                </div>

                {/* Specialization Tags */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Clinical Focus
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md border border-teal-100"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {t.roomPreference || 'Sensory Suite'}
                </span>
                <button
                  onClick={() => setSelectedTherapist(t)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>View Caseload</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Caseload Drawer / Modal */}
      {selectedTherapist && (
        <Modal
          isOpen={!!selectedTherapist}
          onClose={() => setSelectedTherapist(null)}
          title={`${selectedTherapist.name}'s Assigned Caseload`}
          subtitle={`${selectedTherapist.title} (${selectedTherapist.credentials}) • Room: ${selectedTherapist.roomPreference}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/60 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-950">
                Current Caseload Count: {getAssignedChildren(selectedTherapist.id).length} Active Children
              </span>
              <span className="text-teal-700 font-semibold">
                Direct Contact: {selectedTherapist.phone}
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {getAssignedChildren(selectedTherapist.id).length > 0 ? (
                getAssignedChildren(selectedTherapist.id).map((c) => (
                  <div key={c.id} className="p-4 hover:bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.firstName}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{c.firstName} {c.lastName}</p>
                        <p className="text-slate-500 text-[11px]">{c.primaryDiagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 font-medium">Guardian: {c.guardian.name}</p>
                      <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
                        {c.goals.length} Goals Active
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No children currently assigned to this therapist in demo state.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTherapist(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Therapist Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Clinical Specialist"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Adams"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Credentials *</label>
              <input
                type="text"
                required
                placeholder="e.g. MS, OTR/L, BCP"
                value={formData.credentials}
                onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Pediatric Occupational Therapist"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Room Preference</label>
              <input
                type="text"
                value={formData.roomPreference}
                onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="rachel@mela-care.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specializations (comma separated)</label>
            <input
              type="text"
              value={formData.specializations}
              onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow"
            >
              Save Therapist
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Therapist Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Therapist Profile"
        maxWidth="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Credentials</label>
              <input
                type="text"
                required
                value={formData.credentials}
                onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Hours</label>
              <input
                type="number"
                value={formData.weeklyHours}
                onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
