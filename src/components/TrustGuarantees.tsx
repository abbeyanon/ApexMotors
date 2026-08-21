import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Clock, FileCheck, Wrench, Sparkles, Building2 } from 'lucide-react';

export const TrustGuarantees: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: '150-Point Technical Inspection',
      desc: 'Every vehicle undergoes a computerized OBD-II scan, engine compression test, chassis structural check, and road test before listing.'
    },
    {
      icon: FileCheck,
      title: 'Verified Genuine Mileage & JEVIC',
      desc: '100% authentic odometer readings backed by official Japanese/UK export certificates and QISJ/JEVIC pre-shipment documentation.'
    },
    {
      icon: Award,
      title: '1 to 2 Years Dealership Warranty',
      desc: 'Comprehensive powertrain warranty covering engine, gearbox, differential, and hybrid battery components for complete peace of mind.'
    },
    {
      icon: Building2,
      title: 'Up to 90% Bank Asset Financing',
      desc: 'Pre-approved partnerships with NCBA, Stanbic, KCB, Co-op Bank, and Family Bank with fast 48-hour loan approval facilitation.'
    },
    {
      icon: CheckCircle2,
      title: 'Clean NTSA Logbook Transfer',
      desc: 'Zero legal encumbrances or logbook disputes. We handle TIMS/NTSA transfer directly to your name within 48 to 72 hours.'
    },
    {
      icon: Wrench,
      title: 'Pre-Delivery Service & Detailing',
      desc: 'Fresh engine oil and filter change, full interior vacuum and steam cleaning, exterior 3-stage buffing and detailing before handover.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-dark-900 border-y border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Apex Motors Trust Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Discerning Drivers Choose Apex Motors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            We eliminate the uncertainty from buying a car in Kenya through rigorous verification, transparent pricing, and unwavering after-sales support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-dark-950/80 border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
