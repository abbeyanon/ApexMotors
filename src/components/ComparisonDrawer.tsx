import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export const ComparisonDrawer: React.FC = () => {
  const { comparison, toggleComparison, clearComparison, getVehicleById, formatPrice } = useDealership();

  if (comparison.length === 0) return null;

  return (
    <div className="fixed bottom-14 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-dark-900/95 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl px-4 py-3 max-w-2xl w-[94%] sm:w-auto animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/40">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Compare Vehicles</span>
              <span className="px-1.5 py-0.5 rounded bg-brand-600 text-[10px] text-white font-mono">
                {comparison.length}/4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Side-by-side technical specs & pricing</p>
          </div>
        </div>

        {/* Thumbnail Avatars */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          {comparison.map((id) => {
            const v = getVehicleById(id);
            if (!v) return null;
            return (
              <div
                key={id}
                className="relative group w-9 h-9 rounded-xl border-2 border-dark-900 overflow-hidden bg-dark-950"
              >
                <img src={v.images[0]} alt={v.model} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleComparison(id)}
                  className="absolute inset-0 bg-rose-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearComparison}
            className="p-2 text-slate-400 hover:text-rose-400 transition"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow flex items-center gap-1.5 transition"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
