import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, Target, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            About Mela Special Needs
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Nurturing Joy, Independence & Lifelong Potential
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Founded with a vision of holistic pediatric care, Mela brings together experienced occupational therapists, speech pathologists, behavioral analysts, and educators under one welcoming roof.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
              alt="Therapist working with child on motor skills"
              className="rounded-3xl shadow-xl border-4 border-white object-cover w-full h-96"
            />
            <div className="absolute -bottom-6 -right-6 bg-teal-900 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <p className="text-2xl font-black text-teal-300">100%</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                Individualized clinical goals mapped directly to each child’s natural interests.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Our Story & Clinical Mission
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At Mela, we understand that raising a child with developmental differences or unique neurological needs can feel overwhelming. Traditional medical models often isolate services, leaving families to coordinate between disconnected clinics.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We built Mela to be different: a collaborative ecosystem where speech, motor, sensory, and behavioral specialists confer daily. By harmonizing clinical insights with continuous parent empowerment, we foster real-world developmental triumphs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">Neurodiversity Affirming</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">State-of-the-Art Sensory Gym</span>
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">What Guides Us</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Joy-First Therapy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Children learn best when they feel safe, respected, and enthusiastic. Every clinical session incorporates joyful play and authentic connection.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Evidence-Based Milestones</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We utilize standardized assessments and continuous clinical SOAP tracking to ensure interventions produce measurable, functional growth.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Whole Family Partnership</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Parents are the true experts on their children. We provide parents with practical home strategies, sensory diets, and unwavering emotional support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-10 border border-slate-200/90 shadow-soft max-w-3xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Meet the Team Behind Mela
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our multi-disciplinary pediatric therapists bring advanced degrees, sensory certifications, and genuine hearts to every session.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/team"
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow transition-all flex items-center gap-2"
            >
              <span>View Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
