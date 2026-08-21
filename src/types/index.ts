export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'Plug-in Hybrid';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT' | 'Dual-Clutch (DCT)';
export type DriveType = '4WD' | 'AWD' | '2WD / FWD' | 'RWD';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'Pickup / Double Cabin' | 'Station Wagon' | 'Coupe' | 'Crossover' | 'Van / Minivan';
export type VehicleCondition = 'Brand New' | 'Foreign Used (Direct Import)' | 'Locally Used';
export type VehicleStatus = 'available' | 'reserved' | 'sold' | 'pending_inspection' | 'coming_soon';

export interface VehicleDocument {
  id: string;
  name: string;
  type: 'Inspection' | 'Logbook' | 'Import Certificate' | 'Service History' | 'Warranty';
  url: string;
  size?: string;
}

export interface Vehicle {
  id: string;
  stockNo: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  regYear?: number;
  price: number; // In KES
  originalPrice?: number; // For discounted badges
  mileage: number; // In Kilometers
  engineSize: string; // e.g. "2000cc Turbo"
  fuelType: FuelType;
  transmission: TransmissionType;
  driveType: DriveType;
  bodyType: BodyType;
  exteriorColor: string;
  interiorColor: string;
  condition: VehicleCondition;
  vin?: string;
  locationYard: string;
  status: VehicleStatus;
  isFeatured: boolean;
  isNewArrival: boolean;
  images: string[];
  features: string[];
  description: string;
  warranty: string;
  serviceHistory: string;
  documents?: VehicleDocument[];
  viewsCount?: number;
  enquiriesCount?: number;
  createdAt: string;
}

export type EnquiryStatus = 
  | 'new' 
  | 'contacted' 
  | 'interested' 
  | 'test_drive' 
  | 'negotiation' 
  | 'deposit' 
  | 'sold' 
  | 'lost' 
  | 'closed';

export interface Enquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  preferredContactTime: 'Anytime' | 'Morning' | 'Afternoon' | 'Evening';
  vehicleId?: string;
  vehicleTitle?: string;
  message: string;
  status: EnquiryStatus;
  assignedSalesperson?: string;
  notes?: string;
  followUpDate?: string;
  createdAt: string;
}

export type TestDriveStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface TestDriveBooking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleId: string;
  vehicleTitle: string;
  yardLocation: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: TestDriveStatus;
  assignedSalesperson?: string;
  createdAt: string;
}

export type FinancingStatus = 'submitted' | 'under_review' | 'bank_pre_approved' | 'approved' | 'declined';

export interface FinancingApplication {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleId: string;
  vehicleTitle: string;
  vehiclePrice: number;
  depositAmount: number;
  termMonths: number;
  monthlyIncome: number;
  employmentType: 'Employed (Permanent)' | 'Contract' | 'Business Owner / Self-Employed' | 'Corporate';
  preferredBank: string;
  additionalNotes?: string;
  estimatedMonthly: number;
  status: FinancingStatus;
  createdAt: string;
}

export type TradeInStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'inspection_required' 
  | 'valuation_completed' 
  | 'offer_sent' 
  | 'accepted' 
  | 'declined' 
  | 'completed';

export interface TradeInRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  currentCarMake: string;
  currentCarModel: string;
  currentCarYear: number;
  currentCarMileage: number;
  currentCarTransmission: string;
  currentCarFuel: string;
  currentCarCondition: string;
  expectedPrice: number;
  targetVehicleId?: string;
  targetVehicleTitle?: string;
  location: string;
  photos: string[];
  additionalNotes?: string;
  status: TradeInStatus;
  estimatedOffer?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  avatar?: string;
  rating: number;
  review: string;
  vehiclePurchased: string;
  date: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Car Buying Guides' | 'Vehicle Reviews' | 'Maintenance Tips' | 'Financing Advice' | 'Driving Tips' | 'New Arrivals';
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string[];
  isPublished: boolean;
}

export interface LocationYard {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  whatsapp: string;
  openingHours: string;
  isMain: boolean;
}

export interface DealershipSettings {
  dealershipName: string;
  tagline: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  whatsappNumber: string;
  mainAddress: string;
  currencySymbol: string;
  currencyCode: string;
  usdExchangeRate: number;
  vatPercentage: number;
  defaultFinancingRate: number;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  aboutText: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
}

export interface SalesRecord {
  id: string;
  invoiceNo: string;
  vehicleId: string;
  vehicleTitle: string;
  stockNo: string;
  customerName: string;
  customerPhone: string;
  salePrice: number;
  depositPaid: number;
  paymentMethod: 'Bank Transfer' | 'M-Pesa (Mobile Money)' | 'Cashier Cheque' | 'Card / RTGS';
  balance: number;
  saleDate: string;
  salesperson: string;
  status: 'Completed' | 'Deposit Paid' | 'Pending Balance';
}

export interface Salesperson {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Sales Manager' | 'Inventory Manager' | 'Salesperson' | 'Content Manager';
  activeLeadsCount: number;
  totalSales: number;
  revenueGenerated: number;
  avatar: string;
}

export interface FilterState {
  search: string;
  make: string;
  model: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  condition: string;
  locationYard: string;
  minPrice: number | '';
  maxPrice: number | '';
  minYear: number | '';
  maxYear: number | '';
  maxMileage: number | '';
  isFeatured?: boolean;
  isNewArrival?: boolean;
  status?: string;
  sortBy: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'mileage_asc' | 'year_desc' | 'popular';
}
