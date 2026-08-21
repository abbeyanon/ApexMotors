import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDealership } from '../context/DealershipContext';
import {
  Car,
  Heart,
  Scale,
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronDown,
  UserCheck,
  Search,
  DollarSign,
  Sun,
  Moon
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    settings,
    favorites,
    comparison,
    setIsTestDriveModalOpen,
    isAdminLoggedIn,
    logoutAdmin,
    loginAdmin,
    getWhatsAppLink,
    updateSettings,
    theme,
    toggleTheme
  } = useDealership();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleCurrency = () => {
    if (settings.currencyCode === 'KES') {
      updateSettings({ currencyCode: 'USD', currencySymbol: '$' });
    } else {
      updateSettings({ currencyCode: 'KES', currencySymbol: 'KES' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-dark-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-slate-100 dark:bg-dark-900 border-b border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 py-1.5 px-4 hidden md:block transition-colors">
        <div className="max-w-[1550px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open Today: 8:00 AM - 6:30 PM (Ngong Rd & Kiambu Rd Showrooms)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500" />
              <span>150-Point Pre-Purchase Inspection Guaranteed</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Theme Toggle in Top Banner */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white bg-white dark:bg-dark-800 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-brand-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white bg-white dark:bg-dark-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition"
              title="Toggle KES / USD currency conversion"
            >
              <DollarSign className="w-3 h-3 text-amber-500" />
              <span className="font-semibold">{settings.currencyCode}</span>
            </button>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-600 dark:text-brand-500" />
              <span>{settings.phone}</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>

            {/* Quick Admin Toggle */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-rose-500 hover:underline"
                >
                  (Logout)
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  loginAdmin('Super Admin');
                  navigate('/admin');
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-500 transition"
              >
                Staff Portal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-blue-600 to-cyan-500 p-0.5 shadow-glow transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-dark-950 rounded-[10px] flex items-center justify-center">
                <Car className="w-6 h-6 text-brand-600 dark:text-brand-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  APEX
                </span>
                <span className="font-display font-extrabold text-xl tracking-tight text-brand-600 dark:text-brand-500">
                  MOTORS
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase block">
                Premium Car Dealership & Yard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/inventory"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/inventory')
                  ? 'text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Inventory
            </Link>

            <Link
              to="/financing"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/financing')
                  ? 'text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Financing
            </Link>

            <Link
              to="/trade-in"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/trade-in')
                  ? 'text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Sell / Trade-In
            </Link>

            <Link
              to="/services"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/services')
                  ? 'text-brand-600 dark:text-brand-500 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Services
            </Link>

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen('more')}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>Company</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {dropdownOpen === 'more' && (
                <div className="absolute top-full left-0 w-52 py-2 bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in-50 zoom-in-95">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                  >
                    About Apex Motors
                  </Link>
                  <Link
                    to="/reviews"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                  >
                    Customer Testimonials
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                  >
                    Automotive News & Guides
                  </Link>
                  <Link
                    to="/faqs"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                  >
                    Frequently Asked Questions
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                  >
                    Contact & Yard Locations
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle in main bar */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition group"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-brand-600 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Compare vehicles button */}
            <Link
              to="/compare"
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition group"
              title="Compare Vehicles"
            >
              <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {comparison.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg">
                  {comparison.length}
                </span>
              )}
            </Link>

            {/* Saved / Favorites */}
            <Link
              to="/saved"
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 hover:bg-slate-200 dark:hover:bg-dark-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition group"
              title="Saved Vehicles"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Book Test Drive Action Button */}
            <button
              onClick={() => setIsTestDriveModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-500 hover:to-blue-400 text-white text-sm font-semibold shadow-glow transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Test Drive</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-dark-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-600" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={toggleCurrency}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                <span>{settings.currencyCode}</span>
              </button>
            </div>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Dealership</span>
            </a>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/inventory') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Inventory / Marketplace
            </Link>
            <Link
              to="/financing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/financing') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Asset Financing
            </Link>
            <Link
              to="/trade-in"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/trade-in') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Sell / Trade-In Car
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/about') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              About Apex Motors
            </Link>
            <Link
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/reviews') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Customer Reviews
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive('/contact') ? 'bg-brand-600 text-white' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800'
              }`}
            >
              Showroom Yards & Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20"
            >
              Admin & CRM Portal
            </Link>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTestDriveModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Test Drive Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
