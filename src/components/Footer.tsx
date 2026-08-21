import React from 'react';
import { Link } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  CreditCard,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, locations, getWhatsAppLink } = useDealership();

  return (
    <footer className="bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 pt-16 pb-24 md:pb-12 transition-colors">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-600 to-cyan-500 p-0.5 shadow-glow">
                <div className="w-full h-full bg-white dark:bg-dark-950 rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-brand-600 dark:text-brand-500" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">APEX</span>
                <span className="font-display font-extrabold text-xl tracking-tight text-brand-600 dark:text-brand-500">MOTORS</span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Kenya's premier automotive dealership & yard. Certified foreign-used direct imports, brand-new SUVs, and verified vehicles with 150-point technical inspection and warranty.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Dealership</span>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-dark-800 text-xs font-semibold transition"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500" />
                <span>Direct Line</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-semibold tracking-wider uppercase">Vehicles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/inventory" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  All Inventory
                </Link>
              </li>
              <li>
                <Link to="/inventory?badge=new" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/inventory?badge=featured" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Featured Cars
                </Link>
              </li>
              <li>
                <Link to="/inventory?make=Toyota" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Toyota Vehicles
                </Link>
              </li>
              <li>
                <Link to="/inventory?make=Mercedes-Benz" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Mercedes-Benz
                </Link>
              </li>
              <li>
                <Link to="/inventory?bodyType=SUV" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  SUVs & 4x4s
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Vehicle Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Financing */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-semibold tracking-wider uppercase">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/financing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Asset Finance & Loan Calculator
                </Link>
              </li>
              <li>
                <Link to="/trade-in" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Trade-In / Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  150-Point Technical Inspection
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Importation on Order
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Buying Guides & Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Yards & Contact */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white text-sm font-semibold tracking-wider uppercase">Showroom Yards</h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-200">Main Yard & HQ</p>
                <p className="text-slate-500 dark:text-slate-400">Ngong Road, Adams Arcade, Nairobi</p>
                <p className="text-slate-400 dark:text-slate-500">Mon - Sat: 8:00 AM - 6:30 PM</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-200">Kiambu Road Luxury Yard</p>
                <p className="text-slate-500 dark:text-slate-400">Opp. CID HQ, Kiambu Road, Nairobi</p>
                <p className="text-slate-400 dark:text-slate-500">Mon - Sat: 8:30 AM - 6:00 PM</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-200">Mombasa Road Showroom</p>
                <p className="text-slate-500 dark:text-slate-400">Near NextGen Mall, Nairobi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {new Date().getFullYear()} Apex Motors Kenya Ltd. All Rights Reserved.</span>
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/faqs" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              FAQs
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Authorized Banking Partners:</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">NCBA • Stanbic • KCB • Co-op Bank • Family Bank</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
