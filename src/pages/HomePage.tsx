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
    <div className="min-h-screen bg-dark-950 text-slate-100">
      {/* 1. Hero Search Section */}
      <HeroSearch />

      {/* 2. Key Dealership Metrics Counter */}
      <div className="border-y border-slate-800 bg-dark-900/60 py-6 sm:py-8">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">150+</div>
              <p className="text-xs text-slate-400 mt-0.5">Inspected Vehicles in Stock</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-500 font-display">1,800+</div>
              <p className="text-xs text-slate-400 mt-0.5">Satisfied Car Owners</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">48 Hours</div>
              <p className="text-xs text-slate-400 mt-0.5">Bank Asset Finance Approval</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">100%</div>
              <p className="text-xs text-slate-400 mt-0.5">Clean NTSA Logbook Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Featured Vehicles Section */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hand-Picked Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Top-specification premium models freshly detailed and ready for immediate driving.
            </p>
          </div>

          <Link
            to="/inventory?badge=featured"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 transition"
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
      <section className="py-12 bg-dark-900 border-y border-slate-800">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Browse Vehicles by Make
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore trusted Japanese and European automotive brands in our yard.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {makesList.map((m) => (
              <button
                key={m.name}
                onClick={() => handleMakeClick(m.name)}
                className="p-4 rounded-2xl bg-dark-950 border border-slate-800 hover:border-brand-500/50 hover:bg-dark-850 transition-all duration-200 group text-center"
              >
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors">
                  {m.name}
                </h4>
                <span className="text-[10px] text-slate-400">{m.count} In Stock</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Showcase */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Direct Japanese & UK Imports</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              New Arrivals This Week
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Recently cleared vehicles with complete JEVIC inspection reports and export certifications.
            </p>
          </div>

          <Link
            to="/inventory?badge=new"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 transition"
          >
            <span>Explore All New Arrivals</span>
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
      <section className="py-12 bg-dark-900 border-y border-slate-800">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Filter by Body Type
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Find the perfect body silhouette for your daily drive, family travel, or business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bodyTypesList.map((b) => (
              <button
                key={b.name}
                onClick={() => handleBodyClick(b.name)}
                className="p-5 rounded-2xl bg-dark-950 border border-slate-800 hover:border-brand-500/60 hover:bg-dark-850 transition-all duration-200 group text-left flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors">
                    {b.name}
                  </h4>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                  <span className="text-[11px] text-brand-400 font-semibold mt-2 inline-block">
                    {b.count} Vehicles Available
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust Guarantees & 150-Point Inspection */}
      <TrustGuarantees />

      {/* 8. Interactive Asset Finance Calculator Teaser */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <FinanceCalculator />
      </section>

      {/* 9. Sell / Trade-in Banner */}
      <section className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-brand-900/90 via-dark-900 to-dark-950 border border-brand-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Hassle-Free Car Valuation
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              Looking to Sell or Trade-In Your Current Vehicle?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We offer instant competitive cash buyouts or seamless trade-in allowances toward any vehicle in our showroom. Fair pricing with same-day payment.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsTradeInModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-white text-dark-950 hover:bg-slate-100 font-bold text-sm shadow-xl transition transform hover:-translate-y-0.5"
              >
                Get Free Trade-In Valuation
              </button>
              <a
                href={getWhatsAppLink(undefined, "Hello Apex Motors, I want to trade in my car. Please assist me with valuation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Valuation Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Customer Reviews Section */}
      <ReviewsSection />

      {/* 11. Latest Blog & Automotive Guides */}
      <section className="py-16 sm:py-20 bg-dark-900 border-y border-slate-800">
        <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Automotive Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Latest News & Buying Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Expert tips on vehicle maintenance, financing approvals, and Kenyan car comparisons.
              </p>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-400 hover:text-brand-300 transition"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="bg-dark-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-sm text-[11px] font-semibold text-brand-400">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block text-base font-bold text-white hover:text-brand-400 transition line-clamp-2 mb-2"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Showroom Yards & Contact Section */}
      <section className="py-16 sm:py-20 max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Visit Our Showroom Yards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Walk in today or book a private appointment to view and test-drive your next vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-dark-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </span>
                  {loc.isMain && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase">
                      Headquarters
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{loc.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{loc.address}, {loc.city}</p>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <p>🕒 {loc.openingHours}</p>
                  <p>📞 {loc.phone}</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setIsTestDriveModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  Schedule Viewing at this Yard
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
