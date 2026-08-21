import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Car,
  Search,
  Heart,
  Scale,
  MessageCircle,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { pathname } = useLocation();
  const {
    settings,
    getWhatsAppLink,
    setIsTestDriveModalOpen,
    favorites,
    comparison
  } = useDealership();

  // If on vehicle detail page, we show a special conversion-focused sticky CTA bar
  const isVehicleDetailPage = pathname.startsWith('/vehicle/');

  if (isVehicleDetailPage) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-xl border-t border-slate-800 px-4 py-2.5 flex items-center gap-2 shadow-2xl safe-area-bottom">
        <a
          href={`tel:${settings.phone.replace(/\s+/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-dark-850 border border-slate-700 text-white font-bold text-xs active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-brand-400" />
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsTestDriveModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-glow active:scale-95 transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Test Drive</span>
        </button>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-950/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          pathname === '/' ? 'text-brand-400' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Car className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Home</span>
      </Link>

      <Link
        to="/inventory"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          pathname === '/inventory' ? 'text-brand-400' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Explore</span>
      </Link>

      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center -mt-4"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 border-2 border-dark-950">
          <MessageCircle className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-emerald-400 mt-0.5">Chat</span>
      </a>

      <Link
        to="/saved"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl relative transition ${
          pathname === '/saved' ? 'text-brand-400' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Heart className="w-5 h-5" />
        {favorites.length > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
            {favorites.length}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Saved</span>
      </Link>

      <Link
        to="/compare"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl relative transition ${
          pathname === '/compare' ? 'text-brand-400' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Scale className="w-5 h-5" />
        {comparison.length > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center">
            {comparison.length}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Compare</span>
      </Link>
    </div>
  );
};
