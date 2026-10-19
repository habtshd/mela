import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Program } from '../../types';
import {
  Layers,
  Plus,
  Edit2,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Activity,
  MessageSquare,
  Smile,
  Shield
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ProgramsAdminPage: React.FC = () => {
  const { programs, therapists, addProgram, updateProgram, showToast } = useDemo();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [programToEdit, setProgramToEdit] = useState<Program | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Occupational Therapy',
    description: '',
    detailedOverview: '',
    durationMinutes: 45,
    ageRange: 'Ages 3 – 12',
    leadTherapistId: therapists[0]?.id || 'therapist-1',
    maxCapacity: 20,
    enrolledCount: 15,
    iconName: 'Activity',
    scheduleDescription: 'Monday through Thursday afternoons',
    objectives: 'Fine motor coordination, Sensory self-regulation'
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Occupational Therapy',
      description: 'Comprehensive pediatric therapy program.',
      detailedOverview: 'Play-based clinical interventions targeting daily independence.',
      durationMinutes: 45,
      ageRange: 'Ages 3 – 10',
      leadTherapistId: therapists[0]?.id || 'therapist-1',
      maxCapacity: 20,
      enrolledCount: 12,
      iconName: 'Activity',
      scheduleDescription: 'Mon & Wed mornings',
      objectives: 'Bilateral motor integration, Core posture'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Program) => {
    setProgramToEdit(p);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      detailedOverview: p.detailedOverview,
      durationMinutes: p.durationMinutes,
      ageRange: p.ageRange,
      leadTherapistId: p.leadTherapistId,
      maxCapacity: p.maxCapacity,
      enrolledCount: p.enrolledCount,
      iconName: p.iconName,
      scheduleDescription: p.scheduleDescription,
      objectives: p.objectives.join(', ')
    });
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = therapists.find((t) => t.id === formData.leadTherapistId);
    addProgram({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      detailedOverview: formData.detailedOverview,
      durationMinutes: Number(formData.durationMinutes),
      ageRange: formData.ageRange,
      leadTherapistId: formData.leadTherapistId,
      leadTherapistName: lead ? lead.name : 'Michael Chen',
      maxCapacity: Number(formData.maxCapacity),
      enrolledCount: Number(formData.enrolledCount),
      iconName: formData.iconName,
      scheduleDescription: formData.scheduleDescription,
      objectives: formData.objectives.split(',').map((o) => o.trim()),
      benefits: ['Enhanced classroom focus', 'Greater confidence at home']
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programToEdit) return;

    const lead = therapists.find((t) => t.id === formData.leadTherapistId);

    updateProgram(programToEdit.id, {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      detailedOverview: formData.detailedOverview,
      durationMinutes: Number(formData.durationMinutes),
      ageRange: formData.ageRange,
      leadTherapistId: formData.leadTherapistId,
      leadTherapistName: lead ? lead.name : programToEdit.leadTherapistName,
      maxCapacity: Number(formData.maxCapacity),
      enrolledCount: Number(formData.enrolledCount),
      scheduleDescription: formData.scheduleDescription,
      objectives: formData.objectives.split(',').map((o) => o.trim())
    });

    setIsEditModalOpen(false);
    setProgramToEdit(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Therapy Programs & Capacity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage clinical curriculum, student enrollments, capacity limits, and assigned program leads.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Therapy Program</span>
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog) => {
          const occupancy = Math.round((prog.enrolledCount / prog.maxCapacity) * 100);

          return (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                    {prog.category}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(prog)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                    title="Edit program"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">{prog.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{prog.ageRange} • {prog.durationMinutes} min</p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {prog.description}
                </p>

                {/* Capacity Progress Bar */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4 space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-600">Cohort Enrollment</span>
                    <span className="text-teal-700 font-bold">
                      {prog.enrolledCount} / {prog.maxCapacity} ({occupancy}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        occupancy >= 90 ? 'bg-amber-500' : 'bg-teal-600'
                      }`}
                      style={{ width: `${Math.min(100, occupancy)}%` }}
                    />
                  </div>
                </div>

                {/* Objectives Preview */}
                <div className="space-y-1 mb-4 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Core Objectives
                  </span>
                  <ul className="space-y-1">
                    {prog.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="text-slate-600 flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="truncate">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate font-medium">Lead: {prog.leadTherapistName.split(',')[0]}</span>
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="font-bold text-teal-700 hover:text-teal-800"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <Modal
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
          title={selectedProgram.title}
          subtitle={`Lead Clinician: ${selectedProgram.leadTherapistName} • Cohort: ${selectedProgram.enrolledCount} enrolled`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedProgram.detailedOverview}
            </p>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Age Target</span>
                <p className="font-bold text-slate-900">{selectedProgram.ageRange}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Session Duration</span>
                <p className="font-bold text-slate-900">{selectedProgram.durationMinutes} Minutes</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Capacity</span>
                <p className="font-bold text-slate-900">{selectedProgram.enrolledCount} / {selectedProgram.maxCapacity}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Frequency</span>
                <p className="font-bold text-slate-900">{selectedProgram.scheduleDescription}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-2">Curriculum Objectives</h4>
              <ul className="space-y-1.5">
                {selectedProgram.objectives.map((obj, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Program Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Therapy Program"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Program Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Occupational Therapy">Occupational Therapy</option>
                <option value="Speech Therapy">Speech Therapy</option>
                <option value="Behavioral Health">Behavioral Health</option>
                <option value="Sensory Therapy">Sensory Therapy</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Social Skills">Social Skills</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Therapist</label>
              <select
                value={formData.leadTherapistId}
                onChange={(e) => setFormData({ ...formData, leadTherapistId: e.target.value })}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Min)</label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity</label>
              <input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Age Range</label>
              <input
                type="text"
                value={formData.ageRange}
                onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Objectives (comma separated)</label>
            <input
              type="text"
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
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
              Save Program
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Program Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Program Details"
          maxWidth="lg"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Program Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity</label>
                <input
                  type="number"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Enrolled</label>
                <input
                  type="number"
                  value={formData.enrolledCount}
                  onChange={(e) => setFormData({ ...formData, enrolledCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
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
      )}
    </div>
  );
};
