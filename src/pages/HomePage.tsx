import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { HeroSearch } from '../components/HeroSearch';
import { VehicleCard } from '../components/VehicleCard';
import { FinanceCalculator } from '../components/FinanceCalculator';
import { TrustGuarantees } from '../components/TrustGuarantees';
import { ReviewsSection } from '../components/ReviewsSection';
import {
  Car,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Compass,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, blogPosts, locations, settings, setFilters, setIsTradeInModalOpen, setIsTestDriveModalOpen, getWhatsAppLink } = useDealership();

  // Featured vehicles & New Arrivals
  const featuredVehicles = vehicles.filter((v) => v.isFeatured && v.status === 'available').slice(0, 4);
  const newArrivals = vehicles.filter((v) => v.isNewArrival && v.status === 'available').slice(0, 4);

  // Makes with counts
  const makesList = [
    { name: 'Toyota', count: vehicles.filter((v) => v.make === 'Toyota').length, icon: '🚗' },
    { name: 'Mercedes-Benz', count: vehicles.filter((v) => v.make === 'Mercedes-Benz').length, icon: '⭐' },
    { name: 'BMW', count: vehicles.filter((v) => v.make === 'BMW').length, icon: '🏎️' },
    { name: 'Mazda', count: vehicles.filter((v) => v.make === 'Mazda').length, icon: '🚙' },
    { name: 'Subaru', count: vehicles.filter((v) => v.make === 'Subaru').length, icon: '⭐' },
    { name: 'Nissan', count: vehicles.filter((v) => v.make === 'Nissan').length, icon: '🚘' },
    { name: 'Honda', count: vehicles.filter((v) => v.make === 'Honda').length, icon: '🏎️' }
  ];

  // Body types with counts
  const bodyTypesList = [
    { name: 'SUV', count: vehicles.filter((v) => v.bodyType === 'SUV').length, desc: 'Rugged & Spacious 4x4s' },
    { name: 'Sedan', count: vehicles.filter((v) => v.bodyType === 'Sedan').length, desc: 'Executive & Plush Saloons' },
    { name: 'Crossover', count: vehicles.filter((v) => v.bodyType === 'Crossover').length, desc: 'Agile & High Economy' },
    { name: 'Hatchback', count: vehicles.filter((v) => v.bodyType === 'Hatchback').length, desc: 'Compact City Commuters' }
  ];

  const handleMakeClick = (make: string) => {
    setFilters((prev) => ({ ...prev, make }));
    navigate('/inventory');
  };

  const handleBodyClick = (bodyType: string) => {
    setFilters((prev) => ({ ...prev, bodyType }));
    navigate('/inventory');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Hero Search Section */}
      <HeroSearch />

      {/* 2. Key Dealership Metrics Counter */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900/60 py-6 sm:py-8 transition-colors">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">150+</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Inspected Vehicles in Stock</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-500 font-display">1,800+</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Satisfied Car Owners</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-display">48 Hours</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bank Asset Finance Approval</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">100%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Clean NTSA Logbook Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Featured Vehicles Section */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hand-Picked Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Top-specification premium models freshly detailed and ready for immediate driving.
            </p>
          </div>

          <Link
            to="/inventory?badge=featured"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
          >
            <span>View All Featured Cars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>
      </section>

      {/* 4. Browse by Popular Makes */}
      <section className="py-14 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Browse Vehicles by Make
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore trusted Japanese and European automotive brands in our yard.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {makesList.map((m) => (
              <button
                key={m.name}
                onClick={() => handleMakeClick(m.name)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-850 hover:bg-white dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700/80 transition-all text-center group hover:shadow-lg hover:border-brand-500"
              >
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{m.icon}</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                  {m.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {m.count} Cars
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Direct Japanese & UK Imports</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              New Arrivals in Showroom
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Freshly offloaded and inspected vehicles with verified auction sheets and pre-delivery service.
            </p>
          </div>

          <Link
            to="/inventory?badge=new"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>
      </section>

      {/* 6. Browse by Body Style */}
      <section className="py-14 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Browse by Vehicle Body Type
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Choose the right vehicle configuration for your lifestyle or commercial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bodyTypesList.map((b) => (
              <button
                key={b.name}
                onClick={() => handleBodyClick(b.name)}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-850 hover:bg-white dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700/80 text-left transition-all group hover:shadow-lg hover:border-brand-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-dark-750 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                    {b.count} Units
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {b.name}s
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {b.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 150-Point Inspection Guarantees */}
      <TrustGuarantees />

      {/* 8. Asset Finance Loan Calculator Section */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <FinanceCalculator />
      </section>

      {/* 9. Trade-In / Sell Your Car Banner */}
      <section className="py-12 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="bg-gradient-to-r from-blue-900 via-brand-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                Instant Valuation & Fair Pricing
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold leading-tight">
                Want to Upgrade? Sell or Trade-In Your Current Car Today.
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Get a transparent pre-inspection market offer in 30 minutes. We accept trade-ins against all vehicles in our inventory with zero hassle.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setIsTradeInModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white text-brand-900 hover:bg-slate-100 font-bold text-sm shadow-xl transition transform hover:-translate-y-0.5 text-center"
              >
                Get Trade-In Valuation
              </button>
              <a
                href={getWhatsAppLink(undefined, 'Hello, I want to trade in my car at Apex Motors Kenya.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Appraiser</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Customer Testimonials */}
      <ReviewsSection />

      {/* 11. Automotive News & Guides */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge Center</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Car Buying Guides & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Expert advice on import duty, maintenance, bank asset finance, and comparisons.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden group hover:border-brand-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-100 dark:bg-dark-950 relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1.5">
                    {post.date} • {post.readTime}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. Showroom Yard Locations */}
      <section className="py-14 bg-white dark:bg-dark-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Visit Our Showroom Yards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Conveniently located in Nairobi with secure parking and vehicle inspection ramps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((yard) => (
              <div
                key={yard.id}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </span>
                  {yard.isMain && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-bold uppercase">
                      Headquarters
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{yard.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{yard.address}, {yard.city}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-750">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span>{yard.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    <span>{yard.openingHours}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setIsTestDriveModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition text-center"
                  >
                    Visit Yard & Test Drive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
