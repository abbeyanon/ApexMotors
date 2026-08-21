import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { VehicleCard } from '../components/VehicleCard';
import {
  Filter,
  SlidersHorizontal,
  Search,
  Grid,
  List,
  RotateCcw,
  Sparkles,
  Car,
  ChevronDown,
  X,
  Zap,
  ShieldCheck,
  Building2,
  Check
} from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { vehicles, filters, setFilters, resetFilters, formatPrice, locations } = useDealership();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params with state filters if present
  useEffect(() => {
    const makeParam = searchParams.get('make');
    const bodyParam = searchParams.get('bodyType');
    const badgeParam = searchParams.get('badge');

    if (makeParam) setFilters((prev) => ({ ...prev, make: makeParam }));
    if (bodyParam) setFilters((prev) => ({ ...prev, bodyType: bodyParam }));
    if (badgeParam === 'featured') setFilters((prev) => ({ ...prev, isFeatured: true }));
    if (badgeParam === 'new') setFilters((prev) => ({ ...prev, isNewArrival: true }));
  }, [searchParams, setFilters]);

  // Unique options for filter selects
  const makes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.make))).sort(), [vehicles]);
  const models = useMemo(() => {
    const filteredByMake = filters.make ? vehicles.filter((v) => v.make === filters.make) : vehicles;
    return Array.from(new Set(filteredByMake.map((v) => v.model))).sort();
  }, [vehicles, filters.make]);
  const bodyTypes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.bodyType))).sort(), [vehicles]);
  const fuelTypes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.fuelType))).sort(), [vehicles]);
  const transmissions = useMemo(() => Array.from(new Set(vehicles.map((v) => v.transmission))).sort(), [vehicles]);
  const conditions = useMemo(() => Array.from(new Set(vehicles.map((v) => v.condition))).sort(), [vehicles]);

  // Filter & Sort Pipeline
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const match =
            v.make.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.variant.toLowerCase().includes(q) ||
            v.stockNo.toLowerCase().includes(q) ||
            v.year.toString().includes(q) ||
            v.bodyType.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (filters.make && v.make !== filters.make) return false;
        if (filters.model && v.model !== filters.model) return false;
        if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
        if (filters.fuelType && v.fuelType !== filters.fuelType) return false;
        if (filters.transmission && v.transmission !== filters.transmission) return false;
        if (filters.condition && v.condition !== filters.condition) return false;
        if (filters.locationYard && v.locationYard !== filters.locationYard) return false;

        if (filters.minPrice !== '' && v.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice !== '' && v.price > Number(filters.maxPrice)) return false;

        if (filters.minYear !== '' && v.year < Number(filters.minYear)) return false;
        if (filters.maxYear !== '' && v.year > Number(filters.maxYear)) return false;

        if (filters.maxMileage !== '' && v.mileage > Number(filters.maxMileage)) return false;

        if (filters.isFeatured && !v.isFeatured) return false;
        if (filters.isNewArrival && !v.isNewArrival) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_asc') return a.price - b.price;
        if (filters.sortBy === 'price_desc') return b.price - a.price;
        if (filters.sortBy === 'year_desc') return b.year - a.year;
        if (filters.sortBy === 'mileage_asc') return a.mileage - b.mileage;
        if (filters.sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
        if (filters.sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [vehicles, filters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.bodyType) count++;
    if (filters.fuelType) count++;
    if (filters.transmission) count++;
    if (filters.condition) count++;
    if (filters.locationYard) count++;
    if (filters.minPrice !== '' || filters.maxPrice !== '') count++;
    if (filters.minYear !== '' || filters.maxYear !== '') count++;
    if (filters.maxMileage !== '') count++;
    if (filters.isFeatured) count++;
    if (filters.isNewArrival) count++;
    return count;
  }, [filters]);

  // Quick Marketplace Quick-Chips
  const quickPills = [
    { label: 'All Stock', active: !filters.make && !filters.bodyType && !filters.fuelType && !filters.maxPrice, onClick: resetFilters },
    { label: '🚙 SUVs & 4x4s', active: filters.bodyType === 'SUV', onClick: () => setFilters((p) => ({ ...p, bodyType: p.bodyType === 'SUV' ? '' : 'SUV' })) },
    { label: '🏎️ Sedans', active: filters.bodyType === 'Sedan', onClick: () => setFilters((p) => ({ ...p, bodyType: p.bodyType === 'Sedan' ? '' : 'Sedan' })) },
    { label: '⭐ Toyota', active: filters.make === 'Toyota', onClick: () => setFilters((p) => ({ ...p, make: p.make === 'Toyota' ? '' : 'Toyota' })) },
    { label: '✨ Mercedes-Benz', active: filters.make === 'Mercedes-Benz', onClick: () => setFilters((p) => ({ ...p, make: p.make === 'Mercedes-Benz' ? '' : 'Mercedes-Benz' })) },
    { label: '⚡ Hybrid Cars', active: filters.fuelType === 'Hybrid', onClick: () => setFilters((p) => ({ ...p, fuelType: p.fuelType === 'Hybrid' ? '' : 'Hybrid' })) },
    { label: '💰 Under KES 3M', active: filters.maxPrice === 3000000, onClick: () => setFilters((p) => ({ ...p, maxPrice: p.maxPrice === 3000000 ? '' : 3000000 })) },
    { label: '💎 Luxury 5M+', active: filters.minPrice === 5000000, onClick: () => setFilters((p) => ({ ...p, minPrice: p.minPrice === 5000000 ? '' : 5000000 })) },
    { label: '📍 Ngong Rd HQ', active: filters.locationYard === 'Main Yard & Headquarters', onClick: () => setFilters((p) => ({ ...p, locationYard: p.locationYard === 'Main Yard & Headquarters' ? '' : 'Main Yard & Headquarters' })) },
    { label: '📍 Kiambu Rd', active: filters.locationYard === 'Kiambu Road Luxury Showroom', onClick: () => setFilters((p) => ({ ...p, locationYard: p.locationYard === 'Kiambu Road Luxury Showroom' ? '' : 'Kiambu Road Luxury Showroom' })) }
  ];

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-400" />
          <h3 className="font-bold text-sm text-white">Filter Marketplace</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-brand-600 text-white text-xs font-mono font-bold">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Make / Manufacturer
        </label>
        <select
          value={filters.make}
          onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value, model: '' }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Makes (Toyota, Benz...)</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Model
        </label>
        <select
          value={filters.model}
          disabled={!filters.make && models.length > 20}
          onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 disabled:opacity-50"
        >
          <option value="">All Models</option>
          {models.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Max Price ({formatPrice(filters.maxPrice || 15000000)})
        </label>
        <select
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : '' }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">Any Price</option>
          <option value="2000000">Under KES 2,000,000</option>
          <option value="3000000">Under KES 3,000,000</option>
          <option value="4500000">Under KES 4,500,000</option>
          <option value="6000000">Under KES 6,000,000</option>
          <option value="9000000">Under KES 9,000,000</option>
          <option value="15000000">Under KES 15,000,000</option>
        </select>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Body Style
        </label>
        <select
          value={filters.bodyType}
          onChange={(e) => setFilters((prev) => ({ ...prev, bodyType: e.target.value }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Body Styles</option>
          {bodyTypes.map((bt) => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => setFilters((prev) => ({ ...prev, fuelType: e.target.value }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
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
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Transmissions</option>
          {transmissions.map((tr) => (
            <option key={tr} value={tr}>
              {tr}
            </option>
          ))}
        </select>
      </div>

      {/* Showroom Yard */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Showroom Yard
        </label>
        <select
          value={filters.locationYard}
          onChange={(e) => setFilters((prev) => ({ ...prev, locationYard: e.target.value }))}
          className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Showroom Yards</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.isFeatured}
            onChange={(e) => setFilters((prev) => ({ ...prev, isFeatured: e.target.checked }))}
            className="rounded bg-dark-800 border-slate-700 text-brand-500 focus:ring-brand-500"
          />
          <span>Featured Vehicles Only</span>
        </label>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.isNewArrival}
            onChange={(e) => setFilters((prev) => ({ ...prev, isNewArrival: e.target.checked }))}
            className="rounded bg-dark-800 border-slate-700 text-brand-500 focus:ring-brand-500"
          />
          <span>New Arrivals Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-950 py-6 sm:py-10 pb-24 md:pb-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Marketplace Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Marketplace</span> / <span className="text-brand-400 font-semibold">Vehicles in Stock</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Verified Vehicles Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {filteredVehicles.length} vehicles available across 3 Nairobi showroom yards. 100% inspected with clean logbooks.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-glow"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Quick-Filter Scrollable Chips (Marketplace standard) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={pill.onClick}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                pill.active
                  ? 'bg-brand-600 text-white border-brand-500 shadow-glow'
                  : 'bg-dark-900 border-slate-800 text-slate-300 hover:text-white hover:bg-dark-850'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search Bar & Sorting Controls */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search make, model, stock # or feature..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full bg-dark-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 shrink-0 font-medium">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e: any) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                className="bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500 font-medium"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest First</option>
                <option value="mileage_asc">Mileage: Lowest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-dark-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sticky top-28">
              <FilterControls />
            </div>
          </div>

          {/* Right Vehicles Catalog */}
          <div className="lg:col-span-9">
            {filteredVehicles.length === 0 ? (
              <div className="bg-dark-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No Matching Vehicles Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search criteria or resetting filters to view all available yard inventory.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-glow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
              >
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-up Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Filter Cars</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-dark-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterControls />

            <div className="pt-4 border-t border-slate-800 sticky bottom-0 bg-dark-900 pb-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow"
              >
                Show {filteredVehicles.length} Matching Vehicles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
