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

  const quickFilterChips = [
    { label: 'All Stock', active: activeFiltersCount === 0, onClick: resetFilters },
    { label: 'SUVs & 4x4', active: filters.bodyType === 'SUV', onClick: () => setFilters((p) => ({ ...p, bodyType: p.bodyType === 'SUV' ? '' : 'SUV' })) },
    { label: 'Under KES 3.5M', active: filters.maxPrice === 3500000, onClick: () => setFilters((p) => ({ ...p, maxPrice: p.maxPrice === 3500000 ? '' : 3500000 })) },
    { label: 'Toyota Only', active: filters.make === 'Toyota', onClick: () => setFilters((p) => ({ ...p, make: p.make === 'Toyota' ? '' : 'Toyota' })) },
    { label: 'Mercedes-Benz', active: filters.make === 'Mercedes-Benz', onClick: () => setFilters((p) => ({ ...p, make: p.make === 'Mercedes-Benz' ? '' : 'Mercedes-Benz' })) },
    { label: 'Hybrids', active: filters.fuelType === 'Hybrid', onClick: () => setFilters((p) => ({ ...p, fuelType: p.fuelType === 'Hybrid' ? '' : 'Hybrid' })) },
    { label: 'New Arrivals', active: !!filters.isNewArrival, onClick: () => setFilters((p) => ({ ...p, isNewArrival: !p.isNewArrival })) }
  ];

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filter Marketplace</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-brand-600 text-white text-xs font-mono font-bold">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-500 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Make */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Make / Manufacturer
        </label>
        <select
          value={filters.make}
          onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value, model: '' }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
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
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Model
        </label>
        <select
          value={filters.model}
          disabled={!filters.make && models.length > 20}
          onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 disabled:opacity-50"
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
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Max Price ({formatPrice(filters.maxPrice || 15000000)})
        </label>
        <select
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : '' }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
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
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Body Style
        </label>
        <select
          value={filters.bodyType}
          onChange={(e) => setFilters((prev) => ({ ...prev, bodyType: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
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
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => setFilters((prev) => ({ ...prev, fuelType: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Fuels</option>
          {fuelTypes.map((ft) => (
            <option key={ft} value={ft}>
              {ft}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Transmission
        </label>
        <select
          value={filters.transmission}
          onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Transmissions</option>
          {transmissions.map((tr) => (
            <option key={tr} value={tr}>
              {tr}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Vehicle Condition
        </label>
        <select
          value={filters.condition}
          onChange={(e) => setFilters((prev) => ({ ...prev, condition: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Conditions</option>
          {conditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Showroom Yard Location */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Showroom Yard
        </label>
        <select
          value={filters.locationYard}
          onChange={(e) => setFilters((prev) => ({ ...prev, locationYard: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
        >
          <option value="">All Yard Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 py-6 sm:py-10 transition-colors">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 tracking-wider uppercase">
                Direct Imports & Certified Stock
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[11px] font-bold">
                {filteredVehicles.length} Units Ready
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Automotive Marketplace
            </h1>
          </div>

          {/* Search bar in header */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search make, model, stock#..."
              value={filters.search}
              onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
              className="w-full bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 shadow-sm"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((p) => ({ ...p, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Marketplace Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-6 -mx-3 px-3 sm:mx-0 sm:px-0">
          {quickFilterChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={chip.onClick}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition border shrink-0 ${
                chip.active
                  ? 'bg-brand-600 text-white border-brand-600 shadow-glow'
                  : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500 shadow-sm'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Control Bar (Mobile filter toggle, View modes, Sort) */}
        <div className="flex items-center justify-between gap-3 mb-6 p-3 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            <Filter className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredVehicles.length}</strong> vehicles
          </span>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                <option value="newest">Newest Listed</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest First</option>
                <option value="mileage_asc">Lowest Mileage</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-dark-850 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-dark-750 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-dark-750 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <FilterControls />
            </div>
          </aside>

          {/* Vehicle Cards Grid / List */}
          <main className="lg:col-span-3">
            {filteredVehicles.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6'
                    : 'space-y-6'
                }
              >
                {filteredVehicles.map((car) => (
                  <VehicleCard key={car.id} vehicle={car} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Vehicles Match Your Search</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We couldn't find any vehicle matching the selected filters. Try broadening your budget range or clearing some filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-Up Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="bg-white dark:bg-dark-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl max-h-[85vh] w-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Marketplace Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-500 dark:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterControls />

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-glow"
              >
                Show {filteredVehicles.length} Vehicles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
