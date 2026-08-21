import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import { Scale, Trash2, Check, X, ArrowRight, Calendar, MessageCircle, Plus } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const {
    comparison,
    toggleComparison,
    clearComparison,
    getVehicleById,
    formatPrice,
    vehicles,
    setActiveModalVehicle,
    setIsTestDriveModalOpen,
    getWhatsAppLink
  } = useDealership();

  const comparedCars = comparison
    .map((id) => getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => v !== undefined);

  if (comparedCars.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-dark-950">
        <div className="w-16 h-16 rounded-full bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Vehicles in Comparison</h2>
        <p className="text-xs text-slate-400 max-w-sm mb-6">
          Browse our inventory and click the compare icon on up to 4 vehicles to view their specs side by side.
        </p>
        <Link
          to="/inventory"
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-glow"
        >
          Browse Inventory
        </Link>
      </div>
    );
  }

  const specRows = [
    { label: 'Price', key: (v: any) => formatPrice(v.price), highlight: true },
    { label: 'Year', key: (v: any) => v.year },
    { label: 'Mileage', key: (v: any) => `${v.mileage.toLocaleString()} km` },
    { label: 'Engine', key: (v: any) => v.engineSize },
    { label: 'Fuel Type', key: (v: any) => v.fuelType },
    { label: 'Transmission', key: (v: any) => v.transmission },
    { label: 'Drivetrain', key: (v: any) => v.driveType },
    { label: 'Body Style', key: (v: any) => v.bodyType },
    { label: 'Condition', key: (v: any) => v.condition },
    { label: 'Exterior Color', key: (v: any) => v.exteriorColor },
    { label: 'Interior Color', key: (v: any) => v.interiorColor },
    { label: 'Showroom Location', key: (v: any) => v.locationYard },
    { label: 'Warranty', key: (v: any) => v.warranty }
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-10">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Side-by-Side Comparison</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white">
              Compare Selected Vehicles ({comparedCars.length}/4)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-300 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            {comparedCars.length < 4 && (
              <Link
                to="/inventory"
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-glow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Car</span>
              </Link>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-dark-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-4 sm:p-6 bg-dark-950 w-48 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Vehicle
                  </th>
                  {comparedCars.map((car) => (
                    <th key={car.id} className="p-4 sm:p-6 min-w-[240px] max-w-[280px] align-top">
                      <div className="relative group">
                        <button
                          onClick={() => toggleComparison(car.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-dark-950/80 text-slate-400 hover:text-white transition z-10"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img
                          src={car.images[0]}
                          alt={car.model}
                          className="w-full h-36 object-cover rounded-xl mb-3"
                        />
                        <span className="text-[10px] text-brand-400 font-mono">#{car.stockNo}</span>
                        <Link
                          to={`/vehicle/${car.id}`}
                          className="block text-sm font-bold text-white hover:text-brand-400 transition"
                        >
                          {car.year} {car.make} {car.model}
                        </Link>
                        <p className="text-xs text-slate-400 truncate">{car.variant}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {specRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-dark-900' : 'bg-dark-950/50'}>
                    <td className="p-4 sm:px-6 font-semibold text-slate-400 bg-dark-950/70">
                      {row.label}
                    </td>
                    {comparedCars.map((car) => (
                      <td
                        key={car.id}
                        className={`p-4 sm:px-6 ${
                          row.highlight
                            ? 'text-base font-extrabold text-brand-400 font-display'
                            : 'text-slate-200'
                        }`}
                      >
                        {row.key(car)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* CTAs Row */}
                <tr className="bg-dark-950">
                  <td className="p-4 sm:px-6 font-semibold text-slate-400">Actions</td>
                  {comparedCars.map((car) => (
                    <td key={car.id} className="p-4 sm:px-6 space-y-2">
                      <button
                        onClick={() => {
                          setActiveModalVehicle(car);
                          setIsTestDriveModalOpen(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition"
                      >
                        Book Test Drive
                      </button>
                      <a
                        href={getWhatsAppLink(car)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
