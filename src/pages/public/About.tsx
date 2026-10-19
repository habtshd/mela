import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, Target, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            About Mela
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Nurturing Joy, Independence & Potential
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Holistic pediatric therapy uniting occupational, speech, behavioral, and sensory specialists.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
              alt="Therapist working with child"
              className="rounded-3xl shadow-xl border-4 border-white object-cover w-full h-96"
            />
            <div className="absolute -bottom-6 -right-6 bg-teal-900 text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <p className="text-2xl font-black text-teal-300">100%</p>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                Goals mapped to each child's strengths.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Our Clinical Mission
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Mela is a collaborative pediatric center where occupational, speech, motor, and behavioral specialists coordinate daily with families to achieve real-world developmental milestones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">Neurodiversity Affirming</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">Sensory Gym Facility</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">Real-Time Parent Portal</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">School & IEP Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Principles</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Joy-First Therapy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Play-based sessions prioritizing safety, comfort, and active engagement.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Evidence Milestones</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective progress tracking using standardized assessments and clinical notes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Family Partnership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collaborative caregiver coaching, home routines, and direct communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Meet Our Specialists
          </h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Multi-disciplinary pediatric therapists dedicated to supporting your child's growth.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/team"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <span>View Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
