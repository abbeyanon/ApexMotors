import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-display font-extrabold text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: August 2024</p>
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h3 className="text-base font-bold text-white">1. Vehicle Availability & Reservation</h3>
          <p>Vehicle availability is subject to prior sale. A vehicle is formally marked as 'Reserved' only upon receipt and confirmation of a refundable or non-refundable reservation deposit agreed upon with Apex Motors.</p>
          <h3 className="text-base font-bold text-white">2. Financing Estimates</h3>
          <p>Calculations provided by the online Asset Finance Estimator are indicative guides only. Final approval, repayment schedules, and interest rates are determined solely by partner lending banks.</p>
          <h3 className="text-base font-bold text-white">3. Test Drives</h3>
          <p>Test drives require the customer to present a valid driving license. Apex Motors reserves the right to reschedule or decline a test drive session in case of extreme weather or road conditions.</p>
        </div>
      </div>
    </div>
  );
};
