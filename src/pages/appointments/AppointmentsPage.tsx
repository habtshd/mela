import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  Edit2,
  CalendarDays,
  Filter,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const AppointmentsPage: React.FC = () => {
  const {
    appointments,
    childrenList,
    therapists,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    showToast
  } = useDemo();

  // View Mode: 'week' | 'day' | 'month' | 'list'
  const [viewMode, setViewMode] = useState<'week' | 'day' | 'month' | 'list'>('week');
  const [selectedTherapistFilter, setSelectedTherapistFilter] = useState('all');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('all');

  // Active Date (centered on demo date 2026-10-19)
  const [currentDateString, setCurrentDateString] = useState('2026-10-19');

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('Parent requested schedule change');

  // Form State
  const [formData, setFormData] = useState({
    childId: childrenList[0]?.id || 'child-1',
    therapistId: therapists[0]?.id || 'therapist-1',
    programTitle: 'Pediatric Occupational Therapy',
    date: '2026-10-19',
    startTime: '10:00',
    endTime: '10:45',
    room: 'Sensory Gym A',
    notes: 'Regular scheduled session'
  });

  const rooms = ['All', 'Sensory Gym A', 'Speech Pod 1', 'Behavioral Suite 2', 'Motor Gym B', 'Sensory Music Studio'];

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesTherapist =
      selectedTherapistFilter === 'all' || apt.therapistId === selectedTherapistFilter;
    const matchesRoom =
      selectedRoomFilter === 'All' || apt.room === selectedRoomFilter;
    return matchesTherapist && matchesRoom;
  });

  // Days of the active week (Mon Oct 19 to Sat Oct 24, 2026)
  const weekDays = [
    { label: 'Monday', date: '2026-10-19', dayNum: '19' },
    { label: 'Tuesday', date: '2026-10-20', dayNum: '20' },
    { label: 'Wednesday', date: '2026-10-21', dayNum: '21' },
    { label: 'Thursday', date: '2026-10-22', dayNum: '22' },
    { label: 'Friday', date: '2026-10-23', dayNum: '23' },
    { label: 'Saturday', date: '2026-10-24', dayNum: '24' }
  ];

  const handleOpenSchedule = (date = currentDateString, time = '10:00') => {
    setFormData({
      childId: childrenList[0]?.id || 'child-1',
      therapistId: therapists[0]?.id || 'therapist-1',
      programTitle: 'Pediatric Occupational Therapy',
      date,
      startTime: time,
      endTime: '10:45',
      room: 'Sensory Gym A',
      notes: ''
    });
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const child = childrenList.find((c) => c.id === formData.childId);
    const therapist = therapists.find((t) => t.id === formData.therapistId);

    addAppointment({
      childId: formData.childId,
      childName: child ? `${child.firstName} ${child.lastName}` : 'Liam Jenkins',
      therapistId: formData.therapistId,
      therapistName: therapist ? therapist.name : 'Michael Chen',
      programId: 'prog-1',
      programTitle: formData.programTitle,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      room: formData.room,
      status: 'scheduled',
      notes: formData.notes
    });
    setIsScheduleModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    updateAppointment(selectedAppointment.id, {
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      room: formData.room,
      programTitle: formData.programTitle,
      notes: formData.notes
    });

    setSelectedAppointment(null);
    setIsEditModalOpen(false);
  };

  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;
    cancelAppointment(selectedAppointment.id, cancellationReason);
    setCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const badges = {
      completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      confirmed: 'bg-teal-50 text-teal-800 border-teal-200',
      scheduled: 'bg-green-50 text-green-800 border-green-200',
      cancelled: 'bg-slate-100 text-slate-500 border-slate-200 line-through',
      no_show: 'bg-amber-50 text-amber-800 border-amber-200'
    };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badges[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Appointments & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Therapy sessions, room bookings, and calendar.
          </p>
        </div>

        <button
          onClick={() => handleOpenSchedule()}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* View Switcher & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation & Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50">
            <button
              onClick={() => setCurrentDateString('2026-10-19')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-white transition-colors"
            >
              Today (Oct 19)
            </button>
          </div>

          <span className="text-sm font-bold text-slate-900 hidden sm:inline">
            Week of October 19 – 24, 2026
          </span>

          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'week' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'day' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'month' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'list' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={selectedTherapistFilter}
            onChange={(e) => setSelectedTherapistFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Specialists</option>
            {therapists.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            value={selectedRoomFilter}
            onChange={(e) => setSelectedRoomFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500"
          >
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? 'All Therapy Rooms' : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Week Calendar Grid View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {weekDays.map((col) => {
              const dayAppointments = filteredAppointments.filter((a) => a.date === col.date);
              const isToday = col.date === currentDateString;

              return (
                <div key={col.date} className="min-h-[500px] flex flex-col">
                  {/* Column Header */}
                  <div className={`p-4 border-b border-slate-100 text-center ${isToday ? 'bg-teal-50/60' : 'bg-slate-50/40'}`}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{col.label}</p>
                    <p className={`text-xl font-black mt-0.5 ${isToday ? 'text-teal-700' : 'text-slate-900'}`}>
                      {col.dayNum}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {dayAppointments.length} sessions
                    </span>
                  </div>

                  {/* Appointments in this Day */}
                  <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                    {dayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => setSelectedAppointment(apt)}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
                          apt.status === 'completed'
                            ? 'bg-emerald-50/60 border-emerald-200/80'
                            : apt.status === 'cancelled'
                            ? 'bg-slate-50 border-slate-200 opacity-60'
                            : 'bg-white border-slate-200 hover:border-teal-400 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3 text-teal-600" />
                            {apt.startTime}
                          </span>
                          {getStatusBadge(apt.status)}
                        </div>
                        <p className="font-bold text-slate-900 truncate">{apt.childName}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{apt.programTitle}</p>
                        <div className="mt-1 pt-1 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-teal-700 font-medium">
                          <span className="truncate">{apt.therapistName.split(' ')[0]}</span>
                          <span className="text-slate-400 truncate max-w-[80px]">{apt.room.replace('Sensory Gym ', 'Gym ')}</span>
                        </div>
                      </div>
                    ))}

                    {/* Quick Add Slot Button */}
                    <button
                      onClick={() => handleOpenSchedule(col.date)}
                      className="w-full py-2 border border-dashed border-slate-200 hover:border-teal-400 rounded-xl text-[11px] font-bold text-slate-400 hover:text-teal-700 flex items-center justify-center gap-1 transition-colors mt-2"
                    >
                      <Plus className="w-3 h-3" /> Add Slot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Monday, October 19, 2026</h2>
              <p className="text-xs text-slate-500">Scheduled clinical room rotations</p>
            </div>
            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
              {filteredAppointments.filter((a) => a.date === '2026-10-19').length} Appointments Today
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredAppointments
              .filter((a) => a.date === '2026-10-19')
              .map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className="py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 text-center py-2 bg-slate-100 rounded-xl">
                      <p className="text-sm font-black text-slate-900">{apt.startTime}</p>
                      <p className="text-[10px] text-slate-500 font-medium">to {apt.endTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{apt.childName}</h4>
                        {getStatusBadge(apt.status)}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{apt.programTitle}</p>
                      <p className="text-xs text-teal-700 font-medium mt-1">
                        Attending: {apt.therapistName} • Room: {apt.room}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateAppointment(apt.id, { status: 'completed' });
                        showToast(`Session with ${apt.childName} marked completed`, 'success');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold"
                    >
                      Check In / Complete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Month View Simulation */}
      {viewMode === 'month' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">October 2026 Month Calendar</h2>
            <span className="text-xs text-slate-500">Full clinical density</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
              const count = appointments.filter((a) => a.date === dateStr).length;
              const isToday = day === 19;

              return (
                <div
                  key={day}
                  onClick={() => {
                    setCurrentDateString(dateStr);
                    setViewMode('day');
                  }}
                  className={`min-h-[70px] p-2 rounded-xl border text-left cursor-pointer transition-all hover:border-teal-500 ${
                    isToday ? 'bg-teal-50 border-teal-500' : 'bg-slate-50/50 border-slate-100'
                  }`}
                >
                  <span className={`font-black ${isToday ? 'text-teal-700' : 'text-slate-800'}`}>{day}</span>
                  {count > 0 && (
                    <div className="mt-1">
                      <span className="block px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                        {count} sessions
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Child Name</th>
                <th className="px-6 py-4">Therapy Service</th>
                <th className="px-6 py-4">Therapist</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((apt) => (
                <tr
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {apt.date} • {apt.startTime}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{apt.childName}</td>
                  <td className="px-6 py-4 text-slate-600">{apt.programTitle}</td>
                  <td className="px-6 py-4 text-teal-700 font-medium">{apt.therapistName}</td>
                  <td className="px-6 py-4 text-slate-500">{apt.room}</td>
                  <td className="px-6 py-4">{getStatusBadge(apt.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAppointment(apt);
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title="Appointment Details"
          subtitle={`Session ID: ${selectedAppointment.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedAppointment.childName}</h3>
                <p className="text-xs font-semibold text-teal-800">{selectedAppointment.programTitle}</p>
              </div>
              {getStatusBadge(selectedAppointment.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Date & Time</p>
                <p className="font-bold text-slate-800">{selectedAppointment.date} from {selectedAppointment.startTime} - {selectedAppointment.endTime}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Therapy Facility Room</p>
                <p className="font-bold text-slate-800">{selectedAppointment.room}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Attending Specialist</p>
                <p className="font-bold text-teal-700">{selectedAppointment.therapistName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Notes</p>
                <p className="text-slate-600">{selectedAppointment.notes || 'None recorded'}</p>
              </div>
            </div>

            {selectedAppointment.cancellationReason && (
              <div className="p-3 border rounded-xl text-xs" style={{background:'#fffbeb',borderColor:'#fde68a',color:'#78350f'}}>
                <strong>Cancellation Reason:</strong> {selectedAppointment.cancellationReason}
              </div>
            )}

            <div className="pt-4 flex flex-wrap justify-between gap-2 border-t border-slate-100">
              <div className="flex gap-2">
                {selectedAppointment.status !== 'cancelled' && (
                  <button
                    onClick={() => {
                      setCancelModalOpen(true);
                    }}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl" style={{color:'#b45309'}}>
                    Cancel Session
                  </button>
                )}
                {selectedAppointment.status !== 'completed' && (
                  <button
                    onClick={() => {
                      updateAppointment(selectedAppointment.id, { status: 'completed' });
                      setSelectedAppointment(null);
                      showToast('Marked as Completed & Checked-in', 'success');
                    }}
                    className="px-3.5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow"
                  >
                    Mark Completed
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFormData({
                      childId: selectedAppointment.childId,
                      therapistId: selectedAppointment.therapistId,
                      programTitle: selectedAppointment.programTitle,
                      date: selectedAppointment.date,
                      startTime: selectedAppointment.startTime,
                      endTime: selectedAppointment.endTime,
                      room: selectedAppointment.room,
                      notes: selectedAppointment.notes || ''
                    });
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
                >
                  Edit / Reschedule
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule / Add Appointment Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Book Appointment"
        maxWidth="lg"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Child *</label>
              <select
                value={formData.childId}
                onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.primaryDiagnosis})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Therapist Specialist *</label>
              <select
                value={formData.therapistId}
                onChange={(e) => setFormData({ ...formData, therapistId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
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
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Therapy Program</label>
              <select
                value={formData.programTitle}
                onChange={(e) => setFormData({ ...formData, programTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Pediatric Occupational Therapy">Pediatric Occupational Therapy</option>
                <option value="Speech & Language Pathology">Speech & Language Pathology</option>
                <option value="Applied Behavior Analysis (ABA)">Applied Behavior Analysis (ABA)</option>
                <option value="Sensory Integration Gym & Therapy">Sensory Integration Gym & Therapy</option>
                <option value="Pediatric Physical Therapy">Pediatric Physical Therapy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Room</label>
              <select
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Sensory Gym A">Sensory Gym A</option>
                <option value="Speech Pod 1">Speech Pod 1</option>
                <option value="Behavioral Suite 2">Behavioral Suite 2</option>
                <option value="Motor Gym B">Motor Gym B</option>
                <option value="Sensory Music Studio">Sensory Music Studio</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
            <input
              type="text"
              placeholder="e.g. Focus on fine motor cutting practice"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit / Reschedule Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Reschedule / Edit Appointment"
          maxWidth="lg"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Room</label>
                <select
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="Sensory Gym A">Sensory Gym A</option>
                  <option value="Speech Pod 1">Speech Pod 1</option>
                  <option value="Behavioral Suite 2">Behavioral Suite 2</option>
                  <option value="Motor Gym B">Motor Gym B</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                Save Reschedule
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel Reason Modal */}
      {cancelModalOpen && (
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title="Cancel Appointment"
          maxWidth="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Please provide a cancellation reason for the clinical record:
            </p>
            <input
              type="text"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
