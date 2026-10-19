import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Activity,
  MessageSquare,
  HeartHandshake,
  Sparkles,
  Users,
  Footprints,
  CheckCircle,
  Clock,
  UserCheck,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const { programs } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Occupational Therapy', 'Speech Therapy', 'Behavioral Health', 'Sensory Therapy', 'Social Skills', 'Physical Therapy'];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  const iconsMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-6 h-6 text-teal-600" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-sky-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-amber-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-purple-600" />,
    Users: <Users className="w-6 h-6 text-emerald-600" />,
    Footprints: <Footprints className="w-6 h-6 text-rose-600" />
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Comprehensive Clinical Care
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Pediatric Therapy Programs
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mt-4">
          Each therapy program is led by certified specialists and customized to your child's developmental profile, strengths, and daily routine.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    {iconsMap[prog.iconName] || <Activity className="w-6 h-6 text-teal-600" />}
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                      {prog.category}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{prog.ageRange}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{prog.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {prog.detailedOverview}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Clinical Objectives
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {prog.objectives.map((obj, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Expected Benefits for Families
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {prog.benefits.map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {prog.durationMinutes} min session
                  </span>
                  <span>•</span>
                  <span>Lead: {prog.leadTherapistName.split(',')[0]}</span>
                </div>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Inquire for Evaluation</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Evaluation Works */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">The Mela Roadmap</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              What to Expect From Day One
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our structured 4-step intake ensures comfortable transitions and customized milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
              <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                01
              </span>
              <h3 className="text-base font-bold text-slate-900">Intake Discovery Call</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 20-minute phone call to listen to your priorities, discuss developmental concerns, and explain our clinical modalities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
              <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                02
              </span>
              <h3 className="text-base font-bold text-slate-900">Clinical Evaluation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A warm, playful 60-minute sensory and diagnostic evaluation in our gym, assessing fine/gross motor skills or speech.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
              <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                03
              </span>
              <h3 className="text-base font-bold text-slate-900">Collaborative Care Plan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review the diagnostic report together, co-create measurable IEP/clinical goals, and assign your lead specialist.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
              <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                04
              </span>
              <h3 className="text-base font-bold text-slate-900">Joyful Therapy & Home Diet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular sessions begin! Parents track live SOAP progress notes and receive weekly bite-sized home activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-10 border border-slate-200/90 shadow-soft max-w-3xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Have Questions About Insurance or Schedules?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our clinical intake coordinators are available Monday through Friday to verify coverage and assist with superbills.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition-all flex items-center gap-2"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/faq"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
            >
              Read Parent FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
