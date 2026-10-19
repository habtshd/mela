import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  CalendarCheck,
  CheckCircle,
  Activity,
  MessageSquare,
  Smile,
  Award,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const Home: React.FC = () => {
  const { therapists, programs } = useDemo();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-bold shadow-sm border border-teal-200">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Pediatric Therapy Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Empowering Every Child’s <br />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                  Unique Potential
                </span>{' '}
                with Heart & Science.
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Neurodiversity-affirming pediatric occupational, speech, and behavioral therapy in a play-based clinical environment.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">140+</p>
                  <p className="text-xs text-slate-500 font-medium">Children Served</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-teal-600">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Licensed Staff</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">1:1</p>
                  <p className="text-xs text-slate-500 font-medium">Individual Care</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-400/20 to-emerald-400/20 blur-2xl -z-10" />

                {/* Main Image Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
                    alt="Pediatric therapy session"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-5 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        Sensory Lab
                      </span>
                      <span className="text-xs font-semibold text-amber-600">
                        ★★★★★ Family Rated
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      "Liam gained joyful independence and confidence in just six months."
                    </p>
                    <p className="text-xs text-slate-400">
                      — Sarah J., Parent Guardian
                    </p>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Clinical Outcomes</p>
                    <p className="text-[11px] text-teal-600 font-semibold">SOAP Progress Tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Care Philosophy
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Comprehensive Pediatric Support
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Individualized therapy pathways tailored to each child's developmental profile.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sensory Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vestibular, tactile, and proprioceptive regulation using swings and crash zones.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Speech & AAC</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Functional communication, articulation, and AAC device support.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Behavioral Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Positive reinforcement focusing on regulation and self-advocacy.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Parent Partnership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Caregiver coaching, home exercises, and progress tracking in the portal.
            </p>
            <Link to="/parent" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Parent Portal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs Grid */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Clinical Offerings</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Featured Programs
              </h2>
            </div>
            <Link
              to="/programs"
              className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              All programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                      {prog.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {prog.ageRange}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{prog.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {prog.objectives.slice(0, 3).map((obj, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lead: {prog.leadTherapistName.split(',')[0]}</span>
                  <Link
                    to="/services"
                    className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multidisciplinary Team Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Specialists
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Clinical Team
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Licensed pediatric specialists dedicated to child-centered care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all text-center space-y-3"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-teal-100"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs font-bold text-teal-600">{t.credentials}</p>
                <p className="text-xs text-slate-500">{t.title}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.bio}
              </p>
              <div className="pt-1 flex flex-wrap justify-center gap-1.5">
                {t.specializations.slice(0, 2).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all"
          >
            <span>View All Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Call To Action Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              Get Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Partner with Mela Today
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Contact our clinical intake team or sign in to access the platform.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>Contact Intake</span>
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/40 font-bold text-xs transition-all"
              >
                Sign In to Platform →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
