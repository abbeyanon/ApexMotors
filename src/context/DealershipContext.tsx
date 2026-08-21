import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vehicle,
  Enquiry,
  TestDriveBooking,
  FinancingApplication,
  TradeInRequest,
  Review,
  BlogPost,
  LocationYard,
  DealershipSettings,
  Salesperson,
  AuditLog,
  SalesRecord,
  FilterState
} from '../types';
import {
  initialVehicles,
  initialSettings,
  initialLocations,
  initialReviews,
  initialBlogPosts,
  initialSalespeople,
  initialAuditLogs,
  initialSales
} from '../data/mockData';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface DealershipContextType {
  vehicles: Vehicle[];
  settings: DealershipSettings;
  locations: LocationYard[];
  reviews: Review[];
  blogPosts: BlogPost[];
  salespeople: Salesperson[];
  auditLogs: AuditLog[];
  salesRecords: SalesRecord[];
  
  // User customer states
  favorites: string[]; // vehicle IDs
  comparison: string[]; // vehicle IDs (up to 4)
  enquiries: Enquiry[];
  testDrives: TestDriveBooking[];
  financingApps: FinancingApplication[];
  tradeIns: TradeInRequest[];
  
  // Toast notifications
  notifications: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;

  // Active filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Helpers
  formatPrice: (amount: number) => string;
  toggleFavorite: (vehicleId: string) => void;
  toggleComparison: (vehicleId: string) => void;
  clearComparison: () => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  getWhatsAppLink: (vehicle?: Vehicle, customText?: string) => string;

  // Actions
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => void;
  
  bookTestDrive: (booking: Omit<TestDriveBooking, 'id' | 'createdAt' | 'status'>) => { success: boolean; message: string };
  updateTestDriveStatus: (id: string, status: TestDriveBooking['status']) => void;
  
  submitFinancing: (app: Omit<FinancingApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateFinancingStatus: (id: string, status: FinancingApplication['status']) => void;
  
  submitTradeIn: (req: Omit<TradeInRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateTradeInStatus: (id: string, status: TradeInRequest['status'], estimatedOffer?: number) => void;
  
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'viewsCount' | 'enquiriesCount'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  
  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved' | 'isFeatured'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  
  updateSettings: (newSettings: Partial<DealershipSettings>) => void;
  
  // Admin & CRM
  isAdminLoggedIn: boolean;
  adminRole: string;
  loginAdmin: (role?: string) => void;
  logoutAdmin: () => void;
  
  // Selected modal states helper
  activeModalVehicle: Vehicle | null;
  setActiveModalVehicle: (vehicle: Vehicle | null) => void;
  isTestDriveModalOpen: boolean;
  setIsTestDriveModalOpen: (open: boolean) => void;
  isFinanceModalOpen: boolean;
  setIsFinanceModalOpen: (open: boolean) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  isTradeInModalOpen: boolean;
  setIsTradeInModalOpen: (open: boolean) => void;
}

const defaultFilters: FilterState = {
  search: '',
  make: '',
  model: '',
  bodyType: '',
  fuelType: '',
  transmission: '',
  driveType: '',
  condition: '',
  locationYard: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  maxMileage: '',
  sortBy: 'newest'
};

const DealershipContext = createContext<DealershipContextType | undefined>(undefined);

export const DealershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states with versioned localStorage key to avoid stale data
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('apex_vehicles_v4');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [settings, setSettings] = useState<DealershipSettings>(() => {
    const saved = localStorage.getItem('apex_settings_v3_v3');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [locations] = useState<LocationYard[]>(initialLocations);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('apex_reviews_v2');
    return saved ? JSON.parse(saved) : initialReviews;
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [salespeople] = useState<Salesperson[]>(initialSalespeople);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('apex_audit_logs_v2');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>(() => {
    const saved = localStorage.getItem('apex_sales_v2');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('apex_favorites_v2');
    return saved ? JSON.parse(saved) : ['car-1', 'car-4'];
  });

  const [comparison, setComparison] = useState<string[]>(() => {
    const saved = localStorage.getItem('apex_comparison_v2');
    return saved ? JSON.parse(saved) : ['car-1', 'car-3'];
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('apex_enquiries_v2');
    return saved ? JSON.parse(saved) : [
      {
        id: 'enq-1',
        customerName: 'Kiprono Cheruiyot',
        email: 'kiprono@example.com',
        phone: '+254 722 555 123',
        preferredContactMethod: 'WhatsApp',
        preferredContactTime: 'Morning',
        vehicleId: 'car-1',
        vehicleTitle: 'Toyota Harrier 2021 Elegance Leather Package',
        message: 'Is the auction sheet available? Can we view the car on Ngong Road tomorrow morning?',
        status: 'new',
        assignedSalesperson: 'Faith Mutua',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [testDrives, setTestDrives] = useState<TestDriveBooking[]>(() => {
    const saved = localStorage.getItem('apex_test_drives_v2');
    return saved ? JSON.parse(saved) : [
      {
        id: 'td-1',
        customerName: 'Dr. James Kuria',
        phone: '+254 712 999 888',
        email: 'jkuria@gmail.com',
        vehicleId: 'car-2',
        vehicleTitle: 'Toyota Land Cruiser Prado TX-L 2020',
        yardLocation: 'Kiambu Road Luxury Showroom',
        date: '2024-08-25',
        timeSlot: '14:00 - 15:00',
        notes: 'Interested in offroad KDSS suspension test.',
        status: 'confirmed',
        assignedSalesperson: 'Brian Oduor',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [financingApps, setFinancingApps] = useState<FinancingApplication[]>(() => {
    const saved = localStorage.getItem('apex_financing_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [tradeIns, setTradeIns] = useState<TradeInRequest[]>(() => {
    const saved = localStorage.getItem('apex_trade_ins_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Admin Auth simulation
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('apex_admin_auth') === 'true';
  });
  const [adminRole, setAdminRole] = useState<string>(() => {
    return localStorage.getItem('apex_admin_role') || 'Super Admin';
  });

  // Modal UI state management
  const [activeModalVehicle, setActiveModalVehicle] = useState<Vehicle | null>(null);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('apex_vehicles_v4', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('apex_settings_v3_v3', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('apex_favorites_v2', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('apex_comparison_v2', JSON.stringify(comparison));
  }, [comparison]);

  useEffect(() => {
    localStorage.setItem('apex_enquiries_v2', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('apex_test_drives_v2', JSON.stringify(testDrives));
  }, [testDrives]);

  useEffect(() => {
    localStorage.setItem('apex_financing_v2', JSON.stringify(financingApps));
  }, [financingApps]);

  useEffect(() => {
    localStorage.setItem('apex_trade_ins_v2', JSON.stringify(tradeIns));
  }, [tradeIns]);

  useEffect(() => {
    localStorage.setItem('apex_reviews_v2', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('apex_audit_logs_v2', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('apex_sales_v2', JSON.stringify(salesRecords));
  }, [salesRecords]);

  // Toast Helpers
  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setNotifications((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (action: string, entity: string, details: string) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      user: `${adminRole} User`,
      role: adminRole,
      action,
      entity,
      details,
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Helper formatting
  const formatPrice = (amount: number): string => {
    if (settings.currencyCode === 'USD') {
      const inUSD = Math.round(amount / (settings.usdExchangeRate || 130));
      return `$${inUSD.toLocaleString()}`;
    }
    return `${settings.currencySymbol} ${amount.toLocaleString()}`;
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const getVehicleById = (id: string) => {
    return vehicles.find((v) => v.id === id);
  };

  const getWhatsAppLink = (vehicle?: Vehicle, customText?: string) => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = '';
    if (vehicle) {
      const priceStr = `${settings.currencySymbol} ${vehicle.price.toLocaleString()}`;
      text = `Hello Apex Motors, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.variant}) listed at ${priceStr} [Stock #${vehicle.stockNo}]. Is it still available for viewing?`;
    } else if (customText) {
      text = customText;
    } else {
      text = `Hello Apex Motors Kenya, I would like to make an enquiry regarding available vehicles in your yard.`;
    }
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(vehicleId);
      const vehicle = getVehicleById(vehicleId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Saved',
          message: `${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Vehicle'} removed from your saved list.`
        });
        return prev.filter((id) => id !== vehicleId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Favorites',
          message: `${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Vehicle'} saved to your favorite vehicles!`
        });
        return [...prev, vehicleId];
      }
    });
  };

  const toggleComparison = (vehicleId: string) => {
    setComparison((prev) => {
      const exists = prev.includes(vehicleId);
      const vehicle = getVehicleById(vehicleId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Comparison',
          message: `${vehicle?.make} ${vehicle?.model} removed from compare list.`
        });
        return prev.filter((id) => id !== vehicleId);
      } else {
        if (prev.length >= 4) {
          addToast({
            type: 'warning',
            title: 'Comparison Limit',
            message: 'You can compare up to 4 vehicles at a time.'
          });
          return prev;
        }
        addToast({
          type: 'success',
          title: 'Added to Comparison',
          message: `${vehicle?.make} ${vehicle?.model} added to compare table.`
        });
        return [...prev, vehicleId];
      }
    });
  };

  const clearComparison = () => {
    setComparison([]);
    addToast({
      type: 'info',
      title: 'Comparison Cleared',
      message: 'All vehicles removed from comparison.'
    });
  };

  // Enquiries
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: 'enq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);

    if (enquiryData.vehicleId) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === enquiryData.vehicleId
            ? { ...v, enquiriesCount: (v.enquiriesCount || 0) + 1 }
            : v
        )
      );
    }

    addToast({
      type: 'success',
      title: 'Enquiry Received!',
      message: `Thank you, ${enquiryData.customerName}. Our sales team will contact you shortly via ${enquiryData.preferredContactMethod}.`
    });

    logAudit('New Enquiry Submitted', enquiryData.vehicleTitle || 'General Enquiry', `Customer: ${enquiryData.customerName} (${enquiryData.phone})`);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], notes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, ...(notes ? { notes } : {}) } : e))
    );
    addToast({
      type: 'info',
      title: 'Enquiry Updated',
      message: `Enquiry status changed to ${status}.`
    });
    logAudit('Enquiry Status Changed', `ID: ${id}`, `New status: ${status}`);
  };

  // Test Drives with Double-Booking Prevention
  const bookTestDrive = (
    bookingData: Omit<TestDriveBooking, 'id' | 'createdAt' | 'status'>
  ): { success: boolean; message: string } => {
    const doubleBooked = testDrives.some(
      (td) =>
        td.vehicleId === bookingData.vehicleId &&
        td.date === bookingData.date &&
        td.timeSlot === bookingData.timeSlot &&
        td.status !== 'cancelled'
    );

    if (doubleBooked) {
      addToast({
        type: 'error',
        title: 'Time Slot Unavailable',
        message: 'This vehicle is already scheduled for a test drive at that time slot. Please pick another time or date.'
      });
      return {
        success: false,
        message: 'Selected vehicle has a conflicting test drive booking for this time slot.'
      };
    }

    const newBooking: TestDriveBooking = {
      ...bookingData,
      id: 'td-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTestDrives((prev) => [newBooking, ...prev]);

    addToast({
      type: 'success',
      title: 'Test Drive Booked!',
      message: `Your test drive for ${bookingData.vehicleTitle} on ${bookingData.date} at ${bookingData.timeSlot} has been registered.`
    });

    logAudit('Test Drive Booked', bookingData.vehicleTitle, `Customer: ${bookingData.customerName}, Date: ${bookingData.date} ${bookingData.timeSlot}`);
    return { success: true, message: 'Test drive booked successfully!' };
  };

  const updateTestDriveStatus = (id: string, status: TestDriveBooking['status']) => {
    setTestDrives((prev) =>
      prev.map((td) => (td.id === id ? { ...td, status } : td))
    );
    addToast({
      type: 'info',
      title: 'Booking Updated',
      message: `Test drive status marked as ${status}.`
    });
    logAudit('Test Drive Status Updated', `ID: ${id}`, `Status: ${status}`);
  };

  // Financing
  const submitFinancing = (appData: Omit<FinancingApplication, 'id' | 'createdAt' | 'status'>) => {
    const newApp: FinancingApplication = {
      ...appData,
      id: 'fin-' + Date.now(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    setFinancingApps((prev) => [newApp, ...prev]);

    addToast({
      type: 'success',
      title: 'Financing Application Submitted',
      message: `Your pre-qualification application for ${appData.vehicleTitle} has been received. Our asset finance advisor will reach out.`
    });

    logAudit('Financing Application Submitted', appData.vehicleTitle, `Applicant: ${appData.customerName}, Deposit: ${formatPrice(appData.depositAmount)}`);
  };

  const updateFinancingStatus = (id: string, status: FinancingApplication['status']) => {
    setFinancingApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    addToast({
      type: 'info',
      title: 'Financing Application Updated',
      message: `Application status is now ${status}.`
    });
  };

  // Trade-In / Sell Car
  const submitTradeIn = (reqData: Omit<TradeInRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: TradeInRequest = {
      ...reqData,
      id: 'trade-' + Date.now(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    setTradeIns((prev) => [newReq, ...prev]);

    addToast({
      type: 'success',
      title: 'Trade-In Request Submitted',
      message: `Your ${reqData.currentCarYear} ${reqData.currentCarMake} ${reqData.currentCarModel} has been received for valuation.`
    });

    logAudit('Trade-In Request Submitted', `${reqData.currentCarMake} ${reqData.currentCarModel}`, `Customer: ${reqData.customerName}, Expected: ${formatPrice(reqData.expectedPrice)}`);
  };

  const updateTradeInStatus = (id: string, status: TradeInRequest['status'], estimatedOffer?: number) => {
    setTradeIns((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status, ...(estimatedOffer ? { estimatedOffer } : {}) }
          : t
      )
    );
    addToast({
      type: 'info',
      title: 'Valuation Status Updated',
      message: `Trade-in status updated to ${status}.`
    });
  };

  // Vehicle Stock Management (Admin)
  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'viewsCount' | 'enquiriesCount'>) => {
    const stockExists = vehicles.some((v) => v.stockNo.toLowerCase() === vehicleData.stockNo.toLowerCase());
    if (stockExists) {
      addToast({
        type: 'error',
        title: 'Stock Number Exists',
        message: `A vehicle with Stock No ${vehicleData.stockNo} already exists. Stock numbers must be unique.`
      });
      return;
    }

    const newVehicle: Vehicle = {
      ...vehicleData,
      id: 'car-' + Date.now(),
      viewsCount: 1,
      enquiriesCount: 0,
      createdAt: new Date().toISOString()
    };

    setVehicles((prev) => [newVehicle, ...prev]);
    addToast({
      type: 'success',
      title: 'Vehicle Added to Inventory',
      message: `${newVehicle.year} ${newVehicle.make} ${newVehicle.model} is now listed in the yard inventory.`
    });

    logAudit('Vehicle Created', `${newVehicle.make} ${newVehicle.model} (${newVehicle.stockNo})`, `Price: ${formatPrice(newVehicle.price)}, Yard: ${newVehicle.locationYard}`);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const oldPrice = v.price;
          const newPrice = updates.price;
          if (newPrice && newPrice !== oldPrice) {
            logAudit(
              'Vehicle Price Changed',
              `${v.make} ${v.model} (${v.stockNo})`,
              `Price modified from ${formatPrice(oldPrice)} to ${formatPrice(newPrice)}`
            );
          }
          if (updates.status && updates.status !== v.status) {
            logAudit(
              'Vehicle Status Changed',
              `${v.make} ${v.model} (${v.stockNo})`,
              `Status transitioned from ${v.status} to ${updates.status}`
            );
          }
          return { ...v, ...updates };
        }
        return v;
      })
    );

    addToast({
      type: 'success',
      title: 'Vehicle Updated',
      message: 'Vehicle information saved successfully.'
    });
  };

  const deleteVehicle = (id: string) => {
    const car = getVehicleById(id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    addToast({
      type: 'warning',
      title: 'Vehicle Removed',
      message: `${car?.make} ${car?.model} (${car?.stockNo}) has been deleted from inventory.`
    });
    if (car) {
      logAudit('Vehicle Deleted', `${car.make} ${car.model} (${car.stockNo})`, `Removed from yard records`);
    }
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'isApproved' | 'isFeatured'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isApproved: true,
      isFeatured: true
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast({
      type: 'success',
      title: 'Review Published',
      message: 'Thank you for sharing your experience with Apex Motors!'
    });
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  // Settings
  const updateSettings = (newSettings: Partial<DealershipSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Dealership configuration updated.'
    });
    logAudit('Dealership Settings Updated', 'System Settings', 'Updated company parameters & pricing configuration');
  };

  // Admin Auth
  const loginAdmin = (role: string = 'Super Admin') => {
    setIsAdminLoggedIn(true);
    setAdminRole(role);
    localStorage.setItem('apex_admin_auth', 'true');
    localStorage.setItem('apex_admin_role', role);
    addToast({
      type: 'success',
      title: 'Admin Access Granted',
      message: `Signed in as ${role}. Full management privileges activated.`
    });
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('apex_admin_auth');
    localStorage.removeItem('apex_admin_role');
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'Administrator session ended.'
    });
  };

  return (
    <DealershipContext.Provider
      value={{
        vehicles,
        settings,
        locations,
        reviews,
        blogPosts,
        salespeople,
        auditLogs,
        salesRecords,
        favorites,
        comparison,
        enquiries,
        testDrives,
        financingApps,
        tradeIns,
        notifications,
        addToast,
        removeToast,
        filters,
        setFilters,
        resetFilters,
        formatPrice,
        toggleFavorite,
        toggleComparison,
        clearComparison,
        getVehicleById,
        getWhatsAppLink,
        addEnquiry,
        updateEnquiryStatus,
        bookTestDrive,
        updateTestDriveStatus,
        submitFinancing,
        updateFinancingStatus,
        submitTradeIn,
        updateTradeInStatus,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addReview,
        updateReview,
        updateSettings,
        isAdminLoggedIn,
        adminRole,
        loginAdmin,
        logoutAdmin,
        activeModalVehicle,
        setActiveModalVehicle,
        isTestDriveModalOpen,
        setIsTestDriveModalOpen,
        isFinanceModalOpen,
        setIsFinanceModalOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        isTradeInModalOpen,
        setIsTradeInModalOpen
      }}
    >
      {children}
    </DealershipContext.Provider>
  );
};

export const useDealership = () => {
  const context = useContext(DealershipContext);
  if (!context) {
    throw new Error('useDealership must be used within a DealershipProvider');
  }
  return context;
};
