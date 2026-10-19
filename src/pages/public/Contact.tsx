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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          We’re Here for Your Family
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mt-4">
          Whether you’re exploring pediatric evaluations for the first time or seeking specialized sensory gym therapy, our friendly team is ready to guide you.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Clinic Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Mela Special Needs Center</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located in the child-friendly Wellness Pavilion with accessible reserved stroller and wheelchair parking adjacent to the main entrance.
              </p>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Clinic Location</strong>
                    <span>450 Wellness Pavilion Blvd, Suite 300<br />Healthcare Innovation Park, NY 10024</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Intake Hotline & Direct Phone</strong>
                    <span>(555) 720-MELA (6352)</span>
                    <p className="text-[11px] text-teal-600 font-medium mt-0.5">Direct confidential intake extension: #1</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Email Communications</strong>
                    <span>intake@melaspecialneeds.org</span>
                    <p className="text-[11px] text-slate-400">Encrypted HIPAA-compliant email</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Clinical Center Operating Hours</strong>
                    <span>Monday – Friday: 7:30 AM – 6:30 PM<br />Saturday: 8:30 AM – 2:00 PM<br />Sunday: Closed for Sensory Deep Sanitization</span>
                  </div>
                </div>
              </div>

              {/* Map Preview Mockup */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative h-48 bg-slate-100 flex items-center justify-center text-center p-4">
                  <div className="space-y-1 z-10">
                    <MapPin className="w-8 h-8 text-teal-600 mx-auto animate-bounce" />
                    <p className="text-xs font-bold text-slate-900">Healthcare Innovation Pavilion</p>
                    <p className="text-[11px] text-slate-500">Suite 300 (Elevator Access Floor 3)</p>
                    <span className="inline-block text-[10px] font-semibold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full mt-1">
                      Free Family Parking in Lot B
                    </span>
                  </div>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-soft">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Inquiry Received Successfully!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.parentName}</strong>. Our pediatric intake coordinator has received your message regarding <strong>{formData.childName || 'your child'}</strong> and will call you at <strong>{formData.phone}</strong>.
                  </p>
                  <div className="pt-4">
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
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900">Send an Intake Inquiry</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us a little about your family and the developmental milestones you'd like to support.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Child's Age *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 6 years"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Therapy Interest</label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Occupational Therapy (OT)">Occupational Therapy (Fine Motor & Sensory)</option>
                        <option value="Speech & Language Therapy">Speech & Language Pathology / AAC</option>
                        <option value="Behavioral Therapy (ABA)">Applied Behavior Analysis (ABA)</option>
                        <option value="Sensory Integration Gym">Sensory Integration Gym & Swings</option>
                        <option value="Pediatric Physical Therapy">Pediatric Physical Therapy (PT)</option>
                        <option value="Multidisciplinary Evaluation">Full Multi-Specialty Evaluation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time of Day</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Morning (8am - 12pm)">Morning (8:00 AM – 12:00 PM)</option>
                        <option value="Afternoon (12pm - 4pm)">Afternoon (12:00 PM – 4:00 PM)</option>
                        <option value="Late Afternoon (4pm - 6:30pm)">Late Afternoon (4:00 PM – 6:30 PM)</option>
                        <option value="Saturday Morning">Saturday Morning (8:30 AM – 1:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tell us about your child's needs or goals (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share any current developmental diagnoses, speech goals, sensory preferences, or questions you have for our therapists..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Intake Inquiry</span>
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
