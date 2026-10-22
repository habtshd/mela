import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Award, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  const { therapists } = useDemo();

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>ባለሙያዎቻችን • Clinical & Educational Team</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Pediatric & Special Needs Specialists
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2">
          Led by founder and author Wanos Mesfin, our multidisciplinary team collaborates directly with Ethiopian families and schools to deliver transformative individual care.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-52 rounded-2xl object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 border border-teal-200/60 shadow-sm">
                    {t.credentials}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs font-bold text-teal-600 mb-2">{t.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {t.bio}
                </p>

                <div className="space-y-1.5 mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    <span>Location: {t.roomPreference || 'Addis Ababa Center & Home Visits'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Direct: {t.phone}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex gap-2">
                <a
                  href={`tel:${t.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call Direct</span>
                </a>
                <Link
                  to="/contact"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>Book Intake</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="bg-slate-100/70 py-14 border-y border-slate-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Professional Standards & Certification
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All Mela therapists and shadow teachers hold certified degrees in Special Needs Education, Psychology, Speech Therapy, or Child Development, and undergo continuous supervision.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 text-xs font-semibold text-slate-700 pt-1">
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ MA in Special Needs & Inclusive Education
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ Certified Speech & Language Pathologists
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ Applied Behavior Analysis (ABA) Specialists
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ CPD Accredited Inclusive School Facilitators
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ Ethiopian Sign Language (EthSL) Certified
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
