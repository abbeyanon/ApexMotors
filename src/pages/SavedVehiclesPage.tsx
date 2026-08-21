import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { VehicleCard } from '../components/VehicleCard';
import { Heart, Car, Trash2, ArrowRight } from 'lucide-react';

export const SavedVehiclesPage: React.FC = () => {
  const { favorites, getVehicleById } = useDealership();

  const savedCars = favorites
    .map((id) => getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => v !== undefined);

  return (
    <div className="min-h-screen bg-dark-950 py-10">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="mb-8">
          <div className="text-xs text-slate-400 mb-1">
            <Link to="/" className="hover:text-white">Home</Link> / <span className="text-brand-400 font-semibold">Saved Vehicles</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-500 fill-blue-500" />
            <h1 className="text-3xl font-display font-extrabold text-white">
              My Saved Vehicles ({savedCars.length})
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Keep track of your favorite vehicles and receive price drop alerts.
          </p>
        </div>

        {savedCars.length === 0 ? (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Saved Cars Yet</h3>
            <p className="text-xs text-slate-400">
              Click the heart icon on any vehicle card in our inventory to save it here for easy viewing and comparison.
            </p>
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow transition"
            >
              <span>Explore Cars for Sale</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCars.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
