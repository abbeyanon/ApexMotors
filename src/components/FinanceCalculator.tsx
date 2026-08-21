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
    <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Repayment Estimator</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            Asset Finance & Loan Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Calculate your estimated monthly installment with Kenya's leading banking partners.
          </p>
        </div>

        {/* Vehicle Picker if not locked */}
        {!initialVehicle && (
          <div className="w-full md:w-72">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
              Selected Vehicle
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => handleVehicleChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model} ({formatPrice(v.price)})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Sliders and Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Vehicle Price
              </label>
              <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="20000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-dark-750 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>KES 1.0M</span>
              <span>KES 10.0M</span>
              <span>KES 20.0M</span>
            </div>
          </div>

          {/* Deposit Percentage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Down Payment / Deposit ({depositPercent}%)
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {formatPrice(depositAmount)}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {[10, 20, 30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDepositPercent(pct)}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    depositPercent === pct
                      ? 'bg-brand-600 text-white border-brand-600 shadow-glow'
                      : 'bg-slate-50 dark:bg-dark-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Repayment Term (Months) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Loan Duration / Term
              </label>
              <span className="text-sm font-bold text-brand-600 dark:text-brand-400 font-mono">
                {termMonths} Months ({termMonths / 12} Years)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTermMonths(m)}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    termMonths === m
                      ? 'bg-brand-600 text-white border-brand-600 shadow-glow'
                      : 'bg-slate-50 dark:bg-dark-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                  }`}
                >
                  {m} Mo ({m / 12}Y)
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Indicative Bank Interest Rate
              </label>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {annualRate}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="11.5"
              max="16.5"
              step="0.25"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-dark-750 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>11.5% (Special Promotion)</span>
              <span>13.5% (Standard Bank Rate)</span>
              <span>16.5%</span>
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-750">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Estimated Monthly Repayment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                {formatPrice(monthlyPayment)}
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> / month</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Total Vehicle Price:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Deposit Amount ({depositPercent}%):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(depositAmount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Financed Loan Amount:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Total Loan Duration:</span>
                <span className="font-bold text-slate-900 dark:text-white">{termMonths} Months</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Estimated Total Interest:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(totalInterest)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-[11px] text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>We facilitate bank pre-approval within 48 hours. Up to 90% financing available.</span>
            </div>
          </div>

          <button
            onClick={() => setIsApplying(true)}
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <span>Apply for Pre-Qualification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded Financing Pre-Qualification Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Asset Finance Pre-Qualification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Vehicle: <strong>{currentVehicle?.year} {currentVehicle?.make} {currentVehicle?.model}</strong> (Financing {formatPrice(loanAmount)})
            </p>

            <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kelvin Kariuki"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7..."
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Monthly Net Income (KES)</label>
                  <input
                    type="number"
                    placeholder="e.g. 150000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Employment Status</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Employed (Permanent)">Employed (Permanent)</option>
                    <option value="Contract">Contract</option>
                    <option value="Business Owner / Self-Employed">Business Owner / Self-Employed</option>
                    <option value="Corporate">Corporate / Company</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase tracking-wider">Preferred Banking Partner</label>
                <select
                  value={preferredBank}
                  onChange={(e) => setPreferredBank(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="NCBA Bank Kenya">NCBA Bank Kenya (Preferred Partner)</option>
                  <option value="Stanbic Bank Kenya">Stanbic Bank Kenya</option>
                  <option value="KCB Bank Kenya">KCB Bank Kenya</option>
                  <option value="Co-operative Bank">Co-operative Bank of Kenya</option>
                  <option value="Family Bank Kenya">Family Bank Kenya</option>
                  <option value="Absa Bank Kenya">Absa Bank Kenya</option>
                  <option value="I&M Bank Kenya">I&M Bank Kenya</option>
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="w-1/3 py-3 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-dark-750"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
