import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database JSON File Path
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize DB if not exists
const initializeDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      vehicles: [],
      enquiries: [],
      testDrives: [],
      financingApps: [],
      tradeIns: [],
      reviews: [],
      settings: {
        dealershipName: 'Apex Motors Kenya',
        tagline: 'Find Your Next Car With Confidence',
        phone: '+254 759 508 348',
        whatsappNumber: '254759508348',
        email: 'mbitheabigail20@gmail.com',
        mainAddress: 'Plot 42, Ngong Road, Nairobi, Kenya',
        currencySymbol: 'KES',
        currencyCode: 'KES',
        defaultFinancingRate: 13.5
      },
      auditLogs: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
};

initializeDb();

const getDb = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    return {};
  }
};

const saveDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/vehicles
app.get('/api/vehicles', (req, res) => {
  const db = getDb();
  let vehicles = db.vehicles || [];
  const { make, bodyType, maxPrice, status } = req.query;

  if (make) vehicles = vehicles.filter(v => v.make.toLowerCase() === make.toLowerCase());
  if (bodyType) vehicles = vehicles.filter(v => v.bodyType.toLowerCase() === bodyType.toLowerCase());
  if (maxPrice) vehicles = vehicles.filter(v => v.price <= Number(maxPrice));
  if (status) vehicles = vehicles.filter(v => v.status === status);

  res.json(vehicles);
});

// GET /api/vehicles/:id
app.get('/api/vehicles/:id', (req, res) => {
  const db = getDb();
  const vehicle = (db.vehicles || []).find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(vehicle);
});

// POST /api/vehicles
app.post('/api/vehicles', (req, res) => {
  const db = getDb();
  const newVehicle = {
    ...req.body,
    id: 'car-' + Date.now(),
    viewsCount: 1,
    enquiriesCount: 0,
    createdAt: new Date().toISOString()
  };
  db.vehicles = [newVehicle, ...(db.vehicles || [])];
  
  // Log audit
  const log = {
    id: 'log-' + Date.now(),
    user: 'API User',
    role: 'Admin',
    action: 'Vehicle Created via API',
    entity: `${newVehicle.make} ${newVehicle.model} (${newVehicle.stockNo})`,
    details: `Created with price KES ${newVehicle.price}`,
    timestamp: new Date().toLocaleString()
  };
  db.auditLogs = [log, ...(db.auditLogs || [])];
  
  saveDb(db);
  res.status(201).json(newVehicle);
});

// POST /api/enquiries
app.post('/api/enquiries', (req, res) => {
  const db = getDb();
  const newEnquiry = {
    ...req.body,
    id: 'enq-' + Date.now(),
    status: 'new',
    createdAt: new Date().toISOString()
  };
  db.enquiries = [newEnquiry, ...(db.enquiries || [])];
  saveDb(db);
  res.status(201).json(newEnquiry);
});

// POST /api/test-drives
app.post('/api/test-drives', (req, res) => {
  const db = getDb();
  const { vehicleId, date, timeSlot } = req.body;

  const conflicting = (db.testDrives || []).some(
    td => td.vehicleId === vehicleId && td.date === date && td.timeSlot === timeSlot && td.status !== 'cancelled'
  );

  if (conflicting) {
    return res.status(409).json({ error: 'This time slot is already booked for this vehicle.' });
  }

  const newBooking = {
    ...req.body,
    id: 'td-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.testDrives = [newBooking, ...(db.testDrives || [])];
  saveDb(db);
  res.status(201).json(newBooking);
});

// POST /api/financing
app.post('/api/financing', (req, res) => {
  const db = getDb();
  const newApp = {
    ...req.body,
    id: 'fin-' + Date.now(),
    status: 'submitted',
    createdAt: new Date().toISOString()
  };
  db.financingApps = [newApp, ...(db.financingApps || [])];
  saveDb(db);
  res.status(201).json(newApp);
});

// POST /api/trade-ins
app.post('/api/trade-ins', (req, res) => {
  const db = getDb();
  const newReq = {
    ...req.body,
    id: 'trade-' + Date.now(),
    status: 'submitted',
    createdAt: new Date().toISOString()
  };
  db.tradeIns = [newReq, ...(db.tradeIns || [])];
  saveDb(db);
  res.status(201).json(newReq);
});

// GET /api/settings
app.get('/api/settings', (req, res) => {
  const db = getDb();
  res.json(db.settings || {});
});

// PUT /api/settings
app.put('/api/settings', (req, res) => {
  const db = getDb();
  db.settings = { ...(db.settings || {}), ...req.body };
  saveDb(db);
  res.json(db.settings);
});

// Serve compiled Frontend static assets
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback for all remaining non-API routes
  app.use((req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'API route not found' });
    }
  });
}

app.listen(PORT, () => {
  console.log(`\n🚗 Apex Motors Full-Stack Application is running on:`);
  console.log(`   ➜  http://localhost:${PORT}/ (Frontend & Backend Unified)\n`);
});
