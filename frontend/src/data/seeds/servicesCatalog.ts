import type { ServiceSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

function dur(minutes: number): { duration: string; durationMinutes: number } {
  if (minutes < 60) return { duration: `${minutes} min`, durationMinutes: minutes }
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return { duration: h === 1 ? '1 hour' : `${h} hours`, durationMinutes: minutes }
  return { duration: `${h}h ${m} min`, durationMinutes: minutes }
}

function row(
  id: string,
  name: string,
  price: number,
  minutes: number,
  category: ServiceSeed['category'],
  imageId: string,
  extra?: string
): ServiceSeed {
  const d = dur(minutes)
  return {
    id,
    name,
    price,
    category,
    image: img(imageId),
    duration: d.duration,
    durationMinutes: d.durationMinutes,
    description:
      `Performed by trained technicians using torque specs and OEM bulletins where available.\nTransparent pricing—consumables included unless noted. ${extra ?? ''}\nBook online; we confirm slot and bike model before you arrive.`,
  }
}

/** 26 workshop services across required categories */
export const SEED_SERVICES_LIST: ServiceSeed[] = [
  row('svc-oil-express', 'Express Synthetic Oil Change', 649, 25, 'Oil change', 'photo-1604227639211-38b6e2c73c0b'),
  row('svc-oil-premium', 'Premium Oil & Filter Service', 999, 35, 'Oil change', 'photo-1625047509168-a7026f36de04'),
  row('svc-oil-twin', 'Twin-Cylinder Oil Service', 1299, 40, 'Oil change', 'photo-1486262715619-67b85e0b08d3'),
  row(
    'svc-oil-performance',
    'Performance Flush & Refill',
    1599,
    45,
    'Oil change',
    'photo-1619767886558-efdc259cde1a',
    'Includes visual inspection of drain plug magnet.'
  ),
  row('svc-full-standard', 'Standard Full Service Package', 2499, 120, 'Full servicing', 'photo-1568772585407-9361d9bf916b'),
  row('svc-full-premium', 'Premium Full Service + Fluids', 3499, 150, 'Full servicing', 'photo-1558981806-52713904695b'),
  row('svc-full-touring', 'Touring Bike 20-Point Inspection', 4299, 180, 'Full servicing', 'photo-1558618666-fcd25c85cd64'),
  row('svc-full-sport', 'Supersport Track Prep Service', 4999, 210, 'Full servicing', 'photo-1605559424843-9e4c228bf1c2'),
  row('svc-eng-diagnostic', 'Engine Diagnostic & Compression Test', 1999, 90, 'Engine repair', 'photo-1486262715619-67b85e0b08d3'),
  row('svc-eng-top', 'Top-End Gasket & Valve Service', 8999, 360, 'Engine repair', 'photo-1523987355523-c7b5b0dd90a7'),
  row('svc-eng-carb', 'Carburetor Ultrasonic Clean & Sync', 3499, 120, 'Engine repair', 'photo-1593941707874-ef5410c5ef69'),
  row('svc-eng-ecu', 'ECU Remap & Throttle Body Clean', 5999, 180, 'Engine repair', 'photo-1518611012118-696072aa579a'),
  row('svc-brake-bleed', 'Brake Fluid Flush & Bleed', 799, 45, 'Brake repair', 'photo-1580310614729-ccd69652491d'),
  row('svc-brake-pad', 'Brake Pad Replacement (Both Ends)', 1499, 60, 'Brake repair', 'photo-1601362840469-51e4d8d58785'),
  row('svc-brake-disc', 'Disc Skim or Replacement Labour', 2499, 120, 'Brake repair', 'photo-1621905251918-48416bd8575a'),
  row('svc-brake-abs', 'ABS Module Bleed & Sensor Check', 1999, 90, 'Brake repair', 'photo-1581092160562-40aa08f20a70'),
  row('svc-tire-mount', 'Tire Mount & Computer Balance', 899, 50, 'Tire replacement', 'photo-1449426468159-96d0a4513769'),
  row('svc-tire-puncture', 'Tubeless Puncture Repair + Seal', 499, 30, 'Tire replacement', 'photo-1471443675138-891af78efb50'),
  row('svc-tire-pair', 'Front & Rear Tire Swap Package', 2199, 90, 'Tire replacement', 'photo-1492144534655-ae79c964c9d7'),
  row('svc-tire-pressure', 'TPMS Install & Calibration', 1299, 45, 'Tire replacement', 'photo-1549317661-bd32c8ce0db2'),
  row('svc-wash-basic', 'Foam Wash & Blow Dry', 399, 25, 'Bike washing', 'photo-1558981033-0f030566a44c'),
  row('svc-wash-detail', 'Detail Wash + Chain Clean & Lube', 899, 50, 'Bike washing', 'photo-1609639643509-4c3c6bcd1c7c'),
  row('svc-wash-ceramic', 'Ceramic Spray Protection Wash', 1499, 75, 'Bike washing', 'photo-1519750157634-b6d493a0f77f'),
  row('svc-custom-exhaust', 'Aftermarket Exhaust Fit & Tune', 3499, 120, 'Custom modification', 'photo-1568772585407-9361d9bf916b'),
  row('svc-custom-lighting', 'Aux LED & Switchgear Install', 2499, 90, 'Custom modification', 'photo-1619767886558-efdc259cde1a'),
  row('svc-custom-bar', 'Handlebar Riser & Cable Reroute', 1999, 150, 'Custom modification', 'photo-1571008887538-b36bb32f4571'),
]
