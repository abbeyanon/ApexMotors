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
  const { vehicles, setFilters, setIsTestDriveModalOpen, setIsTradeInModalOpen, theme } = useDealership();

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
    <div className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-dark-950 transition-colors">
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Car Showroom"
          className="w-full h-full object-cover object-center opacity-15 dark:opacity-30 filter brightness-95 dark:brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 dark:from-dark-950 dark:via-dark-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent dark:from-dark-950 dark:via-dark-950/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 py-12 lg:py-20 w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-in fade-in duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nairobi's Most Trusted Automotive Dealership</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>150-Point Technical Inspection on Every Car</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Find Your Next Car <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500">
              With Absolute Confidence.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Quality verified Japanese and European imports. Competitive market pricing, flexible bank asset financing, and transparent trade-in valuations.
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
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-dark-850 hover:bg-slate-50 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold shadow-sm transition hover:text-brand-600"
            >
              Sell / Trade Your Car
            </button>
            <button
              onClick={() => setIsTestDriveModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-dark-850 hover:bg-slate-50 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold shadow-sm transition hover:text-brand-600"
            >
              Book a Test Drive
            </button>
          </div>
        </div>

        {/* Multi-Parameter Search Card */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <SlidersHorizontal className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Search Showroom Inventory</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {vehicles.length} Vehicles In Stock Across 3 Showrooms
            </span>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Make */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Make / Brand
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Makes (Toyota, Mercedes...)</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Body Style
                </label>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Body Styles (SUV, Sedan...)</option>
                  {bodyTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Budget */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Max Budget
                </label>
                <select
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">Any Budget</option>
                  <option value="2000000">Under KES 2.0M</option>
                  <option value="3000000">Under KES 3.0M</option>
                  <option value="4500000">Under KES 4.5M</option>
                  <option value="6000000">Under KES 6.0M</option>
                  <option value="9000000">Under KES 9.0M</option>
                  <option value="15000000">Under KES 15.0M</option>
                </select>
              </div>

              {/* Min Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Min Year
                </label>
                <select
                  value={selectedMinYear}
                  onChange={(e) => setSelectedMinYear(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">Any Year</option>
                  <option value="2022">2022 or Newer</option>
                  <option value="2020">2020 or Newer</option>
                  <option value="2018">2018 or Newer</option>
                  <option value="2016">2016 or Newer</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Fuel Type
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  Transmission
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map((tr) => (
                    <option key={tr} value={tr}>
                      {tr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>All vehicles certified with verified JEVIC mileage & NTSA logbooks</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Search {vehicles.length} Vehicles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
