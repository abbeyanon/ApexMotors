import React, { useState, useEffect } from 'react';
import { useDealership } from '../context/DealershipContext';
import { MessageSquare, Phone, Mail, Clock, Send, X, CheckCircle2 } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const {
    isEnquiryModalOpen,
    setIsEnquiryModalOpen,
    activeModalVehicle,
    setActiveModalVehicle,
    addEnquiry,
    formatPrice
  } = useDealership();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [contactTime, setContactTime] = useState<'Anytime' | 'Morning' | 'Afternoon' | 'Evening'>('Anytime');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync message when activeModalVehicle changes
  useEffect(() => {
    if (activeModalVehicle) {
      setMessage(`Hello, I would like more information and viewing schedule for the ${activeModalVehicle.year} ${activeModalVehicle.make} ${activeModalVehicle.model} [Stock #${activeModalVehicle.stockNo}].`);
    } else {
      setMessage('Hello, I would like to inquire about available vehicles matching my budget.');
    }
  }, [activeModalVehicle]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addEnquiry({
      customerName: name,
      phone,
      email: email || `${phone}@placeholder.co.ke`,
      preferredContactMethod: contactMethod,
      preferredContactTime: contactTime,
      vehicleId: activeModalVehicle?.id,
      vehicleTitle: activeModalVehicle ? `${activeModalVehicle.year} ${activeModalVehicle.make} ${activeModalVehicle.model}` : 'General Enquiry',
      message
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsEnquiryModalOpen(false);
      setActiveModalVehicle(null);
    }, 2000);
  };

  const handleClose = () => {
    setIsEnquiryModalOpen(false);
    setActiveModalVehicle(null);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-dark-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Enquiry Received!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Our sales manager will reach out via {contactMethod} shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Dealership Enquiry</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {activeModalVehicle
                ? `Enquire: ${activeModalVehicle.year} ${activeModalVehicle.make} ${activeModalVehicle.model}`
                : 'Send Us An Enquiry'}
            </h3>
            {activeModalVehicle && (
              <p className="text-xs text-emerald-400 font-semibold mb-4">
                Listed at {formatPrice(activeModalVehicle.price)} • #{activeModalVehicle.stockNo}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faith Mwangi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Preferred Contact</label>
                  <select
                    value={contactMethod}
                    onChange={(e: any) => setContactMethod(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Best Time to Call</label>
                  <select
                    value={contactTime}
                    onChange={(e: any) => setContactTime(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Anytime">Anytime</option>
                    <option value="Morning">Morning (8am - 12pm)</option>
                    <option value="Afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="Evening">Evening (4pm - 7pm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Message *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold hover:bg-dark-750"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
