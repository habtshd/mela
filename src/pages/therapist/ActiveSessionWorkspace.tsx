import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Activity,
  CheckCircle2,
  X,
  Play,
  Square,
  Sparkles,
  Send,
  FileText,
  AlertTriangle,
  Award,
  ChevronDown,
  Layers,
  Save,
  Check,
  Plus,
  Flame,
  Volume2
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

// Target definition types matching Brightside
export interface ObservationTarget {
  id: string;
  label: string;
  category: string;
  measurementType: 'FREQUENCY' | 'DURATION' | 'TRIAL' | 'PROMPT_LEVEL';
  color?: string;
  baseline?: string;
}

export interface LiveEvent {
  id: string;
  targetId: string;
  label: string;
  type: 'positive' | 'neutral' | 'negative';
  measurementType: 'FREQUENCY' | 'DURATION' | 'TRIAL' | 'PROMPT_LEVEL' | 'ACTIVITY';
  value: number;
  promptLevel?: string;
  notes?: string;
  attempt?: number;
  success?: boolean;
  accuracy?: number;
  timestamp: Date;
}

const DEFAULT_TARGETS: ObservationTarget[] = [
  {
    id: 't-1',
    label: 'Spontaneous AAC / Sign Request',
    category: 'Communication',
    measurementType: 'FREQUENCY',
    baseline: 'Goal: >10 / session'
  },
  {
    id: 't-2',
    label: 'Task & Activity Completion',
    category: 'Occupational OT',
    measurementType: 'FREQUENCY',
    baseline: 'Goal: 5 tasks'
  },
  {
    id: 't-3',
    label: 'Sensory Flapping / Seeking',
    category: 'Behavioral ABA',
    measurementType: 'FREQUENCY',
    baseline: 'Track episodes'
  },
  {
    id: 't-4',
    label: 'Sustained Attention & Focus',
    category: 'Cognitive Focus',
    measurementType: 'DURATION',
    baseline: 'Goal: >15 mins'
  },
  {
    id: 't-5',
    label: 'Tantrum / Sensory Meltdown',
    category: 'Regulation',
    measurementType: 'DURATION',
    baseline: 'Monitor episodes'
  },
  {
    id: 't-6',
    label: 'Receptive AAC: Point to Target',
    category: 'Speech & AAC',
    measurementType: 'TRIAL',
    baseline: '80% mastery criterion'
  },
  {
    id: 't-7',
    label: 'Fine Motor: Pincer Grasp Pegboard',
    category: 'Fine Motor OT',
    measurementType: 'TRIAL',
    baseline: '85% mastery criterion'
  },
  {
    id: 't-8',
    label: 'Prompt Hierarchy Level Required',
    category: 'ABA Prompting',
    measurementType: 'PROMPT_LEVEL',
    baseline: 'Aiming for Independent'
  }
];

export const ActiveSessionWorkspace: React.FC<{ studentIdProp?: string; onBackToDashboard?: () => void }> = ({
  studentIdProp,
  onBackToDashboard
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { childrenList, therapists, addSession, showToast } = useDemo();

  const activeChildId = studentIdProp || id || 'child-1';
  const [selectedChildId, setSelectedChildId] = useState(activeChildId);
  const currentStudent = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];
  const therapist = therapists[0];

  // Live session elapsed clock
  const [sessionSeconds, setSessionSeconds] = useState(1514); // Mid-session timer
  const [sessionActive, setSessionActive] = useState(true);

  useEffect(() => {
    let timer: any;
    if (sessionActive) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionActive]);

  const formatSessionTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Recent recorded events stream
  const [recentEvents, setRecentEvents] = useState<LiveEvent[]>([
    {
      id: 'init-1',
      targetId: 't-1',
      label: 'Spontaneous AAC / Sign Request',
      type: 'positive',
      measurementType: 'FREQUENCY',
      value: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 12)
    },
    {
      id: 'init-2',
      targetId: 't-6',
      label: 'Receptive AAC: Point to Target',
      type: 'positive',
      measurementType: 'TRIAL',
      value: 1,
      attempt: 1,
      success: true,
      accuracy: 100,
      timestamp: new Date(Date.now() - 1000 * 60 * 8)
    },
    {
      id: 'init-3',
      targetId: 't-8',
      label: 'Prompt Hierarchy Level Required',
      type: 'neutral',
      measurementType: 'PROMPT_LEVEL',
      value: 1,
      promptLevel: 'VERBAL',
      notes: 'Verbal prompt given to transition',
      timestamp: new Date(Date.now() - 1000 * 60 * 4)
    }
  ]);

  // Target record handler
  const handleRecord = (target: ObservationTarget, data: Partial<LiveEvent>) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      navigator.vibrate(35);
    }

    const newEvent: LiveEvent = {
      id: Date.now().toString(),
      targetId: target.id,
      label: target.label,
      type: (data.type as any) || (target.measurementType === 'TRIAL' && data.success === false ? 'negative' : 'positive'),
      measurementType: target.measurementType,
      value: data.value !== undefined ? data.value : 1,
      promptLevel: data.promptLevel,
      notes: data.notes,
      attempt: data.attempt,
      success: data.success,
      accuracy: data.accuracy,
      timestamp: new Date()
    };

    setRecentEvents((prev) => [newEvent, ...prev].slice(0, 40));
  };

  // Undo handler
  const handleUndo = (eventId: string) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      navigator.vibrate([20, 40, 20]);
    }
    setRecentEvents((prev) => prev.filter((e) => e.id !== eventId));
    showToast('Event undone', 'info');
  };

  // Activity Log Modal State
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [activityForm, setActivityForm] = useState({
    name: 'Sensory Obstacle Course & Swing',
    duration: '300',
    comments: 'Good motor planning and calm vestibular regulation.'
  });

  const handleSaveActivity = () => {
    const newEvent: LiveEvent = {
      id: Date.now().toString(),
      targetId: 'activity',
      label: `Activity: ${activityForm.name}`,
      type: 'positive',
      measurementType: 'ACTIVITY',
      value: parseInt(activityForm.duration) || 300,
      notes: activityForm.comments,
      timestamp: new Date()
    };
    setRecentEvents((prev) => [newEvent, ...prev].slice(0, 40));
    setActivityModalOpen(false);
    showToast(`Logged activity: ${activityForm.name}`, 'success');
  };

  // Rapid SOAP Builder Modal on End Session
  const [endSessionModalOpen, setEndSessionModalOpen] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([
    'Communication & AAC',
    'Engagement & Focus',
    'Sensory Integration'
  ]);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    'Independently used EthSL gestures',
    'Maintained 15+ mins sustained attention'
  ]);
  const [soapPlan, setSoapPlan] = useState('Continue graded AAC trial matrix. Introduce 3-word sentence strip.');
  const [homeExercise, setHomeExercise] = useState('Practice 5 min table-top sensory task before bedtime.');

  // Live aggregated stats
  const frequencyStats = recentEvents.reduce((acc, curr) => {
    if (curr.measurementType === 'FREQUENCY') {
      acc[curr.label] = (acc[curr.label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const trialEvents = recentEvents.filter((e) => e.measurementType === 'TRIAL');
  const trialCorrect = trialEvents.filter((e) => e.success).length;
  const trialAccuracy = trialEvents.length > 0 ? Math.round((trialCorrect / trialEvents.length) * 100) : 85;

  const handleEndSession = () => {
    setEndSessionModalOpen(true);
  };

  const handlePublishNote = () => {
    const studentFullName = `${currentStudent.firstName} ${currentStudent.lastName}`;
    addSession({
      childId: currentStudent.id,
      childName: studentFullName,
      therapistId: therapist.id,
      therapistName: therapist.name,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Math.round(sessionSeconds / 60),
      programTitle: 'Comprehensive Clinical & AAC',
      soapSubjective: `Patient arrived alert and engaged with positive rapport. Highlights: ${selectedHighlights.join('; ')}`,
      soapObjective: `Completed trials with ${trialAccuracy}% accuracy across ${trialEvents.length} trials. Frequencies: ${Object.entries(
        frequencyStats
      )
        .map(([k, v]) => `${k} (${v}x)`)
        .join(', ')}.`,
      soapAssessment: `Notable advancement in spontaneous requesting and emotional regulation.`,
      soapPlan: soapPlan,
      milestonesWorkedOn: selectedDomains,
      progressScore: trialAccuracy,
      parentVisible: true,
      homeExercises: homeExercise
    });

    setEndSessionModalOpen(false);
    showToast(`Session successfully logged for ${studentFullName}! Synced with Parent Portal.`, 'success');

    if (onBackToDashboard) {
      onBackToDashboard();
    } else {
      navigate('/therapist-portal');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans selection:bg-[#3B833A] selection:text-white">
      {/* 1. TOP HEADER & WORKSPACE CONTROLLER (Clean Light Theme Matching Other Pages) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => {
              if (onBackToDashboard) onBackToDashboard();
              else navigate('/therapist-portal');
            }}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex-shrink-0"
            title="Return to Therapist Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live Clinical Workspace
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-900 font-black text-base sm:text-lg px-3 py-1.5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3B833A]"
              >
                {childrenList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.age} yrs) - {c.primaryDiagnosis}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Live Session Stopwatch Widget */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shadow-sm self-start lg:self-auto">
          <Clock className="w-4 h-4 text-[#3B833A] animate-spin" style={{ animationDuration: '8s' }} />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Session Clock</span>
            <span className="text-lg font-black font-mono tracking-tight text-slate-900">
              {formatSessionTime(sessionSeconds)}
            </span>
          </div>
          <button
            onClick={() => setSessionActive(!sessionActive)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              sessionActive
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            {sessionActive ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* Right Action Triggers */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActivityModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all shadow-sm"
          >
            <Activity className="w-4 h-4 text-[#3B833A]" />
            <span>Log Activity</span>
          </button>

          <button
            onClick={handleEndSession}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-red-950/20 active:scale-95"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* 2. PATIENT INFO SUMMARY CARD (Clean White Theme) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg font-black text-[#3B833A] shadow-sm">
            {currentStudent.firstName.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              {currentStudent.firstName} {currentStudent.lastName}
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Active Patient
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Diagnosis: <strong className="text-slate-800">{currentStudent.primaryDiagnosis}</strong> • Focus:{' '}
              <strong className="text-[#3B833A]">Functional AAC & Motor Independence</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Events: {recentEvents.length}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Trial Accuracy: {trialAccuracy}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Therapist: {therapist.name}</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN OBSERVATION CARDS GRID (Touch-Optimized Clean Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* CARD 1: Spontaneous AAC / Sign (Frequency) */}
        <LiveFrequencyCard
          target={DEFAULT_TARGETS[0]}
          onRecord={(t) => handleRecord(t, { value: 1 })}
        />

        {/* CARD 2: Task Completion (Frequency) */}
        <LiveFrequencyCard
          target={DEFAULT_TARGETS[1]}
          onRecord={(t) => handleRecord(t, { value: 1 })}
        />

        {/* CARD 3: Sensory Flapping / Seeking (Frequency Negative/Neutral) */}
        <LiveFrequencyCard
          target={DEFAULT_TARGETS[2]}
          variant="warning"
          onRecord={(t) => handleRecord(t, { value: 1, type: 'negative' })}
        />

        {/* CARD 4: Sustained Attention & Focus (Duration Stopwatch) */}
        <LiveDurationCard
          target={DEFAULT_TARGETS[3]}
          onRecord={(t, dur, notes) =>
            handleRecord(t, { value: dur, notes, type: 'positive' })
          }
        />

        {/* CARD 5: Meltdown Duration (Duration Stopwatch) */}
        <LiveDurationCard
          target={DEFAULT_TARGETS[4]}
          variant="danger"
          onRecord={(t, dur, notes) =>
            handleRecord(t, { value: dur, notes, type: 'negative' })
          }
        />

        {/* CARD 6: Trial Accuracy - Point to Target */}
        <LiveTrialCard
          target={DEFAULT_TARGETS[5]}
          onRecord={(t, isCorrect, attempt, accuracy) =>
            handleRecord(t, {
              value: isCorrect ? 1 : 0,
              success: isCorrect,
              attempt,
              accuracy,
              notes: isCorrect ? 'Correct Trial' : 'Incorrect Trial'
            })
          }
        />

        {/* CARD 7: Trial Accuracy - Pincer Pegboard */}
        <LiveTrialCard
          target={DEFAULT_TARGETS[6]}
          onRecord={(t, isCorrect, attempt, accuracy) =>
            handleRecord(t, {
              value: isCorrect ? 1 : 0,
              success: isCorrect,
              attempt,
              accuracy,
              notes: isCorrect ? 'Correct Trial' : 'Incorrect Trial'
            })
          }
        />

        {/* CARD 8: 6-Tier Prompt Level Hierarchy */}
        <div className="md:col-span-2 lg:col-span-2">
          <LivePromptLevelCard
            target={DEFAULT_TARGETS[7]}
            onRecord={(t, level, label) =>
              handleRecord(t, {
                value: 1,
                promptLevel: level,
                notes: `Prompt Level: ${label}`,
                type: level === 'INDEPENDENT' ? 'positive' : 'neutral'
              })
            }
          />
        </div>
      </div>

      {/* 4. RECENT TELEMETRY EVENTS LOG (Clean Light Card) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#3B833A]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Live Telemetry Stream ({recentEvents.length} events logged)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold">
            Tap undo icon to remove accidental touches
          </span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {recentEvents.length === 0 ? (
            <p className="text-center py-6 text-sm text-slate-400">
              No events recorded yet. Tap any clinical card above to log real-time trials and behaviors.
            </p>
          ) : (
            recentEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/70 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      evt.type === 'positive'
                        ? 'bg-emerald-500'
                        : evt.type === 'negative'
                        ? 'bg-rose-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-slate-900 mr-2">{evt.label}</span>
                    {evt.promptLevel && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[10px] mr-2 border border-blue-200">
                        {evt.promptLevel}
                      </span>
                    )}
                    {evt.accuracy !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] mr-2 border border-emerald-200">
                        Accuracy: {evt.accuracy}%
                      </span>
                    )}
                    {evt.notes && <span className="text-slate-500">{evt.notes}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-400">
                    {evt.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <button
                    onClick={() => handleUndo(evt.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Undo event"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 5. ACTIVITY LOG MODAL */}
      <Modal
        isOpen={activityModalOpen}
        onClose={() => setActivityModalOpen(false)}
        title="Log Clinical Activity Station"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Activity Station Name
            </label>
            <input
              type="text"
              value={activityForm.name}
              onChange={(e) => setActivityForm({ ...activityForm, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B833A]"
              placeholder="e.g. Bilateral Balance Board, AAC Sentence Grid"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Duration (Seconds)
            </label>
            <input
              type="number"
              value={activityForm.duration}
              onChange={(e) => setActivityForm({ ...activityForm, duration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B833A]"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Therapeutic Observations & Adaptation
            </label>
            <textarea
              rows={3}
              value={activityForm.comments}
              onChange={(e) => setActivityForm({ ...activityForm, comments: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B833A] resize-none"
              placeholder="Sensory tolerance, postural stability, and vocalizations..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              onClick={() => setActivityModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveActivity}
              className="px-5 py-2 rounded-xl bg-[#3B833A] hover:bg-[#326e31] text-white font-bold text-sm shadow-md"
            >
              Log to Stream
            </button>
          </div>
        </div>
      </Modal>

      {/* 6. RAPID SOAP NOTE GENERATOR ON END SESSION */}
      <Modal
        isOpen={endSessionModalOpen}
        onClose={() => setEndSessionModalOpen(false)}
        title={`Finalize Clinical Note: ${currentStudent.firstName} ${currentStudent.lastName}`}
      >
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Pre-computed summary banner from live telemetry */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Live Telemetry Aggregated from Workspace</span>
            </div>
            <p className="text-xs text-emerald-800">
              Total session elapsed: <strong>{formatSessionTime(sessionSeconds)}</strong> | Trial accuracy:{' '}
              <strong>{trialAccuracy}%</strong> ({trialCorrect}/{trialEvents.length} trials) | Logged events:{' '}
              <strong>{recentEvents.length}</strong>
            </p>
          </div>

          {/* Domain Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Clinical Domains Targeted
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Communication & AAC',
                'Engagement & Focus',
                'Behavioral Regulation (ABA)',
                'Fine & Gross Motor Skills',
                'Sensory Integration'
              ].map((domain) => {
                const active = selectedDomains.includes(domain);
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => {
                      if (active) setSelectedDomains(selectedDomains.filter((d) => d !== domain));
                      else setSelectedDomains([...selectedDomains, domain]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      active
                        ? 'bg-[#3B833A] text-white border-[#3B833A] shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1-Click Observation Highlight Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1-Click Clinical Observation Highlights
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Independently used EthSL gestures',
                'Used pointing & AAC board to make requests',
                'Successfully completed structured tasks',
                'Maintained 15+ mins sustained attention',
                'Required minimal verbal prompting',
                'Remained calm and behaviorally regulated',
                'Smooth transitions between activity stations'
              ].map((text) => {
                const active = selectedHighlights.includes(text);
                return (
                  <button
                    key={text}
                    type="button"
                    onClick={() => {
                      if (active) setSelectedHighlights(selectedHighlights.filter((h) => h !== text));
                      else setSelectedHighlights([...selectedHighlights, text]);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border text-left transition-all ${
                      active
                        ? 'bg-[#F9E34D]/20 text-slate-900 border-[#F9E34D] font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SOAP Plan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              SOAP Next Steps & Clinical Plan
            </label>
            <textarea
              rows={2}
              value={soapPlan}
              onChange={(e) => setSoapPlan(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#3B833A] text-slate-900"
            />
          </div>

          {/* Parent Home Exercise Recommendation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Assigned Home Activity for Parents
            </label>
            <textarea
              rows={2}
              value={homeExercise}
              onChange={(e) => setHomeExercise(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#3B833A] text-slate-900"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">
              Auto-syncs to Parent Portal & Admin SOAP queue
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEndSessionModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Back to Session
              </button>
              <button
                onClick={handlePublishNote}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B833A] to-emerald-700 hover:from-[#326e31] hover:to-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-900/30 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit & Close Session</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ==========================================
// OBSERVATION CARDS IMPLEMENTATIONS (Clean Light Theme)
// ==========================================

// 1. FREQUENCY CARD (Touch to increment +1)
const LiveFrequencyCard: React.FC<{
  target: ObservationTarget;
  variant?: 'normal' | 'warning';
  onRecord: (target: ObservationTarget) => void;
}> = ({ target, variant = 'normal', onRecord }) => {
  const [count, setCount] = useState(0);

  const handleTap = () => {
    setCount((prev) => prev + 1);
    onRecord(target);
  };

  const isWarning = variant === 'warning';

  return (
    <button
      onClick={handleTap}
      type="button"
      className={`group relative flex flex-col justify-between p-5 rounded-3xl border text-left transition-all active:scale-[0.98] select-none shadow-soft hover:shadow-md overflow-hidden min-h-[145px] ${
        isWarning
          ? 'bg-white border-amber-200/90 hover:border-amber-400'
          : 'bg-white border-slate-200/90 hover:border-[#3B833A]/60'
      }`}
    >
      <div className="flex items-start justify-between w-full">
        <span
          className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
            isWarning
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {target.category}
        </span>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-black group-hover:scale-105 transition-transform border ${
            isWarning
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {count}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-base font-black leading-snug text-slate-900 group-hover:text-[#3B833A] transition-colors">
          {target.label}
        </h3>
        <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
          <span>{target.baseline}</span>
          <span className="font-bold text-xs text-[#3B833A] flex items-center gap-0.5">
            <Plus className="w-3.5 h-3.5" /> Tap (+1)
          </span>
        </p>
      </div>
    </button>
  );
};

// 2. DURATION CARD (Live Millisecond Stopwatch)
const LiveDurationCard: React.FC<{
  target: ObservationTarget;
  variant?: 'normal' | 'danger';
  onRecord: (target: ObservationTarget, durationSeconds: number, notes: string) => void;
}> = ({ target, variant = 'normal', onRecord }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        setElapsedMs(accumulatedRef.current + (Date.now() - (startTimeRef.current || 0)));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      const totalElapsed = accumulatedRef.current + (Date.now() - (startTimeRef.current || 0));
      accumulatedRef.current = 0;
      const secs = Math.round(totalElapsed / 1000);
      if (secs > 0) {
        onRecord(target, secs, `Duration: ${formatDuration(totalElapsed)}`);
        setElapsedMs(0);
      }
    } else {
      setIsRunning(true);
    }
  };

  const formatDuration = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${tenths}`;
  };

  const isDanger = variant === 'danger';

  return (
    <div
      className={`relative flex flex-col justify-between p-5 rounded-3xl border text-left transition-all select-none shadow-soft hover:shadow-md min-h-[145px] ${
        isRunning
          ? isDanger
            ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-500/20'
            : 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-500/20'
          : 'bg-white border-slate-200/90'
      }`}
    >
      <div className="flex items-start justify-between w-full">
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {target.category}
        </span>
        <div
          className={`font-mono text-xl font-black ${
            isRunning ? (isDanger ? 'text-rose-600' : 'text-blue-600') : 'text-slate-800'
          }`}
        >
          {formatDuration(elapsedMs)}
        </div>
      </div>

      <div className="mt-2.5">
        <h3 className="text-base font-black leading-snug text-slate-900">{target.label}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{target.baseline}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400">
          {isRunning ? '● Timing Live...' : 'Stopped'}
        </span>
        <button
          onClick={toggleTimer}
          type="button"
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
            isRunning
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'bg-[#3B833A] hover:bg-[#326e31] text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" /> Stop & Log
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> Start Timer
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// 3. TRIAL ACCURACY CARD (Live [X] and [✓] accuracy tracking)
const LiveTrialCard: React.FC<{
  target: ObservationTarget;
  onRecord: (target: ObservationTarget, isCorrect: boolean, attempt: number, accuracy: number) => void;
}> = ({ target, onRecord }) => {
  const [trials, setTrials] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const recordTrial = (isCorrect: boolean) => {
    const newCorrect = trials.correct + (isCorrect ? 1 : 0);
    const newTotal = trials.total + 1;
    const accuracy = Math.round((newCorrect / newTotal) * 100);

    setTrials({ correct: newCorrect, total: newTotal });
    onRecord(target, isCorrect, newTotal, accuracy);
  };

  const accuracy = trials.total > 0 ? Math.round((trials.correct / trials.total) * 100) : 0;

  return (
    <div className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-slate-200/90 text-left shadow-soft hover:shadow-md select-none min-h-[145px]">
      <div className="flex items-start justify-between w-full">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {target.category}
          </span>
          <h3 className="text-base font-black leading-snug text-slate-900 mt-1.5">{target.label}</h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
          <span className="text-2xl font-black text-[#3B833A]">
            {trials.total > 0 ? `${accuracy}%` : '--'}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold block">
            {trials.correct}/{trials.total} trials
          </span>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100">
        <button
          onClick={() => recordTrial(false)}
          type="button"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs active:scale-95 transition-all"
        >
          <X className="w-4 h-4" /> Incorrect
        </button>
        <button
          onClick={() => recordTrial(true)}
          type="button"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs active:scale-95 transition-all"
        >
          <Check className="w-4 h-4" /> Correct
        </button>
      </div>
    </div>
  );
};

// 4. PROMPT LEVEL HIERARCHY CARD (6-tier ABA Prompting Matrix)
const LivePromptLevelCard: React.FC<{
  target: ObservationTarget;
  onRecord: (target: ObservationTarget, level: string, label: string) => void;
}> = ({ target, onRecord }) => {
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);

  const prompts = [
    { level: 'INDEPENDENT', label: 'Ind (Independent)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' },
    { level: 'VERBAL', label: 'Verb (Verbal)', color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' },
    { level: 'GESTURAL', label: 'Gest (Gestural)', color: 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100' },
    { level: 'MODELING', label: 'Mod (Modeling)', color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
    { level: 'PARTIAL_PHYSICAL', label: 'P.Phys (Partial)', color: 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100' },
    { level: 'FULL_PHYSICAL', label: 'F.Phys (Full Phys)', color: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100' }
  ];

  const handlePrompt = (level: string, label: string) => {
    setLastPrompt(label);
    onRecord(target, level, label);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 text-left shadow-soft select-none space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {target.category}
          </span>
          <h3 className="text-base font-black text-slate-900 mt-1">{target.label}</h3>
        </div>

        {lastPrompt && (
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            Last: {lastPrompt}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Tap current prompting requirement needed for patient compliance and completion:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {prompts.map((p) => (
          <button
            key={p.level}
            onClick={() => handlePrompt(p.level, p.label)}
            type="button"
            className={`p-3 rounded-2xl border text-xs font-bold transition-all active:scale-95 text-center flex flex-col items-center justify-center ${p.color}`}
          >
            <span>{p.label.split(' ')[0]}</span>
            <span className="text-[10px] text-slate-500 font-normal mt-0.5">
              {p.label.split(' ')[1]?.replace('(', '')?.replace(')', '') || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
