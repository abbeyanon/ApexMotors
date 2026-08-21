import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Car,
  Plane,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Wrench,
  FileCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { setIsTradeInModalOpen, setIsTestDriveModalOpen, getWhatsAppLink } = useDealership();

  const services = [
    {
      icon: Car,
      title: 'Certified Vehicle Sales',
      desc: 'Browse a premier selection of inspected Japanese and UK foreign-used imports, luxury SUVs, and clean locally used vehicles with full dealer warranty.',
      cta: 'Explore Cars',
      link: '/inventory'
    },
    {
      icon: CreditCard,
      title: 'Bank Asset Finance Facilitation',
      desc: 'Get pre-approved for up to 90% financing through our tier-1 bank partnerships with NCBA, Stanbic, KCB, and Co-op Bank with fast 48-hour approvals.',
      cta: 'Financing Calculator',
      link: '/financing'
    },
    {
      icon: RefreshCw,
      title: 'Car Trade-In & Instant Buyout',
      desc: 'Upgrade your vehicle with transparent, market-competitive valuations. Use your old car as down payment or receive instant cash payout.',
      cta: 'Request Valuation',
      action: () => setIsTradeInModalOpen(true)
    },
    {
      icon: Plane,
      title: 'Custom Importation on Order',
      desc: 'Looking for a specific trim, color, or ultra-low mileage vehicle? We import directly from Japan (USS auctions) and the UK with full door-to-door clearance.',
      cta: 'Inquire on Import',
      link: '/contact'
    },
    {
      icon: ShieldCheck,
      title: '150-Point Technical Pre-Purchase Inspection',
      desc: 'Computerized diagnostic scanner report, paint thickness gauge analysis, chassis integrity evaluation, and compression testing.',
      cta: 'Learn Inspection Process',
      link: '/about'
    },
    {
      icon: Wrench,
      title: 'Auto Detailing & Ceramic Coating',
      desc: 'Professional 3-stage paint correction, leather conditioning, engine bay detailing, and 9H ceramic coating protection before handover.',
      cta: 'Contact Detailing',
      link: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Automotive Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            End-to-End Dealership Services
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            From vehicle sourcing and inspection to asset financing, logbook transfers, and trade-in valuations, we handle everything under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-dark-900 border border-slate-800 rounded-3xl p-8 hover:border-brand-500/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                {srv.link ? (
                  <Link
                    to={srv.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={srv.action}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition text-left"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
