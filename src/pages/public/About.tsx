import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  School,
  Home,
  MessageCircle,
  Activity
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs sm:text-sm font-bold shadow-sm border border-brand-200">
            <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
            <span>ስለ መላ የልዩ-ፍላጎት አገልግሎት • About Mela Special Needs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Advancing Inclusive Education & Pediatric Therapy in Ethiopia
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Mela Special Needs Service (መላ የልዩ-ፍላጎት አገልግሎት) is a pioneering organization and community platform in Addis Ababa dedicated to empowering children with autism, developmental delays, speech disorders, and learning differences.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
              alt="Mela Special Needs Service therapist working with child in Addis Ababa"
              className="rounded-3xl shadow-xl border-4 border-white object-cover w-full h-[420px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl max-w-xs border border-teal-500/30 hidden sm:block">
              <p className="text-3xl font-black text-teal-300">1,300+</p>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                Parents, educators, and therapists united in our community across Ethiopia.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Founded & Guided by Special Needs Experts</span>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Bridging the Special Needs Gap in Ethiopia
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded under the leadership of special needs and inclusive education specialist <strong>Wanos Mesfin (ዋኖስ መስፍን)</strong>, Mela was established to address a critical national need: providing accessible, evidence-informed developmental support, speech pathology, ABA behavior intervention, and inclusive schooling for children throughout Addis Ababa and beyond.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe every child deserves the opportunity to learn, communicate, and flourish in their community, home, and mainstream school environment without barriers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">In-Center Clinic & Sensory Gym</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">In-Home Therapy & Visits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">School Shadow Teacher Placement</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">CPD Accredited Teacher Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Operation */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">How We Serve</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Four Operational Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A 360-degree ecosystem supporting the child, family, school, and broader Ethiopian society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Pediatric Therapy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speech & language therapy, sensory gym integration, and ABA behavior management tailored to individual milestones.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-900 border border-gold-300 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">In-Home Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connecting families with vetted in-home therapists and special needs caregivers across Addis Ababa neighborhoods.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-800 border border-brand-200 flex items-center justify-center">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Shadow Teaching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recruiting, training, and deploying certified shadow educators to accompany students in private and international schools.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-900 border border-gold-300 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Parent Forums & Advocacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Organizing online and in-person experience-sharing panels (*“ተሞክሯችንን እናካፍላችሁ”*) and sign language awareness initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
                Clinical Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Led by Wanos Mesfin (ዋኖስ መስፍን)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Wanos Mesfin is a leading Ethiopian Special Needs & Inclusive Education specialist, author, and trainer with extensive experience in child development, autism behavioral intervention (ABA), and teacher training modules. Through Mela Special Needs Service and active public forums, Wanos has helped hundreds of families navigate developmental diagnoses with hope and actionable clinical strategies.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-teal-200">
                <span className="flex items-center gap-1.5">✓ Master's in Special Needs & Inclusive Education</span>
                <span className="flex items-center gap-1.5">✓ Author & CPD Program Developer</span>
                <span className="flex items-center gap-1.5">✓ Child Psychology & ABA Specialist</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                alt="Wanos Mesfin"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-teal-400 mb-3"
              />
              <h4 className="text-lg font-bold text-white">Wanos Mesfin</h4>
              <p className="text-xs text-teal-300 font-medium">Founder & Clinical Director</p>
              <p className="text-[11px] text-slate-400 mt-1">ዋኖስ መስፍን — የልዩ ፍላጎትና አካቶ ትምህርት ባለሙያ</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Connect with Our Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Need consultation, assessment, shadow teacher placement, or CPD training for your school in Addis Ababa?
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/team"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <span>View Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
            >
              Contact Clinic & In-Home Intake
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
