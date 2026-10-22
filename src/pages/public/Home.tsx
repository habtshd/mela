import React from 'react';
import { Link } from 'react-router-dom';
import {
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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-slate-50 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs sm:text-sm font-bold shadow-sm border border-brand-200">
                <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
                <span>መላ የልዩ-ፍላጎት አገልግሎት • Addis Ababa, Ethiopia</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Empowering Children with <br />
                <span className="bg-gradient-to-r from-brand-600 via-emerald-600 to-gold-500 bg-clip-text text-transparent">
                  Special Needs & Autism
                </span>{' '}
                in Ethiopia.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Connecting Ethiopian families with professional Speech Therapy, Applied Behavior Analysis (ABA), Occupational Therapy, In-Home Caregivers, and Trained Shadow Teachers for inclusive education.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Therapies & Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:+251717484604"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-gold-50/50 text-slate-900 border-2 border-gold-500 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-brand-600" />
                  <span>Call: +251 717 484 604</span>
                </a>
              </div>

              {/* Trust Indicators based on Facebook Community & Services */}
              <div className="pt-6 grid grid-cols-4 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">1,300+</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Community Followers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-brand-600">350+</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Families Supported</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">120+</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Shadow Teachers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gold-600">1:1</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Home & Clinic Care</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-400/20 via-gold-400/20 to-emerald-400/20 blur-2xl -z-10" />

                {/* Main Image Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white relative">
                  {/* Floating Brand Stamp */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2 z-10">
                    <img src="/logo.png" alt="Mela Logo" className="w-6 h-6 object-contain" />
                    <span className="text-xs font-black text-slate-900">Mela Special Needs</span>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
                    alt="Pediatric therapy session in Addis Ababa"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-5 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                        Addis Ababa Center & In-Home
                      </span>
                      <span className="text-xs font-semibold text-amber-600">
                        ★★★★★ Parent Trusted
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      "መላ የልዩ-ፍላጎት አገልግሎት helped our son develop functional speech and comfortably attend school with an attentive shadow teacher."
                    </p>
                    <p className="text-xs text-slate-400">
                      — Parent Member, Mela Family Community
                    </p>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Inclusive Education CPD</p>
                    <p className="text-[11px] text-brand-600 font-semibold">Accredited Special Needs Training</p>
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
            Care Philosophy • የሥራችን መርሆዎች
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Integrated Special Needs Services in Ethiopia
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From early evaluation to school-based shadow teaching, we support neurodivergent children at every step of their growth.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link to="/services" className="group rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=700"
                alt="Autism & ABA Behavior Support"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-gold-900 border border-gold-300 flex items-center justify-center shadow-sm">
                <Smile className="w-4 h-4 text-brand-600" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Autism & ABA Therapy</h3>
              <ChevronRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/services" className="group rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=700"
                alt="Speech & Language Therapy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-brand-700 border border-brand-200 flex items-center justify-center shadow-sm">
                <MessageSquare className="w-4 h-4 text-brand-600" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Speech & Communication</h3>
              <ChevronRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/services" className="group rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=700"
                alt="Sensory & Occupational Therapy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-gold-900 border border-gold-300 flex items-center justify-center shadow-sm">
                <Activity className="w-4 h-4 text-brand-600" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Occupational & Sensory</h3>
              <ChevronRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/programs" className="group rounded-3xl bg-white border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
            <div className="h-52 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=700"
                alt="Shadow Teaching & School Integration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-brand-700 border border-brand-200 flex items-center justify-center shadow-sm">
                <Users className="w-4 h-4 text-brand-600" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">School Shadow Teaching</h3>
              <ChevronRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Visual Center Highlights & Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Therapy Spaces</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Center & Clinical Facilities
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
          >
            Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group h-48 sm:h-56">
            <img
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600"
              alt="Sensory Calm Down Room"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Sensory Calm Room</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group h-48 sm:h-56">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600"
              alt="CPD Training Seminar Hall"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">CPD Workshop Hall</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group h-48 sm:h-56">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600"
              alt="Classroom Inclusion Practice"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Classroom Simulation</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group h-48 sm:h-56">
            <img
              src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=600"
              alt="Fine Motor Therapy Tools"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white">Fine Motor Play Zone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Grid */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
            {programs.slice(0, 3).map((prog, idx) => {
              const programImages = [
                'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700',
                'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=700',
                'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=700'
              ];
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={programImages[idx % programImages.length]}
                      alt={prog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur text-brand-700 shadow-sm border border-slate-100">
                        {prog.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur shadow-sm">
                        {prog.ageRange}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{prog.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {prog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Lead: {prog.leadTherapistName.split(',')[0]}</span>
                      <Link
                        to="/services"
                        className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multidisciplinary Team Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Specialists
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Clinical Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all text-center space-y-2.5"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-brand-100 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs font-bold text-brand-600">{t.credentials}</p>
                <p className="text-xs text-slate-500">{t.title}</p>
              </div>
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

        <div className="text-center mt-6">
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
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              ልዩ-ፍላጎት አገልግሎት • Addis Ababa
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Get Professional Support for Your Child Today
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Whether you need in-center therapy, in-home caregiver guidance, or an experienced shadow teacher for school, Mela Special Needs Service is here to walk with you.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="tel:+251717484604"
                className="px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-slate-900" />
                <span>Call +251 717 484 604</span>
              </a>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all flex items-center gap-2"
              >
                <span>Send Intake Inquiry</span>
              </Link>
              <a
                href="https://t.me/MelaSpecialNeedsService"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border" style={{background:'rgba(249,227,77,0.15)',color:'#F9E34D',borderColor:'rgba(249,227,77,0.35)'}}
              >
                <span>Telegram @MelaSpecialNeedsService ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
