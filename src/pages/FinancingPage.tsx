import React from 'react';
import { FinanceCalculator } from '../components/FinanceCalculator';
import { TrustGuarantees } from '../components/TrustGuarantees';
import {
  CreditCard,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  HelpCircle,
  Phone
} from 'lucide-react';
import { useDealership } from '../context/DealershipContext';

export const FinancingPage: React.FC = () => {
  const { settings, getWhatsAppLink } = useDealership();

  const banks = [
    { name: 'NCBA Bank Kenya', financing: 'Up to 90% Financing', tenure: 'Up to 60 Months', feature: 'Market Leader in Asset Finance' },
    { name: 'Stanbic Bank Kenya', financing: 'Up to 85% Financing', tenure: 'Up to 60 Months', feature: 'Competitive Interest Margins' },
    { name: 'KCB Bank Kenya', financing: 'Up to 80% Financing', tenure: 'Up to 48 Months', feature: 'Fast Turnaround Time' },
    { name: 'Co-operative Bank', financing: 'Up to 80% Financing', tenure: 'Up to 48 Months', feature: 'Flexible Repayment Structures' },
    { name: 'Family Bank Kenya', financing: 'Up to 80% Financing', tenure: 'Up to 48 Months', feature: 'SME & Business Friendly' },
    { name: 'I&M Bank Kenya', financing: 'Up to 85% Financing', tenure: 'Up to 60 Months', feature: 'Customized Executive Packages' }
  ];

  const requirements = [
    { title: 'Certified 6-Month Bank Statements', desc: 'Stamped bank statements showing consistent personal or business turnover.' },
    { title: 'Proforma Invoice / Quotation', desc: 'Issued directly by Apex Motors with verified vehicle details and chassis number.' },
    { title: '3 Latest Payslips (For Employed)', desc: 'Proof of regular employment or letter of appointment/contract.' },
    { title: 'National ID & KRA PIN Certificate', desc: 'Valid Kenyan National ID Card and KRA Tax PIN.' },
    { title: 'Business Registration (For Self-Employed)', desc: 'Certificate of Incorporation/Registration & CR12 for corporate applicants.' }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Bank Asset Finance Facilitation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Drive Your Dream Car with Easy Bank Asset Financing
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            We partner with Kenya's tier-1 financial institutions to facilitate vehicle asset finance loans with up to 90% financing and fast 48-hour approvals.
          </p>
        </div>

        {/* Interactive Finance Calculator */}
        <div className="mb-16">
          <FinanceCalculator />
        </div>

        {/* Partner Banks Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-display font-bold text-white">Our Official Banking Partners</h2>
            <p className="text-xs text-slate-400 mt-1">Direct tie-ups for accelerated appraisal and pre-approval.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banks.map((bank, idx) => (
              <div
                key={idx}
                className="bg-dark-900 border border-slate-800 rounded-2xl p-6 hover:border-brand-500/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700 flex items-center justify-center text-brand-400 mb-4">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{bank.name}</h3>
                  <p className="text-xs text-brand-400 font-semibold mb-3">{bank.financing}</p>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>• Tenure: {bank.tenure}</p>
                    <p>• {bank.feature}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Process Checklist */}
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Fast-Track Loan Approval</span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Documents Required for Car Loan Approval in Kenya
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our in-house financing advisors assist you with assembling the required paperwork and liaising directly with credit analysts for rapid approval.
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink(undefined, "Hello, I would like guidance on car asset financing requirements.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                >
                  <span>Speak with Asset Finance Advisor</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{req.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
