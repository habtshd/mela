import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Mela <span className="text-teal-400">Special Needs</span>
                </span>
                <p className="text-[11px] text-teal-300/80 font-medium tracking-wide">
                  Pediatric Therapy & Family Center
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing joyful, child-centered pediatric therapy services that celebrate every child's potential. We partner closely with families, schools, and specialists to foster lifelong independence and confidence.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>State Board Licensed Center</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Neurodiversity Affirming</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Mela</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">Our Story & Mission</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors">Therapy Programs</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-teal-400 transition-colors">Meet Our Specialists</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-teal-400 transition-colors">Group Activities & Clubs</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-teal-400 transition-colors">Sensory Gym Facility Tour</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-teal-400 transition-colors">Parent FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Clinical Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Occupational Therapy (OT)</li>
              <li>Speech & Language Pathology</li>
              <li>Applied Behavior Analysis (ABA)</li>
              <li>Sensory Integration Lab</li>
              <li>Pediatric Physical Therapy</li>
              <li>AAC Device Implementation</li>
              <li>Parent Coaching & IEP Advocacy</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact & Hours</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>450 Wellness Pavilion Blvd, Suite 300, Healthcare Park</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>(555) 720-MELA (6352)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>info@melaspecialneeds.org</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>
                  Mon – Fri: 7:30 AM – 6:30 PM<br />
                  Sat: 8:30 AM – 2:00 PM
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
              >
                Access Staff / Parent Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Mela Special Needs Center. All rights reserved.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center md:text-left text-[11px] text-slate-400 max-w-xl">
            <strong className="text-teal-400">Frontend Demo Prototype Notice:</strong> Fictional patient data, sample staff bios, and simulated billing are presented solely for platform evaluation and review.
          </div>
        </div>
      </div>
    </footer>
  );
};
