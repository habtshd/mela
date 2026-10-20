import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, MapPin, Search, ArrowRight, ShieldCheck, 
  Award, TrendingUp, Sparkles, CheckCircle2, ChevronRight, Play, 
  X, Filter, Bed, Bath, Maximize2, ExternalLink, Calendar, 
  Clock, Share2, Compass, Layers, Plane, Heart, ArrowUpRight,
  Sun, Droplets, Zap, Shield, Check, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Authentic Tsehay Real Estate (Poli Lotus International Center, CMC Addis Ababa)
export interface Property {
  id: string;
  title: string;
  subTitle: string;
  location: string;
  corridor: 'lotus-towers' | 'penthouses' | 'commercial' | 'two-bed';
  bedrooms: number;
  bathrooms: number;
  area: number; // m2
  price: string;
  status: 'Ready for Occupancy' | 'Immediate Handover' | 'Available for Resale/Lease' | 'Prime Commercial';
  tag: string;
  image: string;
  highlight: string;
}

const TSEHAY_PROPERTIES: Property[] = [
  {
    id: 'tsehay-2bed-lotus',
    title: 'Tsehay Lotus 2-Bedroom Luxury Suite',
    subTitle: 'Thoughtful Modern Layout in the Landmark CMC Compound',
    location: 'CMC Roundabout, Yeka Sub-City, Addis Ababa',
    corridor: 'two-bed',
    bedrooms: 2,
    bathrooms: 2,
    area: 114,
    price: 'ETB 14,800,000 / Inquire',
    status: 'Ready for Occupancy',
    tag: 'CMC Landmark',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Master en-suite, spacious balcony with mountain views, separate laundry room & 1 basement parking spot',
  },
  {
    id: 'tsehay-3bed-executive',
    title: 'Tsehay Lotus 3-Bedroom Executive Residence',
    subTitle: 'Spacious Family Living with Maid Quarters & Panoramic Views',
    location: 'Poli Lotus Towers, CMC Main Axis',
    corridor: 'lotus-towers',
    bedrooms: 3,
    bathrooms: 3,
    area: 144,
    price: 'ETB 18,500,000 / Inquire',
    status: 'Immediate Handover',
    tag: 'Family Favorite',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Only 4 units per floor, high-speed dual elevators, expansive living room & fully fitted kitchen',
  },
  {
    id: 'tsehay-3bed-grand',
    title: 'Tsehay Blooming Lotus Grand 3-Bedroom',
    subTitle: 'Corner Residence with Dual Aspect Sunshine & City Vista',
    location: 'Tower 4, Tsehay Real Estate, CMC',
    corridor: 'lotus-towers',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 165,
    price: 'ETB 21,200,000 / Inquire',
    status: 'Ready for Occupancy',
    tag: 'Premium Floor',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Generous private foyer, imported European porcelain tiles, dedicated maid quarters & store room',
  },
  {
    id: 'tsehay-royal-penthouse',
    title: 'Tsehay Skyline Presidential Penthouse',
    subTitle: 'Top-Floor Duplex Penthouse Overlooking Yeka & Entoto Hills',
    location: 'Top Floor, Central Lotus Tower, CMC',
    corridor: 'penthouses',
    bedrooms: 4,
    bathrooms: 4.5,
    area: 245,
    price: 'Price on Request',
    status: 'Available for Resale/Lease',
    tag: 'Skyline Penthouse',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    highlight: '360° wrap-around terrace, private elevator access key, smart home provisions & 2 parking stalls',
  },
  {
    id: 'tsehay-commercial-podium',
    title: 'Poli Lotus Commercial Plaza Retail Units',
    subTitle: 'Ground-Floor High-Footfall Commercial & Banking Hall',
    location: 'Tsehay Commercial Arcade, CMC Road Frontage',
    corridor: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 130,
    price: 'Price on Request',
    status: 'Prime Commercial',
    tag: 'Commercial Retail',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Direct main-road frontage on CMC highway, heavy pedestrian footfall, 24/7 security & customer parking',
  },
  {
    id: 'tsehay-2bed-garden',
    title: 'Tsehay Lotus 2-Bedroom Courtyard Suite',
    subTitle: 'Tranquil View of the Landscaped Central Lotus Plaza',
    location: 'Tower 2, Tsehay Real Estate, CMC',
    corridor: 'two-bed',
    bedrooms: 2,
    bathrooms: 2,
    area: 122,
    price: 'ETB 15,900,000 / Inquire',
    status: 'Immediate Handover',
    tag: 'Courtyard View',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Overlooks the protected internal green courtyards, ideal for families with young children and seniors',
  }
];

const TSEHAY_MASTER_FEATURES = [
  { 
    title: 'The Blooming Lotus Masterplan', 
    desc: 'Iconic radial architecture inspired by a blooming lotus flower, maximizing natural sunlight and ventilation.', 
    icon: Sun,
    stat: '15 Storeys' 
  },
  { 
    title: 'Independent Water Reservoirs', 
    desc: 'Self-sufficient deep underground wells and on-site water treatment plant ensure 24/7 uninterrupted water supply.', 
    icon: Droplets,
    stat: '100% Water Security' 
  },
  { 
    title: 'Heavy Industrial Backup Generators', 
    desc: 'High-capacity synchronized diesel generators power both elevators and full apartment interiors during municipal outages.', 
    icon: Zap,
    stat: '24/7 Zero Downtime' 
  },
  { 
    title: 'Low Density: 4 Units Per Floor', 
    desc: 'Engineered for true exclusivity and peace. Only four residences per floor with 2 high-speed passenger elevators.', 
    icon: Shield,
    stat: 'Maximum Privacy' 
  },
  { 
    title: 'Strategic CMC Roundabout Hub', 
    desc: 'Located directly at the CMC nexus with immediate access to the Addis Ababa Light Rail (LRT) and premier schools.', 
    icon: MapPin,
    stat: 'CMC & Ayat Axis' 
  },
  { 
    title: 'Vibrant Self-Contained City', 
    desc: 'Enjoy on-site supermarkets, international cafes, banking halls, fitness center, and gated compound security.', 
    icon: Building2,
    stat: 'Gated Community' 
  },
];

export function RealEstatePage() {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');
  const [selectedBeds, setSelectedBeds] = useState<string>('all');
  const [searchLocation, setSearchLocation] = useState<string>('all');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);

  // Filter listings
  const filteredProperties = TSEHAY_PROPERTIES.filter(p => {
    if (selectedCorridor !== 'all' && p.corridor !== selectedCorridor) return false;
    if (selectedBeds !== 'all' && p.bedrooms.toString() !== selectedBeds) return false;
    return true;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleInquire = (property: Property) => {
    setSelectedProperty(property);
    setInquiryModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#B38E1B] selection:text-white">
      
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div className="bg-[#FAF8F2] border-b border-amber-900/10 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Amharic + English Ticker */}
          <div className="flex items-center gap-3 overflow-hidden text-slate-700">
            <span className="bg-[#B38E1B] text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded shadow-sm">
              ፀሐይ ሪል እስቴት
            </span>
            <span className="truncate text-xs font-medium">
              በሲኤምሲ አደባባይ የሚገኘው ፖሊ ሎተስ ዓለም አቀፍ ማዕከል | Tsehay Real Estate Poli Lotus International Center, CMC Addis Ababa
            </span>
          </div>

          {/* Contact Direct Hotlines */}
          <div className="flex items-center gap-4 text-slate-700 divide-x divide-slate-200">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-500 font-medium">Sales Hotline:</span>
              <a href="tel:+251944094426" className="text-[#997B1A] font-bold tracking-wide hover:underline flex items-center gap-1">
                📞 +251 944 09 44 26
              </a>
            </div>
            <div className="pl-4 hidden sm:flex items-center gap-2">
              <a href="tel:+251925274427" className="hover:text-[#997B1A] transition font-medium">
                +251 925 27 44 27
              </a>
            </div>
            <div className="pl-4 flex items-center gap-2 text-blue-700">
              <ExternalLink className="w-3.5 h-3.5" />
              <a 
                href="https://www.facebook.com/TsehayRealEstateeth/" 
                target="_blank" 
                rel="noreferrer"
                className="font-semibold text-[11px] hover:underline"
              >
                Official Facebook Page
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION (WHITE MODE) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          {/* Tsehay Real Estate Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#B38E1B] to-[#8C6D14] flex items-center justify-center shadow-md shadow-amber-500/20 font-display font-black text-white text-2xl tracking-tighter group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-display font-extrabold text-xl tracking-wide text-slate-900 uppercase flex items-center gap-1.5">
                Tsehay <span className="text-[#B38E1B]">Real Estate</span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-slate-500 font-bold -mt-0.5">
                Poli Lotus Center • CMC, Addis Ababa
              </p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#apartments" className="text-[#997B1A] hover:text-[#7A6112] transition">Apartments & Suites</a>
            <a href="#features" className="hover:text-slate-900 transition">Compound Features</a>
            <a href="#location" className="hover:text-slate-900 transition">CMC Location</a>
            <a href="#facebook-feed" className="hover:text-blue-700 transition flex items-center gap-1.5">
              <span>Facebook Updates</span>
              <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold border border-blue-200">Verified</span>
            </a>
            <a href="#contact" className="hover:text-slate-900 transition">Contact Sales</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:+251944094426"
              className="hidden sm:flex items-center gap-2 border border-[#B38E1B]/40 hover:border-[#B38E1B] px-3.5 py-2 rounded-xl text-xs font-bold text-[#997B1A] transition bg-[#B38E1B]/10 hover:bg-[#B38E1B]/15"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +251 944 09 44 26</span>
            </a>
            <button
              onClick={() => handleInquire(TSEHAY_PROPERTIES[0])}
              className="bg-[#B38E1B] hover:bg-[#997B1A] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-[#B38E1B]/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Schedule Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION (TSEHAY POLI LOTUS LUXURY) */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-white to-white border-b border-slate-200">
        
        {/* Background Architecture Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80" 
            alt="Tsehay Real Estate Poli Lotus Towers CMC"
            className="w-full h-full object-cover object-center scale-105 opacity-20 filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-16 text-center">
          
          <div className="inline-flex items-center gap-2 bg-[#B38E1B]/10 border border-[#B38E1B]/30 text-[#8C6D14] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <Sun className="w-3.5 h-3.5 text-[#B38E1B]" />
            <span>Poli Lotus International Center • CMC Roundabout, Addis Ababa</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 uppercase leading-[1.08] mb-6">
            Tsehay Real Estate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-amber-800 to-[#B38E1B]">
              Life In The Blooming Lotus
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg mb-8 leading-relaxed font-normal">
            Welcome to Addis Ababa's most celebrated vertical community. 13-15 storey European-quality towers situated at the <strong className="text-slate-900 font-semibold">CMC Roundabout</strong>, boasting complete water independence, high-capacity backup generators, and only 4 apartments per floor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="#apartments"
              className="bg-[#B38E1B] hover:bg-[#997B1A] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#B38E1B]/30 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2"
            >
              <span>Explore Available Residences</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a 
              href="https://www.facebook.com/TsehayRealEstateeth/"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3.5 rounded-xl shadow-sm transition text-sm sm:text-base font-bold flex items-center gap-2 group"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition font-bold text-xs">
                f
              </div>
              <span>Visit Official Facebook</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200 text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#B38E1B] font-display">15</div>
              <div className="text-xs text-slate-500 font-medium">Storey High-Rise Towers</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-display">4 Units</div>
              <div className="text-xs text-slate-500 font-medium">Per Floor (Low Density)</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-2xl lg:text-3xl font-extrabold text-emerald-600 font-display">100%</div>
              <div className="text-xs text-slate-500 font-medium">Independent Water Wells</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-600 font-display">CMC</div>
              <div className="text-xs text-slate-500 font-medium">Roundabout Prime Hub</div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. REAL ESTATE MULTI-CRITERIA SEARCH FILTER TOOLBAR */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 p-5 lg:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Filter className="w-4 h-4 text-[#B38E1B]" />
              <span>Search Tsehay Real Estate Residences</span>
            </div>
            <span className="text-xs text-[#8C6D14] bg-[#B38E1B]/10 px-3 py-1 rounded-full font-bold">
              Showing {filteredProperties.length} Available Units in CMC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Bedrooms Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                Bedrooms
              </label>
              <select 
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:border-[#B38E1B] focus:bg-white focus:outline-none transition shadow-sm font-medium"
              >
                <option value="all">Any Layout</option>
                <option value="2">2 Bedrooms (114 m² - 122 m²)</option>
                <option value="3">3 Bedrooms (144 m² - 165 m²)</option>
                <option value="4">4 Bedrooms (Penthouse 245 m²)</option>
                <option value="0">Commercial Arcade Units</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                Unit Class
              </label>
              <select 
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:border-[#B38E1B] focus:bg-white focus:outline-none transition shadow-sm font-medium"
              >
                <option value="all">All Unit Types</option>
                <option value="two-bed">2-Bedroom Luxury Suites</option>
                <option value="lotus-towers">3-Bedroom Executive Residences</option>
                <option value="penthouses">Presidential Penthouses</option>
                <option value="commercial">Commercial & Retail Podium</option>
              </select>
            </div>

            {/* Handover Status */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                Compound Location
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:border-[#B38E1B] focus:bg-white focus:outline-none transition shadow-sm font-medium">
                <option>Poli Lotus Towers (CMC Roundabout)</option>
                <option>Central Lotus Radial Plaza</option>
                <option>Commercial Frontage Arcade</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="flex items-end">
              <a 
                href="#apartments"
                className="w-full bg-[#B38E1B] hover:bg-[#997B1A] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-[#B38E1B]/20"
              >
                <Search className="w-4 h-4" />
                <span>Search Listings</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 5. APARTMENTS LISTINGS (WHITE LUXURY CARDS) */}
      <section id="apartments" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#997B1A] mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#B38E1B]"></span>
              <span>Available Units in Poli Lotus CMC</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
              Featured Apartments
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Spacious 2-bedroom, 3-bedroom, and penthouse layouts with individual title deeds, high rental yields, and verified maintenance standards.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Units' },
              { id: 'two-bed', label: '2-Bed (114-122 m²)' },
              { id: 'lotus-towers', label: '3-Bed Executive' },
              { id: 'penthouses', label: 'Penthouses' },
              { id: 'commercial', label: 'Commercial' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCorridor(tab.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition ${
                  selectedCorridor === tab.id 
                    ? 'bg-[#B38E1B] text-white shadow-md shadow-[#B38E1B]/25' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProperties.map(property => {
            const isFav = savedFavorites.includes(property.id);
            return (
              <div 
                key={property.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#B38E1B] transition-all duration-300 hover:shadow-xl shadow-sm flex flex-col"
              >
                {/* Image & Tags */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/20" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#B38E1B] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                      {property.tag}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded border border-white/20">
                      {property.status}
                    </span>
                  </div>

                  {/* Favorite Toggle */}
                  <button 
                    onClick={(e) => toggleFavorite(property.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Location Pin overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-semibold drop-shadow">{property.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#997B1A] transition mb-1 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {property.highlight}
                    </p>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#B38E1B]" />
                        <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#B38E1B]" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#B38E1B]" />
                        <span>{property.area} m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="pt-4 mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Estimated Price</div>
                      <div className="text-sm font-extrabold text-[#997B1A]">{property.price}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href="tel:+251944094426"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-[#B38E1B]/10 text-slate-600 hover:text-[#997B1A] border border-slate-200 transition"
                        title="Call +251 944 09 44 26"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleInquire(property)}
                        className="bg-[#B38E1B] hover:bg-[#997B1A] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1 shadow-sm"
                      >
                        <span>Inquire</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 6. COMPOUND ADVANTAGES & FEATURES (TSEHAY USPs) */}
      <section id="features" className="bg-[#FAF8F3] border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#997B1A] mb-2">
              Why Homeowners Choose Tsehay CMC
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
              The Tsehay Living Standard
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Addis Ababa's gold standard in residential security, water independence, and master-planned urban architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TSEHAY_MASTER_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#B38E1B] transition group shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#B38E1B]/10 text-[#997B1A] flex items-center justify-center group-hover:scale-110 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#8C6D14] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      {feat.stat}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-[#997B1A] transition">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. OFFICIAL FACEBOOK INTEGRATION & SOCIAL PROOF */}
      <section id="facebook-feed" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-white to-blue-50/70 p-8 lg:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4 border border-blue-200">
                <span>Official Facebook Community</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-3">
                Connect Directly With Tsehay Real Estate on Facebook
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Stay updated with the latest unit resales, rental openings, compound maintenance announcements, and site walkthrough videos directly posted by our on-site team at CMC.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>facebook.com/TsehayRealEstateeth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Official On-Site Sales Office</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Instant Messenger Support</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right shrink-0">
              <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-2">
                  f
                </div>
                <div className="font-bold text-slate-900 text-base">Tsehay Real Estate</div>
                <div className="text-xs text-slate-500 mb-4">Official Community Page</div>
                <a
                  href="https://www.facebook.com/TsehayRealEstateeth/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Open Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCATION (CMC ROUNDABOUT) & CONTACT SECTION */}
      <section id="contact" className="bg-[#FAF8F3] border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Side */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#997B1A] mb-2">
                  CMC Sales & Management Office
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight mb-4">
                  Visit Our Compound at CMC
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Schedule a private tour of available 2-bedroom, 3-bedroom, and penthouse units. Our compound advisors are on-site daily at the CMC roundabout.
                </p>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B38E1B]/10 text-[#997B1A] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Compound Address</div>
                      <div className="text-xs text-slate-500">
                        Poli Lotus International Center, CMC Roundabout, Yeka Sub-City, Addis Ababa, Ethiopia
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B38E1B]/10 text-[#997B1A] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Direct Phone Numbers</div>
                      <div className="text-xs text-slate-500">
                        <a href="tel:+251944094426" className="text-[#997B1A] font-bold">+251 944 09 44 26</a> / <a href="tel:+251925274427" className="text-[#997B1A] font-bold">+251 925 27 44 27</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B38E1B]/10 text-[#997B1A] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Visiting Hours</div>
                      <div className="text-xs text-slate-500">
                        Monday – Saturday: 8:30 AM – 5:30 PM (Sunday by appointment)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <div className="text-xs uppercase font-extrabold text-[#997B1A] tracking-wider mb-1">
                  On-Site Assistance
                </div>
                <div className="text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                  <span>Call</span>
                  <span className="text-[#997B1A] underline decoration-[#B38E1B]">+251 944 09 44 26</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Immediate inquiries for unit purchasing, leasing, and title deed transfer.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                Inquire or Schedule a VIP Tour
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out your details below and our compound sales officer will get back to you within 2 hours.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#B38E1B]/10 border border-[#B38E1B] text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-[#B38E1B] mx-auto mb-3" />
                  <h4 className="font-bold text-lg text-slate-900">Inquiry Received!</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    Thank you. A Tsehay Real Estate sales officer will contact you via phone or WhatsApp to confirm your site visit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-600 mb-1.5">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Solomon Hailu"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-600 mb-1.5">
                        Phone Number (WhatsApp) *
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+251 9... or Diaspora phone"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-600 mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-600 mb-1.5">
                        Preferred Unit Layout
                      </label>
                      <select className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#B38E1B] focus:bg-white focus:outline-none transition">
                        <option>2-Bedroom Luxury Suite (114 m²)</option>
                        <option>3-Bedroom Executive Residence (144 m²)</option>
                        <option>3-Bedroom Grand Lotus (165 m²)</option>
                        <option>Skyline Presidential Penthouse (245 m²)</option>
                        <option>Commercial Frontage Arcade</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-600 mb-1.5">
                      Your Message or Viewing Date
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Let us know your preferred viewing date or questions regarding unit availability, title deeds, and financing options."
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#B38E1B] hover:bg-[#997B1A] text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B38E1B]/25"
                  >
                    <span>Submit Inquiry to Tsehay Sales Office</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 9. LUXURY FOOTER (TSEHAY REAL ESTATE ADDIS ABABA) */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#B38E1B] flex items-center justify-center font-display font-extrabold text-white text-lg">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wide uppercase">
                Tsehay <span className="text-[#D4AF37]">Real Estate</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-4">
              Poli Lotus International Center (ፀሐይ ሪል እስቴት) is one of Addis Ababa’s premier high-rise residential developments, situated directly at the CMC roundabout in Yeka Sub-City.
            </p>
            <div className="text-slate-300 space-y-1">
              <div>📍 CMC Roundabout, Yeka Sub-City, Addis Ababa, Ethiopia</div>
              <div>📞 Phone: +251 944 09 44 26 / +251 925 27 44 27</div>
              <div>🌐 Facebook: facebook.com/TsehayRealEstateeth</div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider mb-4">
              Apartment Classes
            </h4>
            <ul className="space-y-2">
              <li><a href="#apartments" className="hover:text-[#D4AF37] transition">2-Bedroom Suites (114 m²)</a></li>
              <li><a href="#apartments" className="hover:text-[#D4AF37] transition">3-Bedroom Executive (144 m²)</a></li>
              <li><a href="#apartments" className="hover:text-[#D4AF37] transition">Corner Grand Units (165 m²)</a></li>
              <li><a href="#apartments" className="hover:text-[#D4AF37] transition">Skyline Penthouses</a></li>
              <li><a href="#apartments" className="hover:text-[#D4AF37] transition">Commercial Mall Retail</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider mb-4">
              Compound Highlights
            </h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-[#D4AF37] transition">Blooming Lotus Layout</a></li>
              <li><a href="#features" className="hover:text-[#D4AF37] transition">Independent Deep Wells</a></li>
              <li><a href="#features" className="hover:text-[#D4AF37] transition">Dual Industrial Generators</a></li>
              <li><a href="#features" className="hover:text-[#D4AF37] transition">4 Units Per Floor</a></li>
              <li><a href="#features" className="hover:text-[#D4AF37] transition">Basement Parking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider mb-4">
              Official Channels
            </h4>
            <div className="space-y-3">
              <a href="https://www.facebook.com/TsehayRealEstateeth/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
                <span>Facebook Page</span>
                <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
              </a>
              <a href="tel:+251944094426" className="flex items-center gap-2 hover:text-white transition">
                <span>Sales: +251 944 09 44 26</span>
                <Phone className="w-3 h-3 text-[#D4AF37]" />
              </a>
              <a href="tel:+251925274427" className="flex items-center gap-2 hover:text-white transition">
                <span>Support: +251 925 27 44 27</span>
                <Phone className="w-3 h-3 text-[#D4AF37]" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} Tsehay Real Estate PLC (Poli Lotus International Center). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/TsehayRealEstateeth/" target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline font-semibold">
              Facebook: @TsehayRealEstateeth
            </a>
            <a href="#apartments" className="hover:text-slate-300 transition">CMC Addis Ababa</a>
          </div>
        </div>
      </footer>

      {/* 10. INQUIRY / SCHEDULE VIEWING MODAL (WHITE THEME) */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-extrabold text-[#997B1A] uppercase tracking-wider mb-1">
              Tsehay Real Estate CMC Tour
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
              {selectedProperty ? selectedProperty.title : 'Inquire About Residence'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {selectedProperty?.location} • {selectedProperty?.area} m² • {selectedProperty?.bedrooms} Bed
            </p>

            {formSubmitted ? (
              <div className="p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#B38E1B] mx-auto mb-2" />
                <h4 className="font-bold text-slate-900">Viewing Request Logged</h4>
                <p className="text-xs text-slate-500 mt-1">Our sales office will contact you via WhatsApp or phone shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase text-slate-600 font-bold mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Almaz Tadesse" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-slate-600 font-bold mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+251 9... or Diaspora phone" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-slate-600 font-bold mb-1">
                    Preferred Visiting Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#B38E1B] focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a 
                    href="tel:+251944094426"
                    className="flex-1 border border-[#B38E1B]/40 text-[#997B1A] py-2.5 rounded-xl text-xs font-bold text-center hover:bg-[#B38E1B]/10 transition"
                  >
                    Direct: +251 944 09 44 26
                  </a>
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#B38E1B] hover:bg-[#997B1A] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-[#B38E1B]/25"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 11. FLOATING QUICK HOTLINE WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <a 
          href="https://www.facebook.com/TsehayRealEstateeth/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 text-xs"
        >
          <span>Facebook</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a 
          href="tel:+251944094426" 
          className="group flex items-center gap-2.5 bg-[#B38E1B] hover:bg-[#997B1A] text-white font-extrabold px-4 py-3 rounded-full shadow-lg shadow-[#B38E1B]/35 transition-transform hover:scale-105"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span className="text-xs uppercase tracking-wider font-display">+251 944 09 44 26</span>
        </a>
      </div>

    </div>
  );
}
