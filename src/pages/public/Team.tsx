import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Award, Mail, Phone, Calendar, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  const { therapists } = useDemo();

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Clinical Team
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Pediatric Specialists
        </h1>
        <p className="text-base text-slate-600 leading-relaxed mt-2">
          Licensed specialists collaborating to deliver personalized pediatric care.
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
                    <span>Location: {t.roomPreference || 'Main Clinic'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>With Mela since {t.joinedYear}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Request Session</span>
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
            Clinical Standards
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All therapists maintain active state licensure and specialized pediatric certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 text-xs font-semibold text-slate-700 pt-1">
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ NBCOT Board Certified (OTR)
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ ASHA Certified (CCC-SLP)
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ BACB Behavior Analysts (BCBA)
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm border border-slate-200">
              ✓ Pediatric Specialists (PCS)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
