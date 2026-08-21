import React from 'react';
import { TrustGuarantees } from '../components/TrustGuarantees';
import { useDealership } from '../context/DealershipContext';
import { Award, ShieldCheck, Users, Building2, CheckCircle2, Clock, Car, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { salespeople, locations } = useDealership();

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Over 15 Years of Automotive Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Setting the Benchmark for Quality Vehicles in Kenya
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Founded on the pillars of integrity, radical vehicle inspection transparency, and client obsession, Apex Motors is Nairobi’s premier luxury and family automotive destination.
          </p>
        </div>

        {/* Story & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Our Heritage</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Revolutionizing the Car Buying Experience Across East Africa
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Established in Nairobi in 2009, Apex Motors began with a singular mission: to eradicate the anxieties, odometer tampering, and undisclosed defects that too often plague used car transactions in the region.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Today, with three premier showroom yards located on Ngong Road, Kiambu Road, and Mombasa Road, we stock over 150 meticulously checked Japanese and European direct imports, brand-new executive SUVs, and certified clean trade-ins.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
                <div className="text-2xl font-bold text-white font-display">15+</div>
                <div className="text-xs text-slate-400">Years in Operation</div>
              </div>
              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800">
                <div className="text-2xl font-bold text-brand-500 font-display">1,800+</div>
                <div className="text-xs text-slate-400">Cars Delivered</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop"
                alt="Apex Motors Showroom Yard"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                <p className="font-bold text-white mb-0.5">Main Yard & Headquarters</p>
                <p>Ngong Road, Nairobi — Featuring climate-controlled inspection bay and private customer lounge.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center font-bold">
              🎯
            </div>
            <h3 className="text-lg font-bold text-white">Our Mission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To empower African car buyers with uncompromised vehicular safety, verified provenance, transparent valuation, and tailored financing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              👁️
            </div>
            <h3 className="text-lg font-bold text-white">Our Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To be the most respected automotive dealership ecosystem in East and Central Africa, synonymous with trust and quality.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              💎
            </div>
            <h3 className="text-lg font-bold text-white">Core Values</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrity in every vehicle inspection, radical pricing honesty, prompt client communication, and dedicated after-sales care.
            </p>
          </div>
        </div>

        {/* The 150-Point Technical Inspection Standards */}
        <TrustGuarantees />

        {/* Leadership Team */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Meet Our Leadership Team</h2>
            <p className="text-xs text-slate-400 mt-1">Dedicated automotive specialists committed to your driving satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {salespeople.map((sp) => (
              <div key={sp.id} className="bg-dark-900 border border-slate-800 rounded-2xl p-6 text-center">
                <img
                  src={sp.avatar}
                  alt={sp.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-brand-500 mb-4"
                />
                <h3 className="text-base font-bold text-white">{sp.name}</h3>
                <p className="text-xs text-brand-400 font-semibold mb-2">{sp.role}</p>
                <p className="text-xs text-slate-400">📞 {sp.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
