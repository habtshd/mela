import React, { useState } from 'react';
import { Sparkles, Eye, Shield } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

interface FacilityItem {
  id: string;
  title: string;
  category: 'Sensory Gym' | 'Speech Pod' | 'Training & CPD' | 'Home & School Space';
  image: string;
  description: string;
  features: string[];
}

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<FacilityItem | null>(null);

  const facilityItems: FacilityItem[] = [
    {
      id: 'fac-1',
      title: 'Pediatric Sensory Gym',
      category: 'Sensory Gym',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
      description: 'Suspension beams with bolster and platform swings, deep pressure crash pads, and climbing textures.',
      features: ['Proprioceptive swings', 'Padded crash safety mats', 'Calming sensory lighting', 'Vestibular balance zones']
    },
    {
      id: 'fac-2',
      title: 'Speech & AAC Communication Pod',
      category: 'Speech Pod',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      description: 'Acoustically quiet therapy room for speech articulation, bilingual Amharic-English vocabulary, and AAC device practice.',
      features: ['Mirror articulation feedback', 'AAC picture communication cards', 'Oral motor stimulation tools', 'Quiet distraction-free zone']
    },
    {
      id: 'fac-3',
      title: 'Special Needs CPD Seminar & Training Hall',
      category: 'Training & CPD',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
      description: 'Multi-purpose training room where Wanos Mesfin conducts teacher workshops, CPD certifications, and parent circles.',
      features: ['Interactive presentation screens', 'Special education training library', 'Hands-on IEP workshop tables', 'Livestream panel equipment']
    },
    {
      id: 'fac-4',
      title: 'Multi-Sensory Calm Down Room',
      category: 'Sensory Gym',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      description: 'A soothing sensory retreat with color-changing bubble lamps, fiber optic glow, and weighted soothing blankets.',
      features: ['Color bubble columns', 'Tactile fiber optics', 'Deep pressure weighted vests', 'Gentle acoustic soothing']
    },
    {
      id: 'fac-5',
      title: 'Inclusive School Classroom Integration',
      category: 'Home & School Space',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800',
      description: 'Classroom simulation where children practice circle time, task endurance, and shadow teacher accommodation.',
      features: ['Visual schedule desk boards', 'Adaptive classroom seating', 'Desensitization practice', 'Shadow educator coaching station']
    },
    {
      id: 'fac-6',
      title: 'In-Home Therapy & Mobile Caregiver Kit',
      category: 'Home & School Space',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      description: 'Portable sensory, motor, and speech toolkits dispatched with therapists for home visits across Addis Ababa.',
      features: ['Portable sensory mats', 'Tactile motor putty & adaptive tools', 'AAC communication binders', 'Parent coaching activity cards']
    }
  ];

  const categories = ['All', 'Sensory Gym', 'Speech Pod', 'Training & CPD', 'Home & School Space'];

  const filteredItems = filter === 'All'
    ? facilityItems
    : facilityItems.filter((i) => i.category === filter);

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-900 text-xs font-bold border border-brand-200">
          <img src="/logo.png" alt="Mela Logo" className="w-5 h-5 object-contain" />
          <span>ማዕከላችን • Clinical & Training Spaces</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Sensory Center & Learning Environments
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-2">
          Designed for comfort, communication, and focused development in Addis Ababa, Ethiopia.
        </p>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === c
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-teal-800 shadow-sm">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> View Specifications
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.features.slice(0, 2).map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
          subtitle={`Clinical Environment: ${selectedItem.category}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-72 rounded-2xl object-cover"
            />
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedItem.description}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Key Environmental & Therapeutic Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedItem.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
