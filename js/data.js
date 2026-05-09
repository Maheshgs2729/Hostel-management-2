/* ===== Mock Data & Constants ===== */

// Room codes
const ROOM_CODES = [
  { value: 'SA', label: 'SA - Single Attached' },
  { value: 'SNA', label: 'SNA - Single Non-Attached' },
  { value: 'DA', label: 'DA - Double Attached' },
  { value: 'DNA', label: 'DNA - Double Non-Attached' },
  { value: 'TA', label: 'TA - Triple Attached' },
  { value: 'TNA', label: 'TNA - Triple Non-Attached' },
  { value: 'FNA', label: 'FNA - Four Non-Attached' },
  { value: 'GNA', label: 'GNA - General Non-Attached' },
];

// Hostel names
const HOSTEL_LIST = [
  { id: 'sharavati', name: 'Sharavati', capacity: 200, occupied: 172, type: "Women's" },
  { id: 'hemavati', name: 'Hemavati', capacity: 180, occupied: 158, type: "Women's" },
  { id: 'shalmala', name: 'Shalmala', capacity: 250, occupied: 213, type: "Men's" },
  { id: 'netravati', name: 'Netravati', capacity: 220, occupied: 195, type: "Men's" },
  { id: 'narmada', name: 'Narmada', capacity: 200, occupied: 164, type: "Men's" },
];

// Branches
const BRANCHES = [
  'Computer Science & Engineering', 'Information Science & Engineering',
  'Electronics & Communication Engineering', 'Electrical & Electronics Engineering',
  'Mechanical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Industrial & Production Engineering',
];

// Semesters
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

// Mock student data for applications
const PENDING_APPLICATIONS = [
  { id: 1, name: 'Aditya Sharma', usn: '2SD21CS001', branch: 'Computer Science & Engineering', semester: 5, sgpa: [8.5,8.7,8.2,8.9,0,0,0,0], roomPref: 'SA', antiRagging: true, status: 'pending', date: '2026-04-28' },
  { id: 2, name: 'Priya Kulkarni', usn: '2SD21EC015', branch: 'Electronics & Communication Engineering', semester: 5, sgpa: [9.0,8.8,9.1,8.7,0,0,0,0], roomPref: 'DA', antiRagging: true, status: 'pending', date: '2026-04-29' },
  { id: 3, name: 'Rahul Desai', usn: '2SD22ME032', branch: 'Mechanical Engineering', semester: 3, sgpa: [7.5,7.8,0,0,0,0,0,0], roomPref: 'DNA', antiRagging: true, status: 'pending', date: '2026-04-30' },
  { id: 4, name: 'Sneha Patil', usn: '2SD21IS008', branch: 'Information Science & Engineering', semester: 5, sgpa: [8.8,9.2,8.5,9.0,0,0,0,0], roomPref: 'SNA', antiRagging: true, status: 'pending', date: '2026-05-01' },
  { id: 5, name: 'Karthik Hegde', usn: '2SD22CV020', branch: 'Civil Engineering', semester: 3, sgpa: [7.2,7.5,0,0,0,0,0,0], roomPref: 'TNA', antiRagging: true, status: 'pending', date: '2026-05-02' },
  { id: 6, name: 'Ananya Rao', usn: '2SD21EE011', branch: 'Electrical & Electronics Engineering', semester: 5, sgpa: [8.1,8.3,8.0,8.6,0,0,0,0], roomPref: 'DA', antiRagging: true, status: 'pending', date: '2026-05-03' },
];

// Payment records
const PAYMENT_RECORDS = [
  { id: 1, studentName: 'Aditya Sharma', usn: '2SD21CS001', amountReceived: 45000, paymentMode: 'DD', receiptNo: 'RCP-2026-001', ddCashNo: 'DD-78451', date: '2026-04-15', verified: true },
  { id: 2, studentName: 'Priya Kulkarni', usn: '2SD21EC015', amountReceived: 52000, paymentMode: 'Cash', receiptNo: 'RCP-2026-002', ddCashNo: 'CASH-1102', date: '2026-04-16', verified: true },
  { id: 3, studentName: 'Rahul Desai', usn: '2SD22ME032', amountReceived: 38000, paymentMode: 'DD', receiptNo: 'RCP-2026-003', ddCashNo: 'DD-78452', date: '2026-04-18', verified: false },
  { id: 4, studentName: 'Sneha Patil', usn: '2SD21IS008', amountReceived: 52000, paymentMode: 'Cash', receiptNo: 'RCP-2026-004', ddCashNo: 'CASH-1103', date: '2026-04-20', verified: false },
  { id: 5, studentName: 'Karthik Hegde', usn: '2SD22CV020', amountReceived: 38000, paymentMode: 'DD', receiptNo: 'RCP-2026-005', ddCashNo: 'DD-78453', date: '2026-04-22', verified: false },
];

// Fee structure by room type
const FEE_STRUCTURE = {
  SA: 52000, SNA: 45000, DA: 42000, DNA: 38000,
  TA: 35000, TNA: 32000, FNA: 28000, GNA: 25000,
};

// Mess info
const SANTRUPTI_MESS = {
  name: 'Santrupti Mess - Temple of Food',
  tagline: 'Nourishing Minds, Feeding Futures',
  guidelines: [
    'Maintain silence and discipline during meal times.',
    'Wash hands before and after every meal.',
    'Do not waste food — take only what you can consume.',
    'Return plates and utensils to the designated counter.',
    'Report any hygiene concerns to the mess committee immediately.',
    'Meal timings must be strictly followed.',
    'Outside food is not permitted inside the mess hall.',
    'Students must carry their mess ID card at all times.',
  ],
  timings: { breakfast: '7:30 AM – 9:00 AM', lunch: '12:30 PM – 2:00 PM', snacks: '4:30 PM – 5:30 PM', dinner: '7:30 PM – 9:00 PM' },
  capacity: 500,
  currentStrength: 438,
};

// Rules & Regulations
const HOSTEL_RULES = [
  'Students must return to the hostel by 9:00 PM on weekdays.',
  'Prior written permission is required for overnight stay outside the hostel.',
  'Consumption of alcohol, tobacco, and drugs is strictly prohibited.',
  'Ragging in any form is a punishable offense under UGC regulations.',
  'Students must maintain cleanliness in rooms and common areas.',
  'Electrical appliances like heaters and irons are not allowed in rooms.',
  'Visitors are allowed only in the common area during visiting hours (4-6 PM).',
  'Any damage to hostel property will be charged to the concerned student.',
  'Students must attend all hostel meetings called by the warden.',
  'Gate passes are mandatory for leaving the campus during college hours.',
];
