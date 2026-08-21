import React, { useState } from 'react';
import { useDealership } from '../context/DealershipContext';
import { Vehicle, Enquiry, TestDriveBooking, FinancingApplication, TradeInRequest } from '../types';
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  CreditCard,
  RefreshCw,
  Settings,
  ShieldAlert,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  Search,
  Filter,
  LogOut,
  UserCheck
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    enquiries,
    updateEnquiryStatus,
    testDrives,
    updateTestDriveStatus,
    financingApps,
    updateFinancingStatus,
    tradeIns,
    updateTradeInStatus,
    settings,
    updateSettings,
    auditLogs,
    salespeople,
    salesRecords,
    formatPrice,
    isAdminLoggedIn,
    adminRole,
    loginAdmin,
    logoutAdmin,
    getWhatsAppLink,
    locations
  } = useDealership();

  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'enquiries' | 'testdrives' | 'financing' | 'tradeins' | 'audit' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Add/Edit Vehicle Modal State
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  // Form states for vehicle
  const [stockNo, setStockNo] = useState('');
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [variant, setVariant] = useState('');
  const [year, setYear] = useState<number>(2021);
  const [price, setPrice] = useState<number>(3500000);
  const [originalPrice, setOriginalPrice] = useState<number>(3700000);
  const [mileage, setMileage] = useState<number>(45000);
  const [engineSize, setEngineSize] = useState('2000cc Petrol');
  const [fuelType, setFuelType] = useState<any>('Petrol');
  const [transmission, setTransmission] = useState<any>('Automatic');
  const [driveType, setDriveType] = useState<any>('2WD / FWD');
  const [bodyType, setBodyType] = useState<any>('SUV');
  const [exteriorColor, setExteriorColor] = useState('Pearl White');
  const [interiorColor, setInteriorColor] = useState('Black Leather');
  const [condition, setCondition] = useState<any>('Foreign Used (Direct Import)');
  const [locationYard, setLocationYard] = useState(locations[0]?.name || 'Main Yard & Headquarters');
  const [status, setStatus] = useState<any>('available');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop');
  const [description, setDescription] = useState('Pristine foreign used unit with certified mileage and full auction sheet documentation.');

  // Dealership settings state
  const [dealerName, setDealerName] = useState(settings.dealershipName);
  const [dealerPhone, setDealerPhone] = useState(settings.phone);
  const [dealerWhatsApp, setDealerWhatsApp] = useState(settings.whatsappNumber);
  const [dealerEmail, setDealerEmail] = useState(settings.email);
  const [dealerAddress, setDealerAddress] = useState(settings.mainAddress);
  const [currencyCode, setCurrencyCode] = useState(settings.currencyCode);
  const [financingRate, setFinancingRate] = useState(settings.defaultFinancingRate);

  // If not logged in, show quick login simulator
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-dark-950">
        <div className="max-w-md w-full bg-dark-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center mx-auto">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Dealership Staff Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Select your administrative role to access inventory & CRM.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => loginAdmin('Super Admin')}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition"
            >
              Sign In as Super Admin (Full Control)
            </button>
            <button
              onClick={() => loginAdmin('Sales Manager')}
              className="w-full py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              Sign In as Sales Manager
            </button>
            <button
              onClick={() => loginAdmin('Inventory Manager')}
              className="w-full py-3 px-4 rounded-xl bg-dark-800 hover:bg-dark-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              Sign In as Inventory Officer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculations for KPI cards
  const totalVehiclesCount = vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === 'available').length;
  const reservedCount = vehicles.filter((v) => v.status === 'reserved').length;
  const soldCount = vehicles.filter((v) => v.status === 'sold').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const pendingTestDrivesCount = testDrives.filter((td) => td.status === 'pending').length;
  const totalStockValue = vehicles
    .filter((v) => v.status !== 'sold')
    .reduce((sum, v) => sum + v.price, 0);

  const openAddModal = () => {
    setEditingVehicleId(null);
    setStockNo(`APX-2024-${String(vehicles.length + 1).padStart(3, '0')}`);
    setMake('Toyota');
    setModel('');
    setVariant('');
    setYear(2021);
    setPrice(3500000);
    setOriginalPrice(3700000);
    setMileage(45000);
    setIsVehicleModalOpen(true);
  };

  const openEditModal = (v: Vehicle) => {
    setEditingVehicleId(v.id);
    setStockNo(v.stockNo);
    setMake(v.make);
    setModel(v.model);
    setVariant(v.variant);
    setYear(v.year);
    setPrice(v.price);
    setOriginalPrice(v.originalPrice || v.price);
    setMileage(v.mileage);
    setEngineSize(v.engineSize);
    setFuelType(v.fuelType);
    setTransmission(v.transmission);
    setDriveType(v.driveType);
    setBodyType(v.bodyType);
    setExteriorColor(v.exteriorColor);
    setInteriorColor(v.interiorColor);
    setCondition(v.condition);
    setLocationYard(v.locationYard);
    setStatus(v.status);
    setIsFeatured(v.isFeatured);
    setIsNewArrival(v.isNewArrival);
    setImageUrl(v.images[0] || '');
    setDescription(v.description);
    setIsVehicleModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !stockNo) return;

    if (editingVehicleId) {
      updateVehicle(editingVehicleId, {
        stockNo,
        make,
        model,
        variant,
        year,
        price,
        originalPrice,
        mileage,
        engineSize,
        fuelType,
        transmission,
        driveType,
        bodyType,
        exteriorColor,
        interiorColor,
        condition,
        locationYard,
        status,
        isFeatured,
        isNewArrival,
        images: [imageUrl],
        description
      });
    } else {
      addVehicle({
        stockNo,
        make,
        model,
        variant,
        year,
        price,
        originalPrice,
        mileage,
        engineSize,
        fuelType,
        transmission,
        driveType,
        bodyType,
        exteriorColor,
        interiorColor,
        condition,
        locationYard,
        status,
        isFeatured,
        isNewArrival,
        images: [
          imageUrl,
          'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
        ],
        features: [
          'Pre-Crash Safety System',
          'Reverse Camera & Sensors',
          'Push Start Button',
          'Alloy Wheels',
          'Touchscreen Infotainment'
        ],
        description,
        warranty: '1 Year Dealer Powertrain Warranty',
        serviceHistory: 'Full certified maintenance logs with pre-delivery service.'
      });
    }

    setIsVehicleModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      dealershipName: dealerName,
      phone: dealerPhone,
      whatsappNumber: dealerWhatsApp,
      email: dealerEmail,
      mainAddress: dealerAddress,
      currencyCode: currencyCode,
      currencySymbol: currencyCode === 'USD' ? '$' : 'KES',
      defaultFinancingRate: financingRate
    });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 py-8">
      <div className="max-w-[1550px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Top Header */}
        <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-display font-black text-xl shadow-glow">
              APX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-extrabold text-white">
                  Dealership Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                  {adminRole}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Apex Motors Kenya • Live Yard Inventory & CRM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2.5 rounded-xl bg-dark-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard KPIs', icon: LayoutDashboard },
            { id: 'inventory', label: `Vehicles (${vehicles.length})`, icon: Car },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Users },
            { id: 'testdrives', label: `Test Drives (${testDrives.length})`, icon: Calendar },
            { id: 'financing', label: `Financing (${financingApps.length})`, icon: CreditCard },
            { id: 'tradeins', label: `Trade-Ins (${tradeIns.length})`, icon: RefreshCw },
            { id: 'audit', label: 'Audit Logs', icon: ShieldAlert },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white border-brand-500 shadow-glow'
                    : 'bg-dark-900 text-slate-400 border-slate-800 hover:text-white hover:bg-dark-850'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW / DASHBOARD KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-dark-900 border border-slate-800 rounded-3xl p-5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Inventory</span>
                <div className="text-3xl font-extrabold text-white font-display mt-1">{totalVehiclesCount} Cars</div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 mt-2">
                  <span>{availableCount} Available</span>
                  <span>•</span>
                  <span className="text-amber-400">{reservedCount} Reserved</span>
                </div>
              </div>

              <div className="bg-dark-900 border border-slate-800 rounded-3xl p-5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Stock Value</span>
                <div className="text-2xl font-extrabold text-white font-display mt-1">{formatPrice(totalStockValue)}</div>
                <p className="text-[11px] text-slate-400 mt-2">Across 3 Showroom Yards</p>
              </div>

              <div className="bg-dark-900 border border-slate-800 rounded-3xl p-5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">New Leads / Enquiries</span>
                <div className="text-3xl font-extrabold text-brand-400 font-display mt-1">{newEnquiriesCount} New</div>
                <p className="text-[11px] text-slate-400 mt-2">{enquiries.length} Total in Pipeline</p>
              </div>

              <div className="bg-dark-900 border border-slate-800 rounded-3xl p-5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pending Test Drives</span>
                <div className="text-3xl font-extrabold text-amber-400 font-display mt-1">{pendingTestDrivesCount} Pending</div>
                <p className="text-[11px] text-emerald-400 mt-2">{testDrives.length} Total Booked</p>
              </div>
            </div>

            {/* Sales Pipeline & Recent Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Recent Leads & Inquiries */}
              <div className="lg:col-span-7 bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-500" />
                    <span>Recent Customer Leads</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-semibold text-brand-400 hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {enquiries.slice(0, 5).map((enq) => (
                    <div key={enq.id} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{enq.customerName}</span>
                          <span className="text-slate-400">({enq.phone})</span>
                        </div>
                        <p className="text-slate-300 font-medium mt-0.5">{enq.vehicleTitle}</p>
                        <p className="text-slate-400 italic line-clamp-1 mt-0.5">"{enq.message}"</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-bold uppercase text-[10px]">
                          {enq.status}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-1">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Sales Team Overview */}
              <div className="lg:col-span-5 bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Sales Executive Performance</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {salespeople.map((sp) => (
                    <div key={sp.id} className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sp.avatar} alt={sp.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-white">{sp.name}</h4>
                          <p className="text-[11px] text-slate-400">{sp.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-400 font-display block">
                          {formatPrice(sp.revenueGenerated)}
                        </span>
                        <span className="text-[10px] text-slate-400">{sp.totalSales} Units Closed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY CRUD */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-dark-900 border border-slate-800 p-4 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter stock #, make, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                onClick={openAddModal}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle to Yard</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Stock #</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Mileage</th>
                      <th className="p-4">Showroom Yard</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {vehicles
                      .filter((v) =>
                        searchTerm
                          ? v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            v.stockNo.toLowerCase().includes(searchTerm.toLowerCase())
                          : true
                      )
                      .map((car) => (
                        <tr key={car.id} className="hover:bg-dark-850/50 transition">
                          <td className="p-4 font-mono text-brand-400 font-bold">#{car.stockNo}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={car.images[0]} alt={car.model} className="w-12 h-9 object-cover rounded-lg" />
                              <div>
                                <span className="font-bold text-white block">{car.year} {car.make} {car.model}</span>
                                <span className="text-[11px] text-slate-400">{car.variant}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-bold text-white font-display">{formatPrice(car.price)}</td>
                          <td className="p-4 text-slate-300">{car.mileage.toLocaleString()} km</td>
                          <td className="p-4 text-slate-300">{car.locationYard}</td>
                          <td className="p-4">
                            <select
                              value={car.status}
                              onChange={(e: any) => updateVehicle(car.id, { status: e.target.value })}
                              className="bg-dark-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                            >
                              <option value="available">Available</option>
                              <option value="reserved">Reserved</option>
                              <option value="sold">Sold</option>
                              <option value="pending_inspection">Pending Inspection</option>
                            </select>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditModal(car)}
                              className="p-1.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteVehicle(car.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES CRM */}
        {activeTab === 'enquiries' && (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Customer Enquiries & Sales Pipeline</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Contact Via</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Direct Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-dark-850/50">
                      <td className="p-4">
                        <span className="font-bold text-white block">{enq.customerName}</span>
                        <span className="text-slate-400">{enq.phone}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-200">{enq.vehicleTitle || 'General'}</td>
                      <td className="p-4 text-slate-300 max-w-xs">{enq.message}</td>
                      <td className="p-4 text-brand-400 font-medium">{enq.preferredContactMethod}</td>
                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e: any) => updateEnquiryStatus(enq.id, e.target.value)}
                          className="bg-dark-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="interested">Interested</option>
                          <option value="test_drive">Test Drive Scheduled</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="deposit">Deposit Pending</option>
                          <option value="sold">Sold</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.customerName}, following up on your inquiry with Apex Motors.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900 text-xs font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TEST DRIVES */}
        {activeTab === 'testdrives' && (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Test Drive Appointments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Yard Location</th>
                    <th className="p-4">Date & Time Slot</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {testDrives.map((td) => (
                    <tr key={td.id} className="hover:bg-dark-850/50">
                      <td className="p-4">
                        <span className="font-bold text-white block">{td.customerName}</span>
                        <span className="text-slate-400">{td.phone}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-200">{td.vehicleTitle}</td>
                      <td className="p-4 text-slate-300">{td.yardLocation}</td>
                      <td className="p-4 font-mono text-amber-400">{td.date} @ {td.timeSlot}</td>
                      <td className="p-4">
                        <select
                          value={td.status}
                          onChange={(e: any) => updateTestDriveStatus(td.id, e.target.value)}
                          className="bg-dark-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="no_show">No Show</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => updateTestDriveStatus(td.id, 'confirmed')}
                          className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs mr-2"
                        >
                          Confirm
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FINANCING APPLICATIONS */}
        {activeTab === 'financing' && (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Bank Asset Finance Applications</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Financing Parameters</th>
                    <th className="p-4">Bank</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {financingApps.map((fin) => (
                    <tr key={fin.id} className="hover:bg-dark-850/50">
                      <td className="p-4">
                        <span className="font-bold text-white block">{fin.customerName}</span>
                        <span className="text-slate-400">{fin.phone}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-200">{fin.vehicleTitle}</td>
                      <td className="p-4 space-y-0.5">
                        <p>Deposit: <strong className="text-emerald-400">{formatPrice(fin.depositAmount)}</strong></p>
                        <p>Est. Monthly: <strong className="text-brand-400">{formatPrice(fin.estimatedMonthly)}/mo</strong></p>
                        <p>Tenure: {fin.termMonths} Months</p>
                      </td>
                      <td className="p-4 text-slate-300">{fin.preferredBank}</td>
                      <td className="p-4">
                        <select
                          value={fin.status}
                          onChange={(e: any) => updateFinancingStatus(fin.id, e.target.value)}
                          className="bg-dark-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="bank_pre_approved">Pre-Approved</option>
                          <option value="approved">Approved</option>
                          <option value="declined">Declined</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: TRADE-IN VALUATIONS */}
        {activeTab === 'tradeins' && (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Trade-In Valuations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Car to Trade-In</th>
                    <th className="p-4">Asking Price</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Valuation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tradeIns.map((t) => (
                    <tr key={t.id} className="hover:bg-dark-850/50">
                      <td className="p-4">
                        <span className="font-bold text-white block">{t.customerName}</span>
                        <span className="text-slate-400">{t.phone}</span>
                      </td>
                      <td className="p-4 font-bold text-brand-400">
                        {t.currentCarYear} {t.currentCarMake} {t.currentCarModel}
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {t.currentCarMileage.toLocaleString()} km • {t.currentCarTransmission}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-white">{formatPrice(t.expectedPrice)}</td>
                      <td className="p-4 text-slate-300">{t.currentCarCondition}</td>
                      <td className="p-4">
                        <select
                          value={t.status}
                          onChange={(e: any) => updateTradeInStatus(t.id, e.target.value)}
                          className="bg-dark-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="valuation_completed">Valuation Completed</option>
                          <option value="offer_sent">Offer Sent</option>
                          <option value="accepted">Accepted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-dark-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">System Audit & Action Logs</h3>
            <div className="divide-y divide-slate-800/80 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-brand-400">{log.action}</span>
                    <p className="font-semibold text-white mt-0.5">{log.entity}</p>
                    <p className="text-slate-400 mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500 shrink-0">
                    <span>{log.user}</span>
                    <span className="block">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-dark-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Dealership Settings & Currency Configuration
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Dealership Name</label>
                <input
                  type="text"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={dealerPhone}
                    onChange={(e) => setDealerPhone(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (e.g. 2547...)</label>
                  <input
                    type="text"
                    value={dealerWhatsApp}
                    onChange={(e) => setDealerWhatsApp(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={dealerEmail}
                  onChange={(e) => setDealerEmail(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Default Display Currency</label>
                  <select
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="KES">KES — Kenyan Shilling</option>
                    <option value="USD">USD — US Dollar ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Default Asset Finance Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={financingRate}
                    onChange={(e) => setFinancingRate(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Main Yard Physical Address</label>
                <input
                  type="text"
                  value={dealerAddress}
                  onChange={(e) => setDealerAddress(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-glow transition"
              >
                Save Dealership Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add / Edit Vehicle Modal */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-dark-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-xl font-bold text-white">
                {editingVehicleId ? 'Edit Vehicle Information' : 'Add Vehicle to Inventory'}
              </h3>
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="p-1 rounded-lg bg-dark-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock Number *</label>
                  <input
                    type="text"
                    required
                    value={stockNo}
                    onChange={(e) => setStockNo(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Make *</label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Model *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Variant / Trim</label>
                  <input
                    type="text"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mileage (KM)</label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Selling Price (KES) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Original Price (For Discount Display)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Engine Size</label>
                  <input
                    type="text"
                    value={engineSize}
                    onChange={(e) => setEngineSize(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e: any) => setFuelType(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e: any) => setTransmission(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Body Style</label>
                  <select
                    value={bodyType}
                    onChange={(e: any) => setBodyType(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Crossover">Crossover</option>
                    <option value="Pickup / Double Cabin">Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Showroom Location</label>
                  <select
                    value={locationYard}
                    onChange={(e) => setLocationYard(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Featured Photo Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded bg-dark-800 text-brand-500"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded bg-dark-800 text-brand-500"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-dark-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-glow"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
