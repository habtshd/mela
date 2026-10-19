import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Child, Goal } from '../../types';
import {
  Search,
  Filter,
  UserPlus,
  Edit2,
  Trash2,
  Archive,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  LayoutGrid,
  List,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';

export const ChildrenManagement: React.FC = () => {
  const {
    childrenList,
    therapists,
    programs,
    appointments,
    sessions,
    addChild,
    updateChild,
    archiveChild,
    deleteChild,
    showToast
  } = useDemo();

  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [therapistFilter, setTherapistFilter] = useState('all');

  // Modals state
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState<Child | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // New goal within profile modal
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<Goal['category']>('Motor Skills');

  // Add/Edit Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '2019-05-10',
    gender: 'Male' as Child['gender'],
    primaryDiagnosis: 'Autism Spectrum (Level 1)',
    secondaryDiagnosis: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '742 Evergreen Terrace',
    assignedTherapistId: therapists[0]?.id || 'therapist-1',
    allergiesSensoryNotes: '',
    notes: ''
  });

  // Filtered children list
  const filteredChildren = childrenList.filter((child) => {
    const matchesSearch =
      `${child.firstName} ${child.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      child.primaryDiagnosis.toLowerCase().includes(search.toLowerCase()) ||
      child.guardian.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || child.status === statusFilter;
    const matchesTherapist =
      therapistFilter === 'all' || child.assignedTherapistId === therapistFilter;

    return matchesSearch && matchesStatus && matchesTherapist;
  });

  const handleOpenAddModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '2020-04-12',
      gender: 'Male',
      primaryDiagnosis: 'Autism Spectrum',
      secondaryDiagnosis: 'Sensory Sensitivity',
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianAddress: '124 Maple Street',
      assignedTherapistId: therapists[0]?.id || 'therapist-1',
      allergiesSensoryNotes: 'Sensitive to loud clapping',
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (child: Child) => {
    setChildToEdit(child);
    setFormData({
      firstName: child.firstName,
      lastName: child.lastName,
      dateOfBirth: child.dateOfBirth,
      gender: child.gender,
      primaryDiagnosis: child.primaryDiagnosis,
      secondaryDiagnosis: child.secondaryDiagnosis || '',
      guardianName: child.guardian.name,
      guardianPhone: child.guardian.phone,
      guardianEmail: child.guardian.email,
      guardianAddress: child.guardian.address,
      assignedTherapistId: child.assignedTherapistId,
      allergiesSensoryNotes: child.allergiesSensoryNotes || '',
      notes: child.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedTherapist = therapists.find((t) => t.id === formData.assignedTherapistId);
    addChild({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      age: 5,
      gender: formData.gender,
      primaryDiagnosis: formData.primaryDiagnosis,
      secondaryDiagnosis: formData.secondaryDiagnosis,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      guardian: {
        id: 'guard-' + Date.now(),
        name: formData.guardianName,
        relationship: 'Parent / Guardian',
        phone: formData.guardianPhone,
        email: formData.guardianEmail,
        address: formData.guardianAddress,
        preferredContactMethod: 'phone'
      },
      assignedTherapistId: formData.assignedTherapistId,
      assignedTherapistName: assignedTherapist ? assignedTherapist.name : 'Michael Chen',
      programIds: ['prog-1'],
      emergencyContact: `${formData.guardianName} - ${formData.guardianPhone}`,
      allergiesSensoryNotes: formData.allergiesSensoryNotes,
      notes: formData.notes,
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
      goals: [
        {
          id: 'goal-' + Date.now(),
          title: 'Initial Intake Baseline: Play Regulation',
          category: 'Social',
          targetDate: '2026-12-31',
          baseline: 'Needs visual support',
          currentProgress: 25,
          status: 'in_progress',
          notes: 'Goal initialized at registration'
        }
      ]
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childToEdit) return;

    const assignedTherapist = therapists.find((t) => t.id === formData.assignedTherapistId);

    updateChild(childToEdit.id, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      primaryDiagnosis: formData.primaryDiagnosis,
      secondaryDiagnosis: formData.secondaryDiagnosis,
      assignedTherapistId: formData.assignedTherapistId,
      assignedTherapistName: assignedTherapist ? assignedTherapist.name : childToEdit.assignedTherapistName,
      allergiesSensoryNotes: formData.allergiesSensoryNotes,
      notes: formData.notes,
      guardian: {
        ...childToEdit.guardian,
        name: formData.guardianName,
        phone: formData.guardianPhone,
        email: formData.guardianEmail,
        address: formData.guardianAddress
      }
    });

    if (selectedChild && selectedChild.id === childToEdit.id) {
      setSelectedChild({
        ...selectedChild,
        firstName: formData.firstName,
        lastName: formData.lastName,
        primaryDiagnosis: formData.primaryDiagnosis
      });
    }

    setIsEditModalOpen(false);
    setChildToEdit(null);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChild || !newGoalTitle.trim()) return;

    const newGoal: Goal = {
      id: 'goal-' + Date.now(),
      title: newGoalTitle,
      category: newGoalCategory,
      targetDate: '2026-12-31',
      baseline: 'Initial clinical assessment',
      currentProgress: 10,
      status: 'in_progress',
      notes: 'New goal established'
    };

    const updatedGoals = [...selectedChild.goals, newGoal];
    updateChild(selectedChild.id, { goals: updatedGoals });
    setSelectedChild({ ...selectedChild, goals: updatedGoals });
    setNewGoalTitle('');
    showToast(`Added clinical goal: "${newGoal.title}"`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Children Directory</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Child records, diagnostic milestones, and assigned therapists.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Child</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, diagnosis, guardian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Intake</option>
            <option value="in_review">In Review</option>
            <option value="graduated">Graduated</option>
            <option value="on_hold">On Hold</option>
          </select>

          {/* Therapist Filter */}
          <select
            value={therapistFilter}
            onChange={(e) => setTherapistFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Lead Specialists</option>
            {therapists.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${
                viewMode === 'table' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChildren.map((child) => {
            const statusBadges = {
              active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              in_review: 'bg-amber-50 text-amber-800 border-amber-200',
              graduated: 'bg-teal-50 text-teal-800 border-teal-200',
              on_hold: 'bg-slate-100 text-slate-600 border-slate-200'
            };

            const completedGoals = child.goals.filter((g) => g.status === 'mastered').length;

            return (
              <div
                key={child.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={child.avatar}
                        alt={child.firstName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-500/20"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {child.firstName} {child.lastName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {child.age} yrs • {child.gender}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadges[child.status]}`}>
                      {child.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Primary Diagnosis
                      </span>
                      <p className="font-semibold text-slate-800">{child.primaryDiagnosis}</p>
                    </div>

                    <div className="text-slate-600 space-y-1">
                      <p>
                        <strong className="text-slate-800 font-medium">Guardian:</strong> {child.guardian.name} ({child.guardian.phone})
                      </p>
                      <p>
                        <strong className="text-slate-800 font-medium">Lead Specialist:</strong> {child.assignedTherapistName}
                      </p>
                    </div>
                  </div>

                  {/* Goal Progress Bars */}
                  <div className="pt-2 border-t border-slate-100 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-700">Clinical Goals</span>
                      <span className="text-teal-700 font-semibold">{completedGoals} of {child.goals.length} Mastered</span>
                    </div>
                    <div className="space-y-1.5">
                      {child.goals.slice(0, 2).map((g) => (
                        <div key={g.id}>
                          <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                            <span className="truncate max-w-[200px]">{g.title}</span>
                            <span className="font-semibold">{g.currentProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-teal-600 h-full rounded-full transition-all"
                              style={{ width: `${g.currentProgress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedChild(child)}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(child)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                    title="Edit Child Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => archiveChild(child.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    title="Archive Child"
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setConfirmDeleteId(child.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Child Name</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Guardian Contact</th>
                  <th className="px-6 py-4">Assigned Specialist</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredChildren.map((child) => (
                  <tr key={child.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <img
                        src={child.avatar}
                        alt={child.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p>{child.firstName} {child.lastName}</p>
                        <span className="text-[10px] text-slate-400 font-normal">{child.age} yrs • {child.gender}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {child.primaryDiagnosis}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <p className="font-semibold text-slate-800">{child.guardian.name}</p>
                      <p className="text-[11px] text-slate-400">{child.guardian.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-teal-700 font-semibold">
                      {child.assignedTherapistName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {child.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedChild(child)}
                        className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg font-bold text-xs"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(child)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <Edit2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Child Full Profile Detail Modal */}
      {selectedChild && (
        <Modal
          isOpen={!!selectedChild}
          onClose={() => setSelectedChild(null)}
          title={`${selectedChild.firstName} ${selectedChild.lastName}`}
          subtitle={`Age: ${selectedChild.age} • ${selectedChild.status.toUpperCase()}`}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* Top Snapshot */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedChild.avatar}
                  alt={selectedChild.firstName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/30"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedChild.firstName} {selectedChild.lastName}
                  </h3>
                  <p className="text-xs font-semibold text-teal-800">
                    {selectedChild.primaryDiagnosis}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Attending Specialist: <strong>{selectedChild.assignedTherapistName}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenEditModal(selectedChild)}
                className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Guardian & Emergency Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-teal-600" />
                  Guardian Contact
                </h4>
                <p><strong>Name:</strong> {selectedChild.guardian.name} ({selectedChild.guardian.relationship})</p>
                <p><strong>Phone:</strong> {selectedChild.guardian.phone}</p>
                <p><strong>Email:</strong> {selectedChild.guardian.email}</p>
                <p><strong>Address:</strong> {selectedChild.guardian.address}</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Sensory & Emergency Profile
                </h4>
                <p><strong>Emergency:</strong> {selectedChild.emergencyContact}</p>
                <p><strong>Sensory Triggers / Notes:</strong> {selectedChild.allergiesSensoryNotes || 'No adverse sensory triggers reported.'}</p>
              </div>
            </div>

            {/* IEP & Clinical Goals Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Active Clinical Goals & Progress
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedChild.goals.length} tracked goals
                </span>
              </div>

              <div className="space-y-3">
                {selectedChild.goals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{goal.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {goal.category}
                        </span>
                      </div>
                      <span className="text-xs font-black text-teal-700">{goal.currentProgress}% Mastered</span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full transition-all"
                        style={{ width: `${goal.currentProgress}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-snug">{goal.notes}</p>
                  </div>
                ))}
              </div>

              {/* Add Goal Inline Form */}
              <form onSubmit={handleAddGoal} className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="New developmental goal description..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="Motor Skills">Motor Skills</option>
                  <option value="Speech">Speech & Language</option>
                  <option value="Sensory">Sensory Regulation</option>
                  <option value="Social">Social Pragmatics</option>
                  <option value="Life Skills">Daily Living</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Goal</span>
                </button>
              </form>
            </div>

            {/* Recent Sessions for this child */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Recent SOAP Session Records</h4>
              <div className="space-y-2">
                {sessions
                  .filter((s) => s.childId === selectedChild.id)
                  .map((sess) => (
                    <div key={sess.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex justify-between items-baseline mb-1">
                        <strong className="text-slate-900 font-semibold">{sess.programTitle}</strong>
                        <span className="text-slate-400 text-[11px]">{sess.date} • {sess.therapistName}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-2">{sess.soapObjective}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedChild(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Child Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register Child"
        subtitle="Intake and specialist assignment."
        maxWidth="2xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Diagnosis *</label>
              <input
                type="text"
                required
                placeholder="e.g. Autism Spectrum"
                value={formData.primaryDiagnosis}
                onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Guardian Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Lead Specialist</label>
              <select
                value={formData.assignedTherapistId}
                onChange={(e) => setFormData({ ...formData, assignedTherapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.credentials})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sensory Triggers / Allergies</label>
              <input
                type="text"
                placeholder="e.g. Sensitive to sirens; loves weighted vest"
                value={formData.allergiesSensoryNotes}
                onChange={(e) => setFormData({ ...formData, allergiesSensoryNotes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
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
              Save Registration
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Child Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Child Profile"
        maxWidth="2xl"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Diagnosis</label>
              <input
                type="text"
                required
                value={formData.primaryDiagnosis}
                onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Specialist</label>
              <select
                value={formData.assignedTherapistId}
                onChange={(e) => setFormData({ ...formData, assignedTherapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Phone</label>
              <input
                type="text"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Email</label>
              <input
                type="email"
                value={formData.guardianEmail}
                onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sensory Triggers / Notes</label>
            <input
              type="text"
              value={formData.allergiesSensoryNotes}
              onChange={(e) => setFormData({ ...formData, allergiesSensoryNotes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
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

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) {
            deleteChild(confirmDeleteId);
            setConfirmDeleteId(null);
          }
        }}
        title="Delete Child Record?"
        message="Are you sure you want to permanently remove this child record from the demo? You can also use Archive to keep their history."
        confirmLabel="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};
