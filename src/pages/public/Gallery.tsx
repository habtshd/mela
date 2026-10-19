import React, { useState } from 'react';
import { Sparkles, Eye, Shield } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

interface FacilityItem {
  id: string;
  title: string;
  category: 'Sensory Gym' | 'Speech Pod' | 'Motor Room' | 'Family Space';
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
      title: 'Sensory Gym Alpha',
      category: 'Sensory Gym',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
      description: 'Suspension beams with platform swings, hammock cocoons, and impact crash mats.',
      features: ['Adjustable swings', 'Padded crash zones', 'Warm circadian lighting', 'Acoustic damping']
    },
    {
      id: 'fac-2',
      title: 'Speech & AAC Pod',
      category: 'Speech Pod',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      description: 'Acoustically treated space for speech pathology, articulation, and AAC device practice.',
      features: ['High-contrast walls', 'Oral motor station', 'Mirror feedback', 'Soundproof doors']
    },
    {
      id: 'fac-3',
      title: 'Motor & Gait Gym Beta',
      category: 'Motor Room',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
      description: 'Physical therapy space with balance beams, parallel gait bars, and unweighting treadmill.',
      features: ['Parallel walking bars', 'Balance discs', 'Harness support treadmill', 'Orthotic station']
    },
    {
      id: 'fac-4',
      title: 'Multi-Sensory Lounge',
      category: 'Sensory Gym',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      description: 'Calming sensory haven with color-changing bubble tubes, fiber optics, and soothing sound.',
      features: ['Bubble tubes', 'Tactile fiber optics', 'Aromatherapy', 'Vibroacoustic mattress']
    },
    {
      id: 'fac-5',
      title: 'Family Observation Lounge',
      category: 'Family Space',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      description: 'Comfortable parent lounge with one-way observation glass and live session monitors.',
      features: ['One-way observation', 'Live session monitors', 'Parent tea bar', 'Sibling play corner']
    },
    {
      id: 'fac-6',
      title: 'Daily Living Skills Suite',
      category: 'Motor Room',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
      description: 'Simulated home environment for independent living: dressing, buttoning, and food prep.',
      features: ['Adaptive utensils', 'Zipper practice boards', 'Low-stimulation lighting', 'Adaptive seating']
    }
  ];

  const categories = ['All', 'Sensory Gym', 'Speech Pod', 'Motor Room', 'Family Space'];

  const filteredItems = filter === 'All'
    ? facilityItems
    : facilityItems.filter((i) => i.category === filter);

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Facility
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Sensory Rooms & Facility Tour
        </h1>
        <p className="text-base text-slate-600 leading-relaxed mt-2">
          Designed to minimize sensory overload while fostering movement, play, and communication.
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
