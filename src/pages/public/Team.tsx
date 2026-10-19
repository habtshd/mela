import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Award, Mail, Phone, Calendar, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  const { therapists } = useDemo();

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Our Clinical Leadership
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Passionate Pediatric Specialists
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mt-4">
          Our licensed occupational therapists, speech pathologists, behavior analysts, and physical therapists collaborate every day to deliver personalized, joy-filled developmental breakthroughs.
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
                <div className="relative mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-56 rounded-2xl object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 border border-teal-200/60 shadow-sm">
                    {t.credentials}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
                <p className="text-xs font-bold text-teal-600 mb-3">{t.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Specializations
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    <span>Clinical Facility: {t.roomPreference || 'Main Clinic Suite'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>With Mela since {t.joinedYear}</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Request Session with {t.name.split(' ')[0]}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Commitment to Clinical Excellence
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            All Mela therapists participate in monthly peer-reviewed clinical grand rounds, maintain active state licensure, and hold specialized certifications in sensory integration, AAC technologies, and neurodiversity-affirming care.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-700">
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              ✓ NBCOT Board Certified (OTR)
            </span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              ✓ ASHA Certificate of Clinical Competence (CCC-SLP)
            </span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              ✓ BACB Certified Behavior Analysts (BCBA)
            </span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
              ✓ APTA Pediatric Certified Specialists (PCS)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
