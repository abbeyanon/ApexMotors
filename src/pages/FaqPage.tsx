import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Apex Motors verify genuine vehicle mileage?',
      a: 'Every Japanese and UK foreign-used import in our yard comes with verified auction inspection sheets and QISJ / JEVIC export verification certificates. We never alter odometers and guarantee 100% genuine mileage.'
    },
    {
      q: 'What is included in the 150-Point Pre-Purchase Inspection?',
      a: 'Our inspection covers computerized OBD-II engine and transmission diagnostic scanning, brake pad and disc wear, suspension bushings, tyre tread depth, chassis frame alignment, fluid quality, and electronics.'
    },
    {
      q: 'How does Bank Asset Financing work through Apex Motors?',
      a: 'We have partnerships with NCBA, Stanbic, KCB, Co-operative Bank, and Family Bank. Once you select a vehicle, we issue a proforma invoice and submit your loan application. Approvals typically take 24 to 48 hours with deposits as low as 10% to 20%.'
    },
    {
      q: 'Can I trade in my older car for a newer model?',
      a: 'Yes! Bring your car to any of our showroom yards for a free 20-minute mechanical appraisal. The agreed valuation amount is deducted directly from the purchase price of your chosen upgrade.'
    },
    {
      q: 'How long does NTSA TIMS logbook transfer take?',
      a: 'We handle all TIMS/NTSA transfer logistics. Transfers are initiated immediately upon completion of payment and the digital logbook is reflected in your NTSA portal within 48 to 72 hours.'
    },
    {
      q: 'Can I book a private test drive before deciding?',
      a: 'Absolutely. You can schedule a complimentary test drive on our website for any day of the week. Please bring a valid Kenyan or international driving license.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Everything you need to know about buying, financing, and trading in vehicles at Apex Motors.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-dark-900 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 text-base font-bold text-white hover:text-brand-400 transition"
              >
                <span>{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-brand-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
