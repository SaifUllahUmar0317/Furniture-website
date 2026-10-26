export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  badge?: string;
  price: number;
  priceQualifier?: 'starting';
  stock: 'in-stock' | 'out-of-stock';
  description: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: 'monarch-velvet-sofa',
    name: 'Velvet 3-Seat Sofa',
    category: 'Living Room',
    image: '/images/sofa.jpg',
    badge: 'Popular',
    price: 185000,
    stock: 'in-stock',
    description: 'A 3-seat sofa with a solid hardwood frame, soft velvet fabric, and brass-colored details.',
    specs: [
      { label: 'Seating', value: '3-seater' },
      { label: 'Dimensions', value: '220 × 90 × 85 cm' },
      { label: 'Frame', value: 'Hardwood dried to remove moisture' },
      { label: 'Fabric', value: 'Velvet' },
    ],
  },
  {
    id: 2,
    slug: 'walnut-majesty-dining-table',
    name: 'Walnut Dining Table',
    category: 'Dining',
    image: '/images/dining.jpg',
    badge: 'Custom',
    price: 215000,
    stock: 'in-stock',
    description: 'A large dining table made from solid walnut, with a smooth hand-finished top and space for family meals.',
    specs: [
      { label: 'Seats', value: '6–8 people' },
      { label: 'Dimensions', value: '200 × 100 × 76 cm' },
      { label: 'Material', value: 'Solid walnut wood' },
      { label: 'Finish', value: 'Smooth, low-shine finish' },
    ],
  },
  {
    id: 3,
    slug: 'royal-oasis-king-bed',
    name: 'King Bed with Upholstered Headboard',
    category: 'Bedroom',
    image: '/images/bed.jpg',
    price: 240000,
    stock: 'in-stock',
    description: 'A king bed with a shaped headboard and strong hardwood frame. Choose from custom fabric options.',
    specs: [
      { label: 'Size', value: 'King' },
      { label: 'Dimensions', value: '195 × 210 cm mattress size' },
      { label: 'Frame', value: 'Solid hardwood' },
      { label: 'Headboard', value: 'Fabric cover, with choices available' },
    ],
  },
  {
    id: 4,
    slug: 'executive-obsidian-desk',
    name: 'Executive Office Desk',
    category: 'Office',
    image: '/images/office.jpg',
    badge: 'Quality Build',
    price: 135000,
    stock: 'in-stock',
    description: 'A large office desk with three drawers and a dark, smooth finish.',
    specs: [
      { label: 'Dimensions', value: '160 × 75 × 76 cm' },
      { label: 'Material', value: 'Hardwood with thin wood panels' },
      { label: 'Storage', value: 'Three drawers' },
      { label: 'Finish', value: 'Smooth, low-shine dark finish' },
    ],
  },
  {
    id: 5,
    slug: 'luminous-walk-in-wardrobe',
    name: 'Custom Walk-in Wardrobe',
    category: 'Storage',
    image: '/images/wardrobe.jpg',
    price: 290000,
    priceQualifier: 'starting',
    stock: 'out-of-stock',
    description: 'A wardrobe made to fit your room, with adjustable shelves, hanging rails, and drawers.',
    specs: [
      { label: 'Layout', value: 'Made to fit your room' },
      { label: 'Material', value: 'Pressed wood with hardwood details' },
      { label: 'Interior', value: 'Adjustable shelves and hanging rails' },
      { label: 'Finish', value: 'Choose a laminate or thin-wood surface' },
    ],
  },
  {
    id: 6,
    slug: 'midnight-marble-kitchen',
    name: 'Custom Kitchen',
    category: 'Kitchen',
    image: '/images/kitchen.jpg',
    badge: 'Custom',
    price: 450000,
    priceQualifier: 'starting',
    stock: 'in-stock',
    description: 'A custom kitchen with dark cabinets and polished handles. We plan the layout to fit your room.',
    specs: [
      { label: 'Layout', value: 'Made to fit your room' },
      { label: 'Cabinet material', value: 'Moisture-resistant board with a thin-wood surface' },
      { label: 'Doors and drawers', value: 'Close gently' },
      { label: 'Countertop', value: 'Priced separately' },
    ],
  },
  {
    id: 7,
    slug: 'floating-horizon-tv-unit',
    name: 'Floating TV Unit',
    category: 'Living Room',
    image: '/images/tv_unit.jpg',
    price: 95000,
    stock: 'in-stock',
    description: 'A simple TV unit with hidden cable space, drawers, and an open shelf.',
    specs: [
      { label: 'Dimensions', value: '180 × 40 × 45 cm' },
      { label: 'Material', value: 'Hardwood and durable wood board' },
      { label: 'Storage', value: 'Drawers and open media shelf' },
      { label: 'Installation', value: 'Wall mounting quoted separately' },
    ],
  },
  {
    id: 8,
    slug: 'artisan-glass-coffee-table',
    name: 'Glass-Top Coffee Table',
    category: 'Living Room',
    image: '/images/coffee_table.jpg',
    price: 68000,
    stock: 'in-stock',
    description: 'A coffee table with a clear glass top and a carefully finished wood base.',
    specs: [
      { label: 'Dimensions', value: '110 × 60 × 42 cm' },
      { label: 'Top', value: 'Strong safety glass' },
      { label: 'Base', value: 'Solid wood' },
      { label: 'Finish', value: 'Choose a wood color' },
    ],
  },
  {
    id: 9,
    slug: 'grand-mahogany-entrance-door',
    name: 'Mahogany Front Door',
    category: 'Doors',
    image: '/images/door.jpg',
    price: 85000,
    priceQualifier: 'starting',
    stock: 'out-of-stock',
    description: 'A handmade mahogany front door. We confirm the size, hardware, and installation with you.',
    specs: [
      { label: 'Layout', value: 'Made to fit your room' },
      { label: 'Material', value: 'Mahogany' },
      { label: 'Finish', value: 'Protective finishes for outdoor use' },
      { label: 'Hardware', value: 'Choose hardware to suit the door' },
    ],
  },
  {
    id: 10,
    slug: 'scholars-library-wall',
    name: 'Wall-to-Wall Bookshelf',
    category: 'Storage',
    image: '/images/bookshelf.jpg',
    price: 155000,
    priceQualifier: 'starting',
    stock: 'in-stock',
    description: 'A tall bookshelf made to fit your room, with open shelves and optional cabinets.',
    specs: [
      { label: 'Configuration', value: 'Custom, made to measure' },
      { label: 'Material', value: 'Hardwood and durable wood board' },
      { label: 'Storage', value: 'Open shelves with optional cabinets' },
      { label: 'Finish', value: 'Choice of stain and polish' },
    ],
  },
];

export const productCategories = [
  'All',
  'Living Room',
  'Bedroom',
  'Dining',
  'Storage',
  'Office',
  'Kitchen',
  'Doors',
];

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}
