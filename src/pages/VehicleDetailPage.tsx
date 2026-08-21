import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { VehicleCard } from '../components/VehicleCard';
import { FinanceCalculator } from '../components/FinanceCalculator';
import {
  ShieldCheck,
  Calendar,
  Gauge,
  Fuel,
  Compass,
  MapPin,
  Heart,
  Scale,
  Share2,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
  Eye,
  Camera,
  Car,
  DollarSign
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    vehicles,
    getVehicleById,
    favorites,
    toggleFavorite,
    comparison,
    toggleComparison,
    formatPrice,
    settings,
    getWhatsAppLink,
    setActiveModalVehicle,
    setIsTestDriveModalOpen,
    setIsEnquiryModalOpen,
    setIsFinanceModalOpen,
    addToast
  } = useDealership();

  const vehicle = getVehicleById(id || '');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top and reset photo index whenever the vehicle ID changes
  useEffect(() => {
    setSelectedPhotoIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-dark-950">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Vehicle Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          The vehicle you are looking for might have been sold or removed from inventory.
        </p>
        <Link
          to="/inventory"
          className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-glow hover:bg-brand-500 transition"
        >
          Return to Inventory
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(vehicle.id);
  const isCompared = comparison.includes(vehicle.id);

  // Similar vehicles from same make or body type
  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - Apex Motors`,
        text: `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} listed at ${formatPrice(vehicle.price)}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      addToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Vehicle URL copied to clipboard.'
      });
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1));
  };

  // Indicative monthly installment with 20% deposit over 48 months at 13.5%
  const deposit = vehicle.price * 0.2;
  const loan = vehicle.price - deposit;
  const rate = (13.5 / 100) / 12;
  const term = 48;
  const monthlyEst = Math.round((loan * (rate * Math.pow(1 + rate, term))) / (Math.pow(1 + rate, term) - 1));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 py-6 sm:py-10 transition-colors">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-brand-600 dark:hover:text-white transition">Inventory</Link>
          <span>/</span>
          <Link to={`/inventory?make=${vehicle.make}`} className="hover:text-brand-600 dark:hover:text-white transition">{vehicle.make}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">{vehicle.year} {vehicle.model}</span>
        </nav>

        {/* Top Header Card: Title, Badges, Price, and Actions */}
        <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
                  {vehicle.condition}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                  Stock #{vehicle.stockNo}
                </span>
                {vehicle.status === 'reserved' && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-dark-950 text-xs font-bold uppercase tracking-wider">
                    Under Reservation
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
                {vehicle.variant}
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Located at <strong>{vehicle.locationYard}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{vehicle.viewsCount || 1240} Views</span>
                </span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold block text-right">
                  Drive-Away Price
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display text-right">
                  {formatPrice(vehicle.price)}
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold text-right mt-1">
                  Est. Loan From {formatPrice(monthlyEst)} / month
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(vehicle.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    isFav
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400'
                      : 'bg-slate-100 dark:bg-dark-850 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Save vehicle"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-blue-500 text-blue-500' : ''}`} />
                </button>

                <button
                  onClick={() => toggleComparison(vehicle.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    isCompared
                      ? 'bg-brand-500/10 border-brand-500/40 text-brand-600 dark:text-brand-400'
                      : 'bg-slate-100 dark:bg-dark-850 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Compare vehicle"
                >
                  <Scale className="w-5 h-5" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition"
                  title="Share vehicle"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Gallery on Left (8 cols), Sidebar on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Component */}
            <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm">
              {/* Main Photo View */}
              <div className="relative h-[320px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-950 mb-4 group">
                <img
                  src={vehicle.images[selectedPhotoIndex] || vehicle.images[0]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />

                {/* Arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Photo index counter badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  <span>Photo {selectedPhotoIndex + 1} of {vehicle.images.length}</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative h-18 sm:h-22 rounded-xl overflow-hidden border-2 transition ${
                      selectedPhotoIndex === idx
                        ? 'border-brand-500 shadow-md scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Matrix Grid */}
            <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Odometer Mileage</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Engine Displacement</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.engineSize}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Fuel Type</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.fuelType}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Transmission</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.transmission}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Drivetrain</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.driveType}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Body Style</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.bodyType}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Exterior Color</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.exteriorColor}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Interior Color</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.interiorColor}</span>
                </div>
              </div>
            </div>

            {/* Premium Features List */}
            <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Installed Options & Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Overview & Description */}
            <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Vehicle Overview</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {vehicle.description}
              </p>

              {vehicle.warranty && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-amber-950 dark:text-amber-200 font-bold">Comprehensive Dealership Warranty:</strong>
                    <span>{vehicle.warranty}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Asset Finance Calculator for this vehicle */}
            <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <FinanceCalculator initialVehicle={vehicle} />
            </div>
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact & Action Card */}
            <div className="sticky top-28 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interested in this Car?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Book a test drive or reach out to our sales advisor immediately.
              </p>

              <div className="space-y-3">
                <a
                  href={getWhatsAppLink(vehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Direct</span>
                </a>

                <button
                  onClick={() => {
                    setActiveModalVehicle(vehicle);
                    setIsTestDriveModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Test Drive</span>
                </button>

                <button
                  onClick={() => {
                    setActiveModalVehicle(vehicle);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Send Enquiry / Make Offer</span>
                </button>

                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>

              {/* Showroom Location Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-100 dark:border-slate-800 text-xs space-y-2 mt-6">
                <span className="font-bold text-slate-900 dark:text-white block">Viewing Location:</span>
                <p className="text-slate-600 dark:text-slate-400">{vehicle.locationYard}</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Open Mon-Sat: 8:00 AM - 6:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Vehicles Carousel / Grid */}
        {similarVehicles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Similar Vehicles You Might Like</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Explore alternatives with matching body style and features.</p>
              </div>
              <Link to="/inventory" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
                View All Cars &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarVehicles.map((simCar) => (
                <VehicleCard key={simCar.id} vehicle={simCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
