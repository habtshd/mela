import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'Do I need a formal physician referral to start therapy at Mela?',
      answer: 'No referral is needed for an initial consultation or evaluation. Some insurers require a prescription for out-of-network reimbursement.'
    },
    {
      category: 'Getting Started',
      question: 'What happens during my child’s first comprehensive evaluation?',
      answer: 'A 60-minute play-based assessment of motor skills, sensory processing, and speech, followed by a collaborative goal discussion with parents.'
    },
    {
      category: 'Insurance & Billing',
      question: 'How does billing work, and do you accept insurance or provide superbills?',
      answer: 'We provide itemized Superbills with ICD-10 and CPT codes after every session for insurance reimbursement. HSA and FSA cards are accepted.'
    },
    {
      category: 'Therapy Sessions',
      question: 'Can parents stay in the therapy room during sessions?',
      answer: 'Yes. Parents can participate directly or observe from our family viewing lounge. Every session concludes with a therapist debrief.'
    },
    {
      category: 'Therapy Sessions',
      question: 'How do you measure and track my child’s developmental progress?',
      answer: 'Clinicians log standardized SOAP notes each session to track goal mastery, accessible anytime in the Parent Portal.'
    },
    {
      category: 'School Collaboration',
      question: 'Do Mela specialists collaborate with school teachers and IEP teams?',
      answer: 'Yes. With your permission, therapists coordinate with teachers, attend IEP meetings, and provide accommodation letters.'
    },
    {
      category: 'Therapy Sessions',
      question: 'What age groups do you serve at Mela Special Needs?',
      answer: 'We serve ages 18 months through 16 years, grouped by developmental stage and individual needs.'
    }
  ];

  const categories = ['All', 'Getting Started', 'Insurance & Billing', 'Therapy Sessions', 'School Collaboration'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          FAQ
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600 leading-relaxed mt-2">
          Answers regarding evaluations, sessions, billing, and parent involvement.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. insurance, evaluation, school)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === c
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900">{faq.question}</span>
                  <div className="p-1 rounded-lg bg-slate-100 text-slate-600 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                      Topic: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
              <p className="text-xs text-slate-500">
                Try searching for a different keyword or contact our intake team directly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-teal-50 rounded-3xl p-6 border border-teal-200/80 max-w-xl mx-auto space-y-2">
          <h3 className="text-base font-bold text-teal-950">Have a specific question?</h3>
          <p className="text-xs text-teal-800 leading-relaxed">
            Our team is available to discuss evaluation scheduling, plans, and goals.
          </p>
          <div className="pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-all"
            >
              <span>Contact Intake</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
