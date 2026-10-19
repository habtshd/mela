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
                <span>Pediatric Center of Clinical Excellence & Family Care</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Empowering Every Child’s <br />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                  Unique Potential
                </span>{' '}
                with Heart & Science.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Mela Special Needs Center provides neurodiversity-affirming pediatric occupational, speech, sensory, and behavioral therapies in an inspiring, play-based environment designed for children to thrive.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Therapy Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Management Demo</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-medium">Live</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">140+</p>
                  <p className="text-xs text-slate-500 font-medium">Empowered Children</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-teal-600">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Licensed Specialists</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">1:1</p>
                  <p className="text-xs text-slate-500 font-medium">Individualized Care</p>
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
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
                    alt="Pediatric therapy session with warm, smiling therapist and child"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                        Sensory Integration Lab
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                        ★★★★★ Family Rated
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      "Liam has achieved greater independence and joyful confidence in just six months with Mela."
                    </p>
                    <p className="text-xs text-slate-500">
                      — Sarah J., Parent Guardian of Liam (Age 6)
                    </p>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Objective Outcomes</p>
                    <p className="text-[11px] text-teal-600 font-semibold">SOAP Clinical Progress Tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Our Care Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Pediatric Support, Designed Around Families
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We don’t believe in one-size-fits-all treatments. Every child has distinct sensory profiles, communication styles, and joyful superpowers that guide their therapy pathway.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sensory Integration</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipped with specialized swings, tactile walls, and crash zones to regulate vestibular and proprioceptive inputs.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Speech & AAC Language</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fostering functional communication, articulation, and high-tech tablet AAC adaptations for non-verbal voices.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Affirming Behavior Care</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Positive-reinforcement strategies focusing on emotional regulation, self-advocacy, and school readiness.
            </p>
            <Link to="/services" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Parent Partnership</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Continuous caregiver coaching, home exercise routines, and live portal access to milestone notes and schedules.
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Our Clinical Offerings</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Featured Therapy Programs
              </h2>
            </div>
            <Link
              to="/programs"
              className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              View all programs & clubs <ArrowRight className="w-4 h-4" />
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
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                  <ul className="space-y-2 mb-6">
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Dedicated Specialists
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Meet Our Pediatric Clinical Leaders
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every therapist brings advanced university credentials, pediatric specialty certifications, and authentic compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all text-center space-y-4"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-teal-100"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs font-bold text-teal-600">{t.credentials}</p>
                <p className="text-xs text-slate-500 mt-1">{t.title}</p>
              </div>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {t.bio}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                {t.specializations.slice(0, 2).map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow transition-all"
          >
            <span>View All Clinical Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Call To Action Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Discover How Mela Can Support Your Child’s Milestones?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Schedule a comprehensive pediatric intake evaluation or explore our live management software demonstration to see our clinical workflows in action.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>Contact Our Intake Coordinator</span>
              </Link>
              <Link
                to="/login"
                className="px-6 py-3.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/40 font-bold text-sm transition-all"
              >
                Explore Demo Platform →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
