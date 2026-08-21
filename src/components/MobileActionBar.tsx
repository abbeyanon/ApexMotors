import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Home,
  Compass,
  Heart,
  Scale,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles
} from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const location = useLocation();
  const {
    favorites,
    comparison,
    getWhatsAppLink,
    settings,
    setIsTestDriveModalOpen,
    activeModalVehicle
  } = useDealership();

  const isVehicleDetailPage = location.pathname.startsWith('/vehicle/');

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-dark-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-2 transition-colors">
      {/* If viewing a single vehicle detail page: Show direct action bar (Call, WhatsApp, Test Drive) */}
      {isVehicleDetailPage ? (
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Call Yard</span>
          </a>

          <a
            href={getWhatsAppLink(activeModalVehicle || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsTestDriveModalOpen(true)}
            className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Test Drive</span>
          </button>
        </div>
      ) : (
        /* Regular marketplace navigation bar */
        <div className="flex items-center justify-around max-w-md mx-auto text-center">
          <Link
            to="/"
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
              isActive('/') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </Link>

          <Link
            to="/inventory"
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
              isActive('/inventory') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">Marketplace</span>
          </Link>

          {/* Central floating WhatsApp CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center -mt-4 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 transition transform hover:scale-105 active:scale-95"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          <Link
            to="/saved"
            className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
              isActive('/saved') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow">
                {favorites.length}
              </span>
            )}
            <span className="text-[10px]">Saved</span>
          </Link>

          <Link
            to="/compare"
            className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
              isActive('/compare') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Scale className="w-5 h-5" />
            {comparison.length > 0 && (
              <span className="absolute top-0 right-1.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center shadow">
                {comparison.length}
              </span>
            )}
            <span className="text-[10px]">Compare</span>
          </Link>
        </div>
      )}
    </div>
  );
};
