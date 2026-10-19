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
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Contact Us
        </span>
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
              <h2 className="text-xl font-bold text-slate-900">Mela Special Needs Center</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accessible stroller and wheelchair parking adjacent to the main entrance.
              </p>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Address</strong>
                    <span>450 Wellness Pavilion Blvd, Suite 300<br />Healthcare Innovation Park, NY 10024</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Phone</strong>
                    <span>(555) 720-MELA (6352)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Email</strong>
                    <span>intake@melaspecialneeds.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Hours</strong>
                    <span>Mon – Fri: 7:30 AM – 6:30 PM<br />Sat: 8:30 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Map Preview Mockup */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative h-40 bg-slate-100 flex items-center justify-center text-center p-4">
                  <div className="space-y-1 z-10">
                    <MapPin className="w-7 h-7 text-teal-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-900">Healthcare Innovation Pavilion</p>
                    <p className="text-[11px] text-slate-500">Suite 300 • Free Parking Lot B</p>
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
                        placeholder="(555) 000-0000"
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
                        placeholder="e.g. 6"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Therapy Interest</label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Occupational Therapy (OT)">Occupational Therapy (OT)</option>
                        <option value="Speech & Language Therapy">Speech & Language / AAC</option>
                        <option value="Behavioral Therapy (ABA)">Applied Behavior Analysis (ABA)</option>
                        <option value="Sensory Integration Gym">Sensory Integration Gym</option>
                        <option value="Pediatric Physical Therapy">Physical Therapy (PT)</option>
                        <option value="Multidisciplinary Evaluation">Full Evaluation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Timing</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Morning (8am - 12pm)">Morning (8 AM – 12 PM)</option>
                        <option value="Afternoon (12pm - 4pm)">Afternoon (12 PM – 4 PM)</option>
                        <option value="Late Afternoon (4pm - 6:30pm)">Late Afternoon (4 PM – 6:30 PM)</option>
                        <option value="Saturday Morning">Saturday Morning</option>
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
