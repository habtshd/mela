import React from 'react';
import { Calendar, Users, Clock, CheckCircle, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Programs: React.FC = () => {
  const groupActivities = [
    {
      title: 'Sensory Explorers Weekend Club',
      category: 'Sensory & Motor',
      age: 'Ages 3 – 7',
      timing: 'Saturdays, 9:30 AM – 11:00 AM',
      lead: 'Michael Chen, MS, OTR/L & Marcus Bell, MT-BC',
      description: 'An open-ended sensory gym social hour incorporating obstacle courses, tactile sand trays, swing adventures, and calming musical cool-downs.',
      features: ['Max 6 children with 2 therapists', 'Visual schedules provided', 'Quiet break zones always available']
    },
    {
      title: 'Peer Playmakers Social Group',
      category: 'Social Pragmatics',
      age: 'Ages 5 – 9',
      timing: 'Wednesdays, 4:00 PM – 5:00 PM',
      lead: 'Sofia Martinez, Psy.D. & Amara Okafor, CCC-SLP',
      description: 'Facilitated group play focused on collaborative block building, board game negotiation, shared pretend play, and learning to read peer body language.',
      features: ['Turn-taking visual timers', 'Positive peer coaching', 'Parent debrief after each session']
    },
    {
      title: 'Handwriting Heroes & Fine-Motor Lab',
      category: 'Occupational Skills',
      age: 'Ages 4 – 8',
      timing: 'Tuesdays & Thursdays, 3:30 PM – 4:15 PM',
      lead: 'Michael Chen, MS, OTR/L',
      description: 'Multisensory handwriting curriculum using shaving cream tracing, putty resistance, chalkboards, and adaptive scissors to build joyful pencil confidence.',
      features: ['Adaptive grip trials', 'Posture & core support', 'Fun craft take-homes']
    },
    {
      title: 'School Readiness & Kindergarten Transition',
      category: 'Developmental Prep',
      age: 'Ages 4 – 6',
      timing: 'Summer & Fall Cohorts (10 Weeks)',
      lead: 'David Alvarez, BCBA & Team',
      description: 'Simulates classroom circle times, backpack unpacking, cafeteria noise acclimation, and following 3-step teacher instructions without anxiety.',
      features: ['Mock classroom layout', 'Audio desensitization practice', 'Transition IEP report provided']
    },
    {
      title: 'Parent & Caregiver Support Circle',
      category: 'Family Wellness',
      age: 'For Parents & Guardians',
      timing: 'First & Third Thursday, 6:30 PM – 7:30 PM',
      lead: 'Sofia Martinez, Psy.D.',
      description: 'A warm, confidential coffee hour for parents to share triumphs, exchange navigating strategies, and gain insights from pediatric psychologists.',
      features: ['Free supervised sensory play for kids during meeting', 'Guest IEP advocates', 'Complimentary refreshments']
    }
  ];

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Enrichment & Community
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Group Programs & Activities
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mt-4">
          Beyond 1-on-1 therapy, Mela offers vibrant small-group developmental clubs, sensory play labs, and supportive parent circles.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {groupActivities.map((act, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                    {act.category}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {act.age}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{act.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {act.description}
                </p>

                <div className="space-y-2 mb-6">
                  {act.features.map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {act.timing}
                  </span>
                  <span>Led by: {act.lead.split('&')[0]}</span>
                </div>

                <Link
                  to="/contact"
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs text-center transition-colors block"
                >
                  Join Waitlist / Register for Cohort
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
