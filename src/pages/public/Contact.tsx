import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useDemo();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    serviceInterest: 'Occupational Therapy (OT)',
    preferredTime: 'Morning (8am - 12pm)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(
      `Inquiry received from ${formData.parentName}! Our clinical intake team will respond within 24 business hours.`,
      'success'
    );
  };

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>ያግኙን • Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          We’re Here to Help
        </h1>
        <p className="text-base text-slate-600 leading-relaxed mt-2">
          Reach out to schedule an evaluation or learn more about our programs.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Clinic Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200/80 p-2 flex items-center justify-center flex-shrink-0">
                  <img src="/logo.png" alt="Mela Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Mela Special Needs Service</h2>
                  <p className="text-xs text-brand-700 font-semibold">መላ የልዩ-ፍላጎት አገልግሎት</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Addis Ababa, Ethiopia • In-Center, In-Home Care & School Deployments
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Location & Coverage</strong>
                    <span>
                      Addis Ababa, Ethiopia<br />
                      Center clinic with in-home visits and school shadow teaching across Bole, Megenagna, CMC, Sarbet, and surrounding sub-cities.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Phone Numbers</strong>
                    <div className="space-y-0.5">
                      <a href="tel:+251717484604" className="block text-teal-800 font-bold hover:underline">
                        +251 717 484 604 (Clinical Consultation)
                      </a>
                      <a href="tel:+251919484604" className="block text-teal-800 font-bold hover:underline">
                        +251 919 484 604 (Direct Line)
                      </a>
                      <p className="text-[11px] text-slate-500 pt-0.5">
                        Recruitment / CPD: +251 952 118 642 / +251 707 573 253
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Email</strong>
                    <a href="mailto:melaspecialneeds@gmail.com" className="hover:underline text-teal-700">
                      melaspecialneeds@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Working Hours</strong>
                    <span>
                      Mon – Fri: 8:00 AM – 6:00 PM (EAT)<br />
                      Sat: 8:30 AM – 4:00 PM<br />
                      Sun: Scheduled Parent Forums & Emergency Consultation
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Social Media Channels */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Connect on Social Media
                </p>
                <div className="flex flex-col gap-1.5 text-xs">
                  <a
                    href="https://web.facebook.com/MelaSpecialNeedsService"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors font-semibold"
                  >
                    <span>Official Facebook Page</span>
                    <span className="text-[11px] text-blue-700">1,300+ followers ↗</span>
                  </a>
                  <a
                    href="https://t.me/MelaSpecialNeedsService"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl transition-colors font-semibold" style={{background:'#f0f9f0',color:'#3B833A'}}
                  >
                    <span>Telegram Channel (@MelaSpecialNeedsService)</span>
                    <span className="text-[11px]" style={{color:'#3B833A'}}>Join ↗</span>
                  </a>
                  <a
                    href="https://t.me/MelaSpecialNeedsServiceGroup"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-teal-50 text-teal-900 hover:bg-teal-100 transition-colors font-semibold"
                  >
                    <span>Community Discussion Group</span>
                    <span className="text-[11px] text-teal-700">Chat ↗</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@melaspecialneedsservice"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors font-semibold"
                  >
                    <span>TikTok (@melaspecialneedsservice)</span>
                    <span className="text-[11px] text-slate-600">Follow ↗</span>
                  </a>
                </div>
              </div>

              {/* Map Preview Box */}
              <div className="pt-1">
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative h-36 bg-slate-100 flex items-center justify-center text-center p-4">
                  <div className="space-y-1 z-10">
                    <MapPin className="w-6 h-6 text-teal-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-900">Addis Ababa, Ethiopia</p>
                    <p className="text-[11px] text-slate-500">Center Clinic • In-Home Visits • Partner Schools</p>
                  </div>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
              {submitted ? (
                <div className="text-center py-10 space-y-3 animate-in fade-in">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Inquiry Received</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.parentName}</strong>. Our intake coordinator will contact you shortly.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          parentName: '',
                          childName: '',
                          childAge: '',
                          phone: '',
                          email: '',
                          serviceInterest: 'Occupational Therapy (OT)',
                          preferredTime: 'Morning (8am - 12pm)',
                          message: ''
                        });
                      }}
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Send an Inquiry</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Connect with our clinical intake team.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+251 9... / 09..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Child's Age *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Service or Program of Interest</label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Autism Spectrum & ABA Behavior Support">Autism Spectrum & ABA Behavior Support (የኦቲዝም እና የባህሪ ድጋፍ)</option>
                        <option value="Speech & Language / AAC Therapy">Speech & Language / AAC Therapy (ተግባቦት እና የንግግር ቴራፒ)</option>
                        <option value="Occupational Therapy & Sensory Integration">Occupational Therapy & Sensory Gym (የስሜት ህዋሳት ቴራፒ)</option>
                        <option value="School Shadow Teacher Placement">School Shadow Teacher Placement (የአጃቢ መምህር ምደባ)</option>
                        <option value="In-Home Therapist & Caregiver Service">In-Home Therapist & Caregiver Service (የቤት ውስጥ ድጋፍ)</option>
                        <option value="Early Childhood Intervention">Early Childhood Intervention (የቅድመ-ልጅነት ጣልቃ ገብነት)</option>
                        <option value="CPD Inclusive Education Training">CPD Inclusive Education Training for Teachers (የሙያ ማሻሻያ ስልጠና)</option>
                        <option value="Ethiopian Sign Language (EthSL)">Ethiopian Sign Language (EthSL) Support (የምልክት ቋንቋ)</option>
                        <option value="Comprehensive Clinical Assessment & IEP">Comprehensive Evaluation & IEP (ምዘና እና የግል እቅድ)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Timing / Mode</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Morning Clinic Session (8 AM – 12 PM)">Morning Clinic Session (8 AM – 12 PM)</option>
                        <option value="Afternoon Clinic Session (12 PM – 4 PM)">Afternoon Clinic Session (12 PM – 4 PM)</option>
                        <option value="Late Afternoon (4 PM – 6 PM)">Late Afternoon (4 PM – 6 PM)</option>
                        <option value="Saturday Clinic Session">Saturday Clinic Session</option>
                        <option value="In-Home Weekday Visit">In-Home Weekday Visit</option>
                        <option value="Full-Day School Shadow Teaching">Full-Day School Shadow Teaching</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Notes or Goals (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Current diagnoses, goals, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
