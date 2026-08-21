import React, { useState } from 'react';
import { useDealership } from '../context/DealershipContext';
import { RefreshCw, Car, DollarSign, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const TradeInPage: React.FC = () => {
  const { vehicles, submitTradeIn, formatPrice, getWhatsAppLink } = useDealership();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carMake, setCarMake] = useState('Toyota');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState<number>(2017);
  const [carMileage, setCarMileage] = useState<number>(75000);
  const [carTransmission, setCarTransmission] = useState('Automatic');
  const [carFuel, setCarFuel] = useState('Petrol');
  const [carCondition, setCarCondition] = useState('Clean / Well Maintained');
  const [expectedPrice, setExpectedPrice] = useState<number>(2500000);
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
      photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop'],
      additionalNotes
    });

    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Instant Vehicle Valuation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Sell or Trade-In Your Car
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Get the best market value for your current car. Trade it in toward an upgrade or receive direct cash payment in your bank account.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-glow">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-1">Submit Vehicle Details</h3>
            <p className="text-xs text-slate-400">Fill the online form with your car's make, year, mileage, and condition.</p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-dark-950 font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-glow-gold">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-1">Quick Inspection</h3>
            <p className="text-xs text-slate-400">Bring your vehicle to any of our Nairobi yards for a 20-minute mechanical appraisal.</p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-dark-950 font-bold text-lg flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-1">Get Paid or Drive Away</h3>
            <p className="text-xs text-slate-400">Receive instant bank settlement or apply the full valuation credit toward your new car.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Valuation Request Received!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{customerName}</strong>. Our chief vehicle appraiser has received your {carYear} {carMake} {carModel} request and will call you with an official valuation offer within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Vehicle & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Car Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota / Subaru / Mazda"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Car Model & Variant *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harrier 2.0 / Prado TX"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Year of Manufacture</label>
                  <input
                    type="number"
                    value={carYear}
                    onChange={(e) => setCarYear(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Current Mileage (KM)</label>
                  <input
                    type="number"
                    value={carMileage}
                    onChange={(e) => setCarMileage(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Transmission</label>
                  <select
                    value={carTransmission}
                    onChange={(e) => setCarTransmission(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Overall Condition</label>
                  <select
                    value={carCondition}
                    onChange={(e) => setCarCondition(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Excellent / Showroom Condition">Excellent / Mint Condition</option>
                    <option value="Clean / Well Maintained">Clean / Well Maintained</option>
                    <option value="Minor Cosmetic Scratches">Minor Cosmetic Scratches</option>
                    <option value="Requires Mechanical Work">Requires Mechanical Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Expected Asking Price (KES) *</label>
                  <input
                    type="number"
                    required
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Upgrade Target Car */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Car You Wish to Trade-In For (Optional)
                </label>
                <select
                  value={targetVehicleId}
                  onChange={(e) => setTargetVehicleId(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="">-- Cash Buyout (Not Trading In For Another Car) --</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} - {formatPrice(v.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Owner details */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peter Njoroge"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Location / City</label>
                    <input
                      type="text"
                      placeholder="e.g. Nairobi, Westlands"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Additional Notes / Modifications</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Fitted with new Michelin tyres last month, full service history available..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow transition transform hover:-translate-y-0.5"
                >
                  Submit for Free Valuation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
