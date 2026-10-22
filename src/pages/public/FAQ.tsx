import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  questionAmharic?: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs: FAQItem[] = [
    {
      category: 'Locations & In-Home',
      question: 'Where are Mela’s services located, and do you offer in-home therapy visits in Addis Ababa?',
      questionAmharic: 'የመላ አገልግሎቶች የት ነው የሚገኙት? የቤት ውስጥ ድጋፍ ይሰጣሉ?',
      answer: 'Yes! While our primary center clinic is located in Addis Ababa, a large portion of our work involves in-home therapy and caregiver guidance. Our certified therapists provide scheduled home visits across Bole, Megenagna, CMC, Sarbet, Yeka, and metropolitan Addis Ababa.'
    },
    {
      category: 'Shadow Teaching',
      question: 'How can we hire a trained shadow teacher for our child’s school in Addis Ababa?',
      questionAmharic: 'ለትምህርት ቤት አጃቢ መምህር (Shadow Teacher) እንዴት ማግኘት እንችላለን?',
      answer: 'Mela recruits, vets, and trains qualified special needs graduates and shadow educators. We place them directly into private and international schools (such as Maya International School and partner academies), coordinate with classroom teachers, design accommodation plans, and conduct regular on-site supervisory visits.'
    },
    {
      category: 'Clinical Leadership',
      question: 'Who leads the assessments and clinical programs at Mela Special Needs Service?',
      questionAmharic: 'የተቋሙን ምዘናና የቴራፒ መርሃ-ግብሮች የሚመራው ማነው?',
      answer: 'Our evaluations and programs are directed by Wanos Mesfin (ዋኖስ መስፍን), a prominent Ethiopian Special Needs & Inclusive Education specialist, author, and trainer with extensive expertise in child development, autism spectrum disorders, and Applied Behavior Analysis (ABA).'
    },
    {
      category: 'Parent Forums',
      question: 'What is the Parent Forum (“ተሞክሯችንን እናካፍላችሁ”), and how can families join?',
      questionAmharic: 'የወላጆች መድረክ (“ተሞክሯችንን እናካፍላችሁ”) ምንድነው?',
      answer: '“ተሞክሯችንን እናካፍላችሁ” is Mela’s monthly community support circle and online live panel series (hosted on Telegram and Facebook). It offers parents of neurodivergent children a safe space to exchange experiences, gain coping strategies, and consult with psychology and special needs practitioners.'
    },
    {
      category: 'Professional Training',
      question: 'Do you offer Continuous Professional Development (CPD) for school teachers?',
      questionAmharic: 'ለመምህራን የሙያ ማሻሻያ (CPD) ስልጠና ይሰጣሉ?',
      answer: 'Yes. We provide certified CPD training courses in special needs and inclusive education foundations, classroom behavior management (ABA), and sign language basics for schools, teachers, and caregivers in Addis Ababa, awarding recognized certificates upon completion.'
    },
    {
      category: 'Therapy & AAC',
      question: 'How do you support non-verbal children or children with speech apraxia?',
      questionAmharic: 'መናገር ለሚቸገሩ ልጆች ምን ዓይነት የቴራፒ ድጋፍ ይሰጣሉ?',
      answer: 'We utilize a multi-modal approach combining speech-language therapy, oral-motor stimulation, Ethiopian Sign Language (EthSL), and Augmentative & Alternative Communication (AAC picture and digital systems) in both Amharic and English.'
    },
    {
      category: 'Getting Started',
      question: 'How do we schedule an initial evaluation or consultation?',
      questionAmharic: 'ቅድመ-ምዘና ወይም ምክክር ለማስያዝ ምን ማድረግ አለብን?',
      answer: 'You can call our direct intake lines at +251 717 484 604 or +251 919 484 604, reach out on Telegram (@MelaSpecialNeedsService), or submit our online intake form. We typically schedule initial consultations within 24–48 business hours.'
    }
  ];

  const categories = ['All', 'Locations & In-Home', 'Shadow Teaching', 'Clinical Leadership', 'Parent Forums', 'Professional Training', 'Therapy & AAC', 'Getting Started'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      (faq.questionAmharic && faq.questionAmharic.includes(search));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>ጥያቄ እና መልስ • Frequently Asked Questions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Questions & Answers for Ethiopian Families
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2">
          Everything you need to know about our Addis Ababa clinic, home therapy visits, school shadow teachers, and parent forums.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. shadow teacher, home visit, autism, CPD)..."
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

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                      {faq.questionAmharic && (
                        <p className="text-xs text-teal-800 font-medium">
                          {faq.questionAmharic}
                        </p>
                      )}
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 flex-shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-bold text-sm">No matching questions found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "shadow", "home", "autism", or "CPD".</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Still Have Questions?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Our clinical team in Addis Ababa is available via direct phone or Telegram to assist with your specific questions.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+251717484604"
              className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +251 717 484 604</span>
            </a>
            <a
              href="https://t.me/MelaSpecialNeedsService"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all"
            >
              Telegram: @MelaSpecialNeedsService ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
