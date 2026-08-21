import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types';
import { useDealership } from '../context/DealershipContext';
import {
  Heart,
  Scale,
  Gauge,
  Fuel,
  Compass,
  MapPin,
  MessageCircle,
  Eye,
  Camera,
  CheckCircle2,
  Sparkles,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Car
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  viewMode?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, viewMode = 'grid' }) => {
  const {
    formatPrice,
    favorites,
    toggleFavorite,
    comparison,
    toggleComparison,
    getWhatsAppLink,
    setActiveModalVehicle,
    setIsTestDriveModalOpen
  } = useDealership();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const isFav = favorites.includes(vehicle.id);
  const isCompared = comparison.includes(vehicle.id);

  // Indicative monthly installment with 20% deposit over 48 months at 13.5%
  const deposit = vehicle.price * 0.2;
  const loan = vehicle.price - deposit;
  const rate = (13.5 / 100) / 12;
  const term = 48;
  const monthlyEst = Math.round((loan * (rate * Math.pow(1 + rate, term))) / (Math.pow(1 + rate, term) - 1));

  const discount = vehicle.originalPrice && vehicle.originalPrice > vehicle.price
    ? vehicle.originalPrice - vehicle.price
    : 0;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(false);
    setActiveImageIndex((prev) => (prev === vehicle.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(false);
    setActiveImageIndex((prev) => (prev === 0 ? vehicle.images.length - 1 : prev - 1));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col md:flex-row group">
        {/* Image Box */}
        <div className="relative md:w-88 h-60 md:h-auto shrink-0 bg-slate-100 dark:bg-dark-950 overflow-hidden">
          <Link to={`/vehicle/${vehicle.id}`} className="block w-full h-full">
            {!imageError ? (
              <img
                src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-dark-900 p-6 text-center">
                <Car className="w-12 h-12 text-brand-500 mb-2" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.year} {vehicle.make} {vehicle.model}</span>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-mono mt-1">#{vehicle.stockNo}</span>
              </div>
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
            {vehicle.status === 'reserved' && (
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider shadow">
                Reserved
              </span>
            )}
            {vehicle.status === 'sold' && (
              <span className="px-2.5 py-1 rounded-md bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                Sold Out
              </span>
            )}
            {vehicle.isFeatured && vehicle.status === 'available' && (
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3 fill-dark-950" /> Featured
              </span>
            )}
            {vehicle.isNewArrival && vehicle.status === 'available' && (
              <span className="px-2.5 py-1 rounded-md bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-glow">
                New Arrival
              </span>
            )}
          </div>

          {/* Quick next/prev image buttons */}
          {vehicle.images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImage}
                className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Photo Count */}
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/60 text-white text-[11px] flex items-center gap-1 backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>{vehicle.images.length} Photos</span>
          </div>

          {/* Stock No */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm font-bold">
            #{vehicle.stockNo}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {vehicle.condition}
                </span>
                <Link
                  to={`/vehicle/${vehicle.id}`}
                  className="block text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition leading-snug"
                >
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{vehicle.variant}</p>
              </div>

              {/* Price & Monthly Estimate */}
              <div className="text-right shrink-0">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  {formatPrice(vehicle.price)}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Est. {formatPrice(monthlyEst)}/mo
                </div>
                {discount > 0 && (
                  <div className="text-[10px] text-slate-400 line-through">
                    {formatPrice(vehicle.originalPrice!)}
                  </div>
                )}
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5 py-2.5 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{vehicle.fuelType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <span className="truncate">{vehicle.locationYard}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(vehicle.id)}
                className={`p-2 rounded-xl border transition ${
                  isFav
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-dark-850 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Save vehicle"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-blue-500 text-blue-500' : ''}`} />
              </button>

              <button
                onClick={() => toggleComparison(vehicle.id)}
                className={`p-2 rounded-xl border transition ${
                  isCompared
                    ? 'bg-brand-500/10 border-brand-500/40 text-brand-600 dark:text-brand-400'
                    : 'bg-slate-100 dark:bg-dark-850 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Compare vehicle"
              >
                <Scale className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink(vehicle)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveModalVehicle(vehicle);
                  setIsTestDriveModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
              >
                Test Drive
              </button>

              <Link
                to={`/vehicle/${vehicle.id}`}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-glow"
              >
                <span>View Details</span>
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Marketplace Card)
  return (
    <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col group relative">
      {/* Image Container */}
      <div className="relative h-52 sm:h-60 w-full bg-slate-100 dark:bg-dark-950 overflow-hidden">
        <Link to={`/vehicle/${vehicle.id}`} className="block w-full h-full">
          {!imageError ? (
            <img
              src={vehicle.images[activeImageIndex] || vehicle.images[0]}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-dark-900 p-4 text-center">
              <Car className="w-10 h-10 text-brand-500 mb-1.5" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{vehicle.year} {vehicle.make} {vehicle.model}</span>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-mono mt-0.5">#{vehicle.stockNo}</span>
            </div>
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {vehicle.status === 'reserved' && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider shadow">
              Reserved
            </span>
          )}
          {vehicle.status === 'sold' && (
            <span className="px-2 py-0.5 rounded-md bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider shadow">
              Sold Out
            </span>
          )}
          {vehicle.isFeatured && vehicle.status === 'available' && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-dark-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
              <Sparkles className="w-3 h-3 fill-dark-950" /> Featured
            </span>
          )}
          {vehicle.isNewArrival && vehicle.status === 'available' && (
            <span className="px-2 py-0.5 rounded-md bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-glow">
              New Arrival
            </span>
          )}
        </div>

        {/* Top Right Save & Compare Buttons */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={() => toggleComparison(vehicle.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition ${
              isCompared
                ? 'bg-brand-600 text-white shadow-lg'
                : 'bg-black/50 hover:bg-black/75 text-white'
            }`}
            title="Compare vehicle"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => toggleFavorite(vehicle.id)}
            className={`p-2 rounded-xl backdrop-blur-md transition ${
              isFav
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-black/50 hover:bg-black/75 text-white'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Quick next/prev image buttons */}
        {vehicle.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImage}
              className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/80"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Photo count and Stock No */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] flex items-center gap-1">
          <Camera className="w-3 h-3" />
          <span>{vehicle.images.length}</span>
        </div>

        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold font-mono">
          #{vehicle.stockNo}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">{vehicle.condition}</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[120px]">{vehicle.locationYard.split('-')[0]}</span>
            </span>
          </div>

          <Link
            to={`/vehicle/${vehicle.id}`}
            className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition leading-snug line-clamp-1"
          >
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">{vehicle.variant}</p>

          {/* Marketplace Specs Grid */}
          <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 bg-slate-50 dark:bg-dark-850 rounded-xl text-xs text-slate-700 dark:text-slate-300 mb-3.5 border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400">Mileage</span>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-xs">{vehicle.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-x border-slate-200 dark:border-slate-750">
              <span className="text-[10px] text-slate-400">Engine</span>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-xs truncate w-full">{vehicle.engineSize.split(' ')[0]}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400">Gearbox</span>
              <span className="font-bold text-slate-900 dark:text-white text-[11px] sm:text-xs truncate w-full">{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Marketplace CTAs */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Cash Price</span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-display">
                {formatPrice(vehicle.price)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-medium block">Asset Finance</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                From {formatPrice(monthlyEst)}/mo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppLink(vehicle)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-semibold transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              to={`/vehicle/${vehicle.id}`}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow transition active:scale-95"
            >
              <span>View Details</span>
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
