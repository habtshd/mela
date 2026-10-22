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

  const categories = [
    'All',
    'Occupational Therapy',
    'Speech Therapy',
    'Behavioral Health',
    'Sensory Therapy',
    'Inclusive Education',
    'Early Childhood'
  ];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  const iconsMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-6 h-6 text-brand-600" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-gold-600" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-brand-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-gold-600" />,
    Users: <Users className="w-6 h-6 text-brand-600" />,
    Footprints: <Footprints className="w-6 h-6 text-gold-600" />
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>አገልግሎቶቻችን • Clinical & Educational Care</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Specialized Therapy & School Support
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2">
          Evidence-based pediatric programs in Addis Ababa: In-Center Clinical Therapy, In-Home Family Interventions, and Dedicated School Shadow Teaching.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                      Expected Benefits
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
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Roadmap</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              What to Expect
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Structured 4-step intake for comfortable transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-2">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="text-sm font-bold text-slate-900">Consultation Call</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect via +251 717 484 604 or Telegram to discuss developmental priorities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-2">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="text-sm font-bold text-slate-900">Comprehensive Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In-depth speech, motor, sensory, and behavioral evaluation by our specialists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-2">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                03
              </span>
              <h3 className="text-sm font-bold text-slate-900">Customized Plan (IEP)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Co-create structured therapy goals, home routines, and school accommodations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-2">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                04
              </span>
              <h3 className="text-sm font-bold text-slate-900">Therapy & School Inclusion</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular center sessions, home caregiver visits, and shadow teacher placement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Schedule an Evaluation or Request a Shadow Teacher
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Our clinical team serves families across Addis Ababa with clinic-based evaluations, in-home therapy, and school placements.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+251717484604"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <span>Call +251 717 484 604</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
            >
              Send Intake Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
