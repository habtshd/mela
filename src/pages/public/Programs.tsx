import React from 'react';
import { Calendar, Users, Clock, CheckCircle, Sparkles, ArrowRight, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Programs: React.FC = () => {
  const groupActivities = [
    {
      title: 'Shadow Teacher Training & School Deployment',
      titleAmharic: 'የአጃቢ መምህራን ስልጠና እና ምደባ',
      category: 'Inclusive Education',
      age: 'Ages 3 – 16',
      timing: 'Full-Day & Half-Day School Schedules',
      lead: 'Yohannes Bekele, B.Ed. & Wanos Mesfin',
      description: 'Training and deploying professional shadow teachers into Addis Ababa private and international schools to facilitate authentic academic and social inclusion.',
      features: [
        'Classroom prompt fading & visual schedule creation',
        'Peer interaction and recess play mediation',
        'Daily digital progress log for parents and teachers',
        'Regular clinical supervision and school IEP visits'
      ]
    },
    {
      title: 'Continuous Professional Development (CPD) for Educators',
      titleAmharic: 'የአካታች ትምህርት የሙያ ማሻሻያ ስልጠና',
      category: 'Professional Training',
      age: 'Teachers, School Administrators & Caregivers',
      timing: 'Weekend & Intensive Evening Cohorts',
      lead: 'Wanos Mesfin (ዋኖስ መስፍን) & Specialist Faculty',
      description: 'Accredited professional development courses covering autism spectrum foundations, applied behavior analysis (ABA) in classrooms, and inclusive pedagogy.',
      features: [
        'Certificate of Completion recognized in educational institutions',
        'Practical classroom case studies and intervention toolkits',
        'Inclusive teaching strategies and differentiation methods',
        'Curated modules authored by Wanos Mesfin'
      ]
    },
    {
      title: 'Parent Experience Sharing & Support Forum (“ተሞክሯችንን እናካፍላችሁ”)',
      titleAmharic: 'የወላጆች የልምድ ልውውጥ እና የምክክር መድረክ',
      category: 'Family Empowerment',
      age: 'For Parents & Guardians',
      timing: 'Monthly Weekend Sessions & Live Online Panels',
      lead: 'Wanos Mesfin & Guest Psychologists',
      description: 'Community-driven discussion panels, emotional support circles, and practical parent guidance addressing autism, mental health, and caregiver well-being.',
      features: [
        'Safe, confidential peer discussion in Amharic',
        'Q&A sessions with experienced special needs practitioners',
        'Home care strategies, routines, and coping mechanisms',
        'Active Telegram & Facebook community discussions'
      ]
    },
    {
      title: 'Sensory Explorers & Motor Stimulation Playgroup',
      titleAmharic: 'የስሜት ህዋሳት እና የቅድመ-ቴራፒ ክበብ',
      category: 'Sensory & Motor',
      age: 'Ages 2 – 8',
      timing: 'Saturdays, 9:00 AM – 11:30 AM',
      lead: 'Dawit Haile, OTR & Sensory Team',
      description: 'High-energy yet regulated sensory gym sessions utilizing platform swings, crash mats, deep pressure vests, and obstacle courses.',
      features: [
        'Small groups (max 5 children) with 2 dedicated therapists',
        'Vestibular balance, proprioceptive input, and motor planning',
        'Quiet sensory calm-down zone with dimmable lights',
        'Parent debrief and home sensory diet recommendations'
      ]
    },
    {
      title: 'Ethiopian Sign Language (EthSL) & Inclusive Communication',
      titleAmharic: 'የምልክት ቋንቋ እና የተግባቦት ስልጠና',
      category: 'Language & Communication',
      age: 'Children, Siblings & Parents',
      timing: 'Tuesdays & Thursdays, 4:00 PM – 5:15 PM',
      lead: 'Selamawit Tadesse & Eden Tesfaye',
      description: 'Bridging the communication barrier through Ethiopian Sign Language (EthSL) training, gesture coaching, and AAC symbol implementation.',
      features: [
        'Foundational Ethiopian Sign Language vocabulary',
        'AAC picture board and digital device integration',
        'Interactive parent-child communication games',
        'Advocacy for inclusive media and accessibility'
      ]
    },
    {
      title: 'Early Intervention & Milestone Stimulation Cohort',
      titleAmharic: 'የቅድመ-ልጅነት ጣልቃ ገብነት ፕሮግራም',
      category: 'Early Childhood',
      age: 'Ages 18 Months – 5 Years',
      timing: 'Weekday Mornings (3 Days / Week)',
      lead: 'Wanos Mesfin & Early Years Specialists',
      description: 'Intensive stimulation during the critical early years targeting joint attention, functional speech imitation, play skills, and motor coordination.',
      features: [
        'Standardized developmental milestone evaluations',
        'Individualized Education Plan (IEP) formulated for each toddler',
        'Multi-sensory musical and tactile learning stations',
        'In-home follow-up visits available across Addis Ababa'
      ]
    }
  ];

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>ልዩ ፕሮግራሞች • Specialized Programs</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Specialist Programs, CPD & Community Forums
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2">
          From deploying shadow teachers to Ethiopian schools to hosting accredited CPD training and parent forums (*“ተሞክሯችንን እናካፍላችሁ”*).
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {groupActivities.map((act, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    {act.category}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                    {act.age}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-0.5">{act.title}</h3>
                <p className="text-xs text-teal-700 font-semibold mb-3">{act.titleAmharic}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {act.description}
                </p>

                <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Key Features:</p>
                  {act.features.map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {act.timing}
                  </span>
                  <span className="text-slate-500">Lead: {act.lead}</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href="tel:+251717484604"
                    className="flex-1 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Inquire: +251 717 484 604</span>
                  </a>
                  <Link
                    to="/contact"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors flex items-center justify-center"
                  >
                    Register / Waitlist
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment & School Partnership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              For Schools & Special Needs Educators
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              School Partnerships & Shadow Teacher Recruitment Desk
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Are you a private or international school in Addis Ababa looking to enhance inclusive education support? Or are you a qualified special needs educator or psychology graduate seeking placement as a shadow teacher? Contact our specialized recruitment desk:
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-teal-200">
              <span className="bg-white/10 px-3.5 py-2 rounded-xl">📞 Recruitment Desk: +251 707 573 253</span>
              <span className="bg-white/10 px-3.5 py-2 rounded-xl">📞 Training Desk: +251 952 118 642</span>
              <span className="bg-white/10 px-3.5 py-2 rounded-xl">✈ Telegram: @Mela_Recruitment</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
