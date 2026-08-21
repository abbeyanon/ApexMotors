import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-display font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2024</p>
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>Apex Motors Kenya Ltd. is committed to protecting your privacy in compliance with the Kenya Data Protection Act, 2019.</p>
          <h3 className="text-base font-bold text-white">1. Information We Collect</h3>
          <p>We collect personal information that you provide when enquiring about a vehicle, booking a test drive, applying for asset financing, or requesting a trade-in valuation (e.g. name, phone number, email, and preferred financing parameters).</p>
          <h3 className="text-base font-bold text-white">2. Use of Information</h3>
          <p>Your details are used strictly to communicate vehicle availability, schedule showroom visits, process bank asset finance documentation with your consent, and facilitate NTSA logbook transfers.</p>
          <h3 className="text-base font-bold text-white">3. Security</h3>
          <p>We implement industry-standard encryption and security protocols to safeguard your personal data against unauthorized disclosure.</p>
        </div>
      </div>
    </div>
  );
};
