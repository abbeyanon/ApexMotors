import React, { useState } from 'react';
import { useDealership } from '../context/DealershipContext';
import { RefreshCw, Car, DollarSign, Upload, CheckCircle2, X } from 'lucide-react';

export const TradeInModal: React.FC = () => {
  const {
    isTradeInModalOpen,
    setIsTradeInModalOpen,
    submitTradeIn,
    vehicles,
    formatPrice
  } = useDealership();

  if (!isTradeInModalOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carMake, setCarMake] = useState('Toyota');
  const [carModel, setCarModel] = useState('Harrier');
  const [carYear, setCarYear] = useState<number>(2016);
  const [carMileage, setCarMileage] = useState<number>(85000);
  const [carTransmission, setCarTransmission] = useState('Automatic');
  const [carFuel, setCarFuel] = useState('Petrol');
  const [carCondition, setCarCondition] = useState('Clean / Well Maintained');
  const [expectedPrice, setExpectedPrice] = useState<number>(2200000);
  const [location, setLocation] = useState('Nairobi');
  const [targetVehicleId, setTargetVehicleId] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !carMake || !carModel) return;

    submitTradeIn({
      customerName,
      phone,
      email: email || `${phone}@tradein.co.ke`,
      currentCarMake: carMake,
      currentCarModel: carModel,
      currentCarYear: carYear,
      currentCarMileage: carMileage,
      currentCarTransmission: carTransmission,
      currentCarFuel: carFuel,
      currentCarCondition: carCondition,
      expectedPrice,
      targetVehicleId: targetVehicleId || undefined,
      location,
      photos: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop'
      ],
      additionalNotes
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsTradeInModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-dark-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsTradeInModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Valuation Request Submitted!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our vehicle valuation officer will inspect your vehicle specs and call you with an official valuation offer within 2 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <RefreshCw className="w-4 h-4" />
              <span>Instant Car Valuation & Trade-In</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              Sell or Trade-In Your Car
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Get an instant fair market valuation and upgrade to a new or certified imported vehicle with zero hassle.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harrier / Prado / CX-5"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Year</label>
                  <input
                    type="number"
                    value={carYear}
                    onChange={(e) => setCarYear(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Mileage (KM)</label>
                  <input
                    type="number"
                    value={carMileage}
                    onChange={(e) => setCarMileage(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Transmission</label>
                  <select
                    value={carTransmission}
                    onChange={(e) => setCarTransmission(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Vehicle Condition</label>
                  <select
                    value={carCondition}
                    onChange={(e) => setCarCondition(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Excellent / Showroom Condition">Excellent / Mint Condition</option>
                    <option value="Clean / Well Maintained">Clean / Well Maintained</option>
                    <option value="Minor Cosmetic Scratches">Minor Cosmetic Scratches</option>
                    <option value="Requires Mechanical Work">Requires Mechanical Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Expected Price (KES)</label>
                  <input
                    type="number"
                    required
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Target trade-in car optional */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Car You Want to Upgrade To (Optional)
                </label>
                <select
                  value={targetVehicleId}
                  onChange={(e) => setTargetVehicleId(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="">-- Direct Cash Sale (Not Trading In) --</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      Upgrade to: {v.year} {v.make} {v.model} ({formatPrice(v.price)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Info */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peter Njoroge"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Nairobi, Kilimani"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsTradeInModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold hover:bg-dark-750"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow"
                >
                  Request Valuation Offer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
