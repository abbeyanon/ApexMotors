import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { VehicleCard } from '../components/VehicleCard';
import { FinanceCalculator } from '../components/FinanceCalculator';
import {
  Heart,
  Scale,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Fuel,
  Gauge,
  Compass,
  FileText,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CreditCard,
  Building2,
  Wrench,
  Download
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    vehicles,
    getVehicleById,
    formatPrice,
    favorites,
    toggleFavorite,
    comparison,
    toggleComparison,
    getWhatsAppLink,
    setActiveModalVehicle,
    setIsTestDriveModalOpen,
    setIsEnquiryModalOpen,
    settings,
    addToast
  } = useDealership();

  const vehicle = getVehicleById(id || '');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Crucial: Reset active photo index and scroll to top whenever ID changes
  useEffect(() => {
    setActivePhotoIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The vehicle you are searching for might have been sold or moved.</p>
        <Link
          to="/inventory"
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition"
        >
          Browse All Available Cars
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(vehicle.id);
  const isCompared = comparison.includes(vehicle.id);

  // Similar vehicles (same make or body type)
  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - Apex Motors`,
        text: `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} for sale at Apex Motors Kenya:`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied',
        message: 'Vehicle URL copied to clipboard!'
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/inventory" className="hover:text-white transition">Inventory</Link>
            <span>/</span>
            <span className="text-brand-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`p-2 rounded-xl border transition ${
                isFav
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                  : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Save vehicle"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-blue-500' : ''}`} />
            </button>

            <button
              onClick={() => toggleComparison(vehicle.id)}
              className={`p-2 rounded-xl border transition ${
                isCompared
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-400'
                  : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Compare vehicle"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-dark-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title="Share vehicle"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Quick Pricing Header */}
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
                {vehicle.condition}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-dark-800 text-slate-300 text-xs font-mono">
                Stock #{vehicle.stockNo}
              </span>
              {vehicle.status === 'reserved' && (
                <span className="px-2.5 py-1 rounded-md bg-amber-500 text-dark-950 text-xs font-bold uppercase">
                  Reserved
                </span>
              )}
              {vehicle.status === 'sold' && (
                <span className="px-2.5 py-1 rounded-md bg-slate-700 text-slate-300 text-xs font-bold uppercase">
                  Sold Out
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-0.5">{vehicle.variant}</p>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Cash / Outright Price
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-500 font-display">
              {formatPrice(vehicle.price)}
            </div>
            {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
              <span className="text-xs text-rose-400 line-through mt-0.5">
                Was {formatPrice(vehicle.originalPrice)}
              </span>
            )}
            <span className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Includes 150-Point Pre-Purchase Inspection & Logbook Processing</span>
            </span>
          </div>
        </div>

        {/* Gallery & Quick Inquiry Action Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Multi-Photo Gallery */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main Active Image with Lightbox zoom */}
            <div className="relative h-[360px] sm:h-[480px] rounded-3xl overflow-hidden bg-dark-950 border border-slate-800 group">
              <img
                src={vehicle.images[activePhotoIndex] || vehicle.images[0]}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Prev / Next Arrows */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === 0 ? vehicle.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/70 hover:bg-dark-950 text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === vehicle.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-950/70 hover:bg-dark-950 text-white backdrop-blur-md transition opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Expand Lightbox Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-dark-950/80 hover:bg-dark-950 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Full Screen ({activePhotoIndex + 1}/{vehicle.images.length})</span>
              </button>
            </div>

            {/* Thumbnails Strip */}
            {vehicle.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activePhotoIndex === idx
                        ? 'border-brand-500 shadow-glow'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Matrix Grid */}
            <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-500" />
                <span>Technical Specifications Overview</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Year of Manufacture</span>
                  <span className="text-sm font-bold text-white">{vehicle.year}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Verified Mileage</span>
                  <span className="text-sm font-bold text-white">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Engine Capacity</span>
                  <span className="text-sm font-bold text-white">{vehicle.engineSize}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Fuel Type</span>
                  <span className="text-sm font-bold text-white">{vehicle.fuelType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Transmission</span>
                  <span className="text-sm font-bold text-white">{vehicle.transmission}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Drivetrain</span>
                  <span className="text-sm font-bold text-white">{vehicle.driveType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Body Style</span>
                  <span className="text-sm font-bold text-white">{vehicle.bodyType}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Exterior Color</span>
                  <span className="text-sm font-bold text-white truncate block">{vehicle.exteriorColor}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Interior Color</span>
                  <span className="text-sm font-bold text-white truncate block">{vehicle.interiorColor}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750">
                  <span className="text-slate-400 block mb-0.5">Chassis / VIN</span>
                  <span className="text-sm font-bold text-white font-mono">{vehicle.vin || 'MX-VERIFIED'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-850 border border-slate-750 sm:col-span-2">
                  <span className="text-slate-400 block mb-0.5">Showroom Yard Location</span>
                  <span className="text-sm font-bold text-brand-400">{vehicle.locationYard}</span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Vehicle Description & Provenance</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">Key Features & Factory Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty & Service History */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Warranty Included</span>
                  </div>
                  <p className="text-slate-300">{vehicle.warranty}</p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <Wrench className="w-4 h-4" />
                    <span>Service History</span>
                  </div>
                  <p className="text-slate-300">{vehicle.serviceHistory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Action Card & Dealership Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl sticky top-28 space-y-5">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Cash Price</span>
                <div className="text-3xl font-extrabold text-white font-display">
                  {formatPrice(vehicle.price)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Available for viewing at <strong className="text-white">{vehicle.locationYard}</strong>
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppLink(vehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setActiveModalVehicle(vehicle);
                    setIsTestDriveModalOpen(true);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-500 hover:to-blue-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow transition transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Test Drive</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModalVehicle(vehicle);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition"
                >
                  Enquire About This Car
                </button>

                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-500" />
                  <span>Call Dealership: {settings.phone}</span>
                </a>
              </div>

              {/* Guarantees list */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>150-point diagnostic inspection passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified genuine mileage with JEVIC certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clean NTSA logbook ready for direct transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trade-ins accepted against this vehicle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Repayment Calculator for this vehicle (Keyed to vehicle.id so it fully updates!) */}
        <div className="mb-16">
          <FinanceCalculator key={vehicle.id} initialVehicle={vehicle} />
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Similar Vehicles in Stock
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  You might also be interested in these alternatives.
                </p>
              </div>
              <Link
                to="/inventory"
                className="text-xs font-bold text-brand-400 hover:text-brand-300 transition"
              >
                View All Cars &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarVehicles.map((simCar) => (
                <VehicleCard key={simCar.id} vehicle={simCar} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-dark-800 text-white hover:bg-slate-700 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-[75vh] flex items-center justify-center">
            <img
              src={vehicle.images[activePhotoIndex]}
              alt={vehicle.model}
              className="max-h-full max-w-full object-contain rounded-2xl"
            />

            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === 0 ? vehicle.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/80 text-white hover:bg-dark-900 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === vehicle.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/80 text-white hover:bg-dark-900 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-slate-400 text-xs mt-4">
            Photo {activePhotoIndex + 1} of {vehicle.images.length} • {vehicle.year} {vehicle.make} {vehicle.model}
          </div>
        </div>
      )}
    </div>
  );
};
