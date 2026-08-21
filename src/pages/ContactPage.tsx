import React, { useState } from 'react';
import { useDealership } from '../context/DealershipContext';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { locations, settings, addEnquiry, getWhatsAppLink } = useDealership();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Vehicle Inquiry');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    addEnquiry({
      customerName: name,
      phone,
      email: email || `${phone}@contact.co.ke`,
      preferredContactMethod: 'WhatsApp',
      preferredContactTime: 'Anytime',
      message: `[Subject: ${subject}] ${message}`
    });

    setIsSuccess(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-12">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Contact Apex Motors Kenya
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Have a question about a specific car, asset finance, or trade-in valuation? Reach out directly or visit any of our showroom yards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6">Our sales consultants respond within 30 minutes during business hours.</p>

            {isSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs text-slate-300">Thank you for reaching out. We will respond promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Mutua"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 7..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@domain.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Vehicle Purchase Inquiry">Vehicle Purchase Inquiry</option>
                    <option value="Bank Asset Financing">Bank Asset Financing</option>
                    <option value="Trade-In Valuation">Trade-In Valuation</option>
                    <option value="Import On Order">Direct Import on Order</option>
                    <option value="After-Sales & Warranty Support">After-Sales & Warranty Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're looking for or how we can assist you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-500 hover:to-blue-400 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct channels & Quick Connect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white">Direct Contacts</h3>

              <div className="space-y-4 text-xs">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-950 border border-slate-800 hover:border-slate-700 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">General Inquiries</span>
                    <span className="text-sm font-bold text-white">{settings.phone}</span>
                  </div>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-emerald-300 block">WhatsApp Desk</span>
                    <span className="text-sm font-bold text-white">Instant Chat & Video Walkarounds</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-950 border border-slate-800 hover:border-slate-700 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Support</span>
                    <span className="text-sm font-bold text-white">{settings.email}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Showroom Yards Directory */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Our Showroom Yards in Nairobi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white">{loc.name}</h3>
                  {loc.isMain && (
                    <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 text-[10px] font-bold uppercase">
                      HQ Yard
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{loc.address}, {loc.city}</p>
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                  <p>🕒 {loc.openingHours}</p>
                  <p>📞 {loc.phone}</p>
                  <p>✉️ {loc.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
