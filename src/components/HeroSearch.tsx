import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Search,
  SlidersHorizontal,
  Car,
  Calendar,
  DollarSign,
  Fuel,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, filters, setFilters, setIsTestDriveModalOpen, setIsTradeInModalOpen } = useDealership();

  // Distinct values for dropdowns
  const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
  const bodyTypes = Array.from(new Set(vehicles.map((v) => v.bodyType))).sort();
  const fuelTypes = Array.from(new Set(vehicles.map((v) => v.fuelType))).sort();
  const transmissions = Array.from(new Set(vehicles.map((v) => v.transmission))).sort();

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | ''>('');
  const [selectedMinYear, setSelectedMinYear] = useState<number | ''>('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      make: selectedMake,
      bodyType: selectedBodyType,
      maxPrice: selectedMaxPrice,
      minYear: selectedMinYear,
      fuelType: selectedFuel,
      transmission: selectedTransmission
    }));
    navigate('/inventory');
  };

  return (
    <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-dark-950">
      {/* Background Media & Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Car Showroom"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-90 scale-105 transform animate-pulse duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 py-16 lg:py-24 w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nairobi's Most Trusted Automotive Dealership</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>150-Point Technical Inspection on Every Car</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            Find Your Next Car <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-cyan-400">
              With Absolute Confidence.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Quality verified vehicles. Competitive market pricing. 100% clean documentation, flexible bank asset financing, and transparent trade-ins.
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button
              onClick={() => navigate('/inventory')}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-glow transition transform hover:-translate-y-0.5"
            >
              Browse All Cars ({vehicles.length})
            </button>
            <button
              onClick={() => setIsTradeInModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 text-sm font-semibold transition hover:text-white"
            >
              Sell / Trade Your Car
            </button>
            <button
              onClick={() => setIsTestDriveModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 text-sm font-semibold transition hover:text-white"
            >
              Book a Test Drive
            </button>
            <button
              onClick={() => navigate('/financing')}
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 text-sm font-semibold transition hover:text-white"
            >
              Get Asset Financing
            </button>
          </div>
        </div>

        {/* Advanced Vehicle Search Bar Widget (Requirement #3) */}
        <div className="max-w-5xl mx-auto bg-dark-900/90 backdrop-blur-xl border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Make */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Makes (Toyota, Benz...)</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Body Type
                </label>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Body Types</option>
                  {bodyTypes.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Budget / Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Max Budget
                </label>
                <select
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">Any Budget</option>
                  <option value="2000000">Under KES 2.0 Million</option>
                  <option value="3000000">Under KES 3.0 Million</option>
                  <option value="4000000">Under KES 4.0 Million</option>
                  <option value="6000000">Under KES 6.0 Million</option>
                  <option value="10000000">Under KES 10.0 Million</option>
                </select>
              </div>

              {/* Min Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Min Year
                </label>
                <select
                  value={selectedMinYear}
                  onChange={(e) => setSelectedMinYear(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">Any Year</option>
                  <option value="2018">2018 or newer</option>
                  <option value="2019">2019 or newer</option>
                  <option value="2020">2020 or newer</option>
                  <option value="2021">2021 or newer</option>
                  <option value="2022">2022 or newer</option>
                </select>
              </div>
            </div>

            {/* Bottom Row with Transmission, Fuel, and Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="font-medium text-slate-300">Quick Searches:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMake('Toyota');
                    setSelectedBodyType('SUV');
                  }}
                  className="hover:text-brand-400 transition"
                >
                  • Toyota SUVs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFuel('Hybrid');
                  }}
                  className="hover:text-brand-400 transition"
                >
                  • Hybrids
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMake('Mercedes-Benz');
                  }}
                  className="hover:text-brand-400 transition"
                >
                  • Mercedes-Benz
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMaxPrice(3000000);
                  }}
                  className="hover:text-brand-400 transition"
                >
                  • Under 3M
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow transition transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Search Vehicles</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
