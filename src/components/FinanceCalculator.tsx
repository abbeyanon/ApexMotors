import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { useDealership } from '../context/DealershipContext';
import { Calculator, DollarSign, Calendar, Percent, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface FinanceCalculatorProps {
  initialVehicle?: Vehicle;
  onApplyClick?: (calcState: { vehiclePrice: number; deposit: number; term: number; monthly: number }) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ initialVehicle, onApplyClick }) => {
  const { formatPrice, settings, submitFinancing, vehicles } = useDealership();

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicle?.id || (vehicles[0]?.id ?? ''));
  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || initialVehicle || vehicles[0];

  const [price, setPrice] = useState<number>(currentVehicle?.price || 3500000);
  const [depositPercent, setDepositPercent] = useState<number>(20);
  const [termMonths, setTermMonths] = useState<number>(48);
  const [annualRate, setAnnualRate] = useState<number>(settings.defaultFinancingRate || 13.5);

  // Sync state whenever initialVehicle prop changes (when user navigates between cars)
  useEffect(() => {
    if (initialVehicle) {
      setSelectedVehicleId(initialVehicle.id);
      setPrice(initialVehicle.price);
    }
  }, [initialVehicle]);

  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const v = vehicles.find((item) => item.id === id);
    if (v) {
      setPrice(v.price);
    }
  };

  const depositAmount = Math.round((price * depositPercent) / 100);
  const loanAmount = Math.max(0, price - depositAmount);

  // Amortization calculation
  const monthlyRate = (annualRate / 100) / 12;
  const monthlyPayment = loanAmount > 0
    ? Math.round((loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / (Math.pow(1 + monthlyRate, termMonths) - 1))
    : 0;

  const totalRepaid = monthlyPayment * termMonths;
  const totalInterest = Math.max(0, totalRepaid - loanAmount);

  // Application form modal inside calculator
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('');
  const [employmentType, setEmploymentType] = useState<'Employed (Permanent)' | 'Contract' | 'Business Owner / Self-Employed' | 'Corporate'>('Employed (Permanent)');
  const [preferredBank, setPreferredBank] = useState('NCBA Bank Kenya');

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    submitFinancing({
      customerName: applicantName,
      phone: applicantPhone,
      email: applicantEmail,
      vehicleId: currentVehicle?.id || 'general',
      vehicleTitle: currentVehicle ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : 'Asset Finance Loan',
      vehiclePrice: price,
      depositAmount: depositAmount,
      termMonths: termMonths,
      monthlyIncome: Number(monthlyIncome) || 0,
      employmentType: employmentType,
      preferredBank: preferredBank,
      estimatedMonthly: monthlyPayment,
      additionalNotes: `Applied via online calculator with ${depositPercent}% deposit over ${termMonths} months.`
    });

    setIsApplying(false);
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Repayment Estimator</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            Asset Finance & Loan Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate your estimated monthly installment with Kenya's leading banking partners.
          </p>
        </div>

        {/* Vehicle Picker if not locked */}
        {!initialVehicle && (
          <div className="w-full md:w-72">
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              Select Vehicle
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleChange(e.target.value)}
              className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model} - {formatPrice(v.price)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Sliders & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        <div className="lg:col-span-7 space-y-6">
          {/* Vehicle Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Vehicle Price ({settings.currencySymbol})
              </label>
              <span className="text-base font-bold text-white font-mono">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={15000000}
              step={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>{formatPrice(1000000)}</span>
              <span>{formatPrice(15000000)}</span>
            </div>
          </div>

          {/* Deposit Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Deposit / Down Payment ({depositPercent}%)
              </label>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {formatPrice(depositAmount)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              step={5}
              value={depositPercent}
              onChange={(e) => setDepositPercent(Number(e.target.value))}
              className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>10% (Min deposit)</span>
              <span>30% (Standard)</span>
              <span>70%</span>
            </div>
          </div>

          {/* Loan Tenure Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Repayment Period
              </label>
              <span className="text-sm font-bold text-white">
                {termMonths} Months ({termMonths / 12} Years)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setTermMonths(term)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition ${
                    termMonths === term
                      ? 'bg-brand-600 border-brand-500 text-white shadow-glow'
                      : 'bg-dark-800 border-slate-700 text-slate-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {term} Mo
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Indicative Bank Interest Rate (% p.a.)
              </label>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {annualRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min={11.0}
              max={18.0}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>11.0%</span>
              <span>13.5% (Typical Bank Rate)</span>
              <span>18.0%</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-dark-950 border border-slate-800">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Estimated Monthly Installment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-500 font-display">
              {formatPrice(monthlyPayment)}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Vehicle Cash Price:</span>
                <span className="font-semibold text-white">{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Deposit ({depositPercent}%):</span>
                <span className="font-semibold text-emerald-400">{formatPrice(depositAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Amount Financed:</span>
                <span className="font-semibold text-white">{formatPrice(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Total Interest:</span>
                <span className="font-semibold text-amber-400">{formatPrice(totalInterest)}</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>Total Loan Repayable:</span>
                <span className="font-bold text-white text-sm">{formatPrice(totalRepaid)}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => setIsApplying(true)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Apply for Asset Financing</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400 leading-relaxed text-center">
              *Monthly payment calculations are estimates for guidance only. Actual terms depend on bank approval.
            </p>
          </div>
        </div>
      </div>

      {/* Application Sub-Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">Asset Financing Application</h4>
                <p className="text-xs text-slate-400">Pre-qualify in minutes for {currentVehicle?.make} {currentVehicle?.model}</p>
              </div>
              <button
                onClick={() => setIsApplying(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-dark-850 border border-slate-750 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block">Estimated Monthly:</span>
                  <span className="text-base font-bold text-brand-400">{formatPrice(monthlyPayment)}/mo</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Deposit:</span>
                  <span className="font-semibold text-emerald-400">{formatPrice(depositAmount)}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kelvin Kariuki"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 712 345 678"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@domain.co.ke"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e: any) => setEmploymentType(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Employed (Permanent)">Employed (Permanent)</option>
                    <option value="Contract">Contract Employee</option>
                    <option value="Business Owner / Self-Employed">Business Owner / Self-Employed</option>
                    <option value="Corporate">Corporate / Company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Net Monthly Income ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    placeholder="e.g. 250000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Financing Partner</label>
                <select
                  value={preferredBank}
                  onChange={(e) => setPreferredBank(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="NCBA Bank Kenya">NCBA Bank Kenya (Up to 90% asset finance)</option>
                  <option value="Stanbic Bank Kenya">Stanbic Bank Kenya</option>
                  <option value="KCB Bank Kenya">KCB Bank Kenya</option>
                  <option value="Co-operative Bank of Kenya">Co-operative Bank of Kenya</option>
                  <option value="Family Bank Kenya">Family Bank Kenya</option>
                  <option value="I&M Bank">I&M Bank</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-glow"
                >
                  Submit Pre-Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
