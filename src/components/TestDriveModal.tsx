import React, { useState, useEffect } from 'react';
import { useDealership } from '../context/DealershipContext';
import { Calendar, Clock, MapPin, Car, ShieldCheck, CheckCircle2, AlertCircle, X } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM'
];

export const TestDriveModal: React.FC = () => {
  const {
    vehicles,
    locations,
    isTestDriveModalOpen,
    setIsTestDriveModalOpen,
    activeModalVehicle,
    setActiveModalVehicle,
    bookTestDrive,
    testDrives
  } = useDealership();

  const [selectedVehicleId, setSelectedVehicleId] = useState(
    activeModalVehicle?.id || (vehicles[0]?.id ?? '')
  );

  // Sync selected vehicle whenever activeModalVehicle changes
  useEffect(() => {
    if (activeModalVehicle) {
      setSelectedVehicleId(activeModalVehicle.id);
    }
  }, [activeModalVehicle]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [selectedYard, setSelectedYard] = useState(locations[0]?.name || 'Main Yard & Headquarters');
  const [selectedDate, setSelectedDate] = useState(minDateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[1]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isTestDriveModalOpen) return null;

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || activeModalVehicle || vehicles[0];

  const isSlotTaken = (slot: string) => {
    return testDrives.some(
      (td) =>
        td.vehicleId === selectedVehicleId &&
        td.date === selectedDate &&
        td.timeSlot === slot &&
        td.status !== 'cancelled'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedVehicle) return;

    const res = bookTestDrive({
      customerName,
      phone: customerPhone,
      email: customerEmail,
      vehicleId: selectedVehicle.id,
      vehicleTitle: `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.variant})`,
      yardLocation: selectedYard,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes: notes || undefined
    });

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsTestDriveModalOpen(false);
        setActiveModalVehicle(null);
      }, 2400);
    }
  };

  const handleClose = () => {
    setIsTestDriveModalOpen(false);
    setActiveModalVehicle(null);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-dark-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Test Drive Booked!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              We look forward to hosting you on <strong>{selectedDate}</strong> at <strong>{selectedTimeSlot}</strong> at our {selectedYard}. A confirmation SMS has been dispatched.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Book An Exclusive Test Drive</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              Experience the Drive
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complimentary, no-obligation test drive with our certified automotive specialists.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Vehicle Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Vehicle of Interest *
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} ({v.variant}) - #{v.stockNo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Showroom Location Picker */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Preferred Yard / Showroom Location *
                </label>
                <select
                  value={selectedYard}
                  onChange={(e) => setSelectedYard(e.target.value)}
                  className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.address})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Select Time Slot *
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                  >
                    {TIME_SLOTS.map((slot) => {
                      const taken = isSlotTaken(slot);
                      return (
                        <option key={slot} value={slot} disabled={taken}>
                          {slot} {taken ? '(Unavailable - Booked)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. James Kuria"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="james@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Special Requests or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please arrange for a child safety seat or test drive on rough road terrain."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-dark-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-brand-950/40 border border-brand-500/20 rounded-xl text-slate-300 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Please carry a valid driving license for the test drive session.</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-3 rounded-xl bg-dark-800 text-slate-300 font-semibold hover:bg-dark-750 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-500 hover:to-blue-400 text-white font-bold text-sm shadow-glow transition"
                >
                  Confirm Test Drive Booking
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
