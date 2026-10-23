import bedImg from '@assets/generated_images/bed.jpg';
import sofaImg from '@assets/generated_images/sofa.jpg';
import diningImg from '@assets/generated_images/dining.jpg';
import wardrobeImg from '@assets/generated_images/wardrobe.jpg';
import tvUnitImg from '@assets/generated_images/tv_unit.jpg';
import officeImg from '@assets/generated_images/office.jpg';
import kitchenImg from '@assets/generated_images/kitchen.jpg';
import coffeeTableImg from '@assets/generated_images/coffee_table.jpg';
import doorImg from '@assets/generated_images/door.jpg';
import bookshelfImg from '@assets/generated_images/bookshelf.jpg';

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
    name: 'The Monarch Velvet Sofa',
    category: 'Living Room',
    image: sofaImg,
    badge: 'Best Seller',
    price: 185000,
    stock: 'in-stock',
    description: 'A tailored statement sofa with a solid hardwood frame, plush velvet upholstery, and refined brass-tone details.',
    specs: [
      { label: 'Seating', value: '3-seater' },
      { label: 'Dimensions', value: '220 × 90 × 85 cm' },
      { label: 'Frame', value: 'Kiln-dried hardwood' },
      { label: 'Upholstery', value: 'Premium velvet' },
    ],
  },
  {
    id: 2,
    slug: 'walnut-majesty-dining-table',
    name: 'Walnut Majesty Dining Table',
    category: 'Dining',
    image: diningImg,
    badge: 'Bespoke',
    price: 215000,
    stock: 'in-stock',
    description: 'A substantial dining table with a hand-finished walnut surface and a clean, enduring silhouette for family gatherings.',
    specs: [
      { label: 'Seats', value: '6–8 people' },
      { label: 'Dimensions', value: '200 × 100 × 76 cm' },
      { label: 'Material', value: 'Solid walnut wood' },
      { label: 'Finish', value: 'Hand-rubbed satin' },
    ],
  },
  {
    id: 3,
    slug: 'royal-oasis-king-bed',
    name: 'Royal Oasis King Bed',
    category: 'Bedroom',
    image: bedImg,
    price: 240000,
    stock: 'in-stock',
    description: 'A generous upholstered king bed with a sculpted headboard and a durable hardwood base, made for a calm and considered bedroom.',
    specs: [
      { label: 'Size', value: 'King' },
      { label: 'Dimensions', value: '195 × 210 cm mattress size' },
      { label: 'Frame', value: 'Solid hardwood' },
      { label: 'Headboard', value: 'Upholstered, custom fabric options' },
    ],
  },
  {
    id: 4,
    slug: 'executive-obsidian-desk',
    name: 'Executive Obsidian Desk',
    category: 'Office',
    image: officeImg,
    badge: 'Premium',
    price: 135000,
    stock: 'in-stock',
    description: 'A refined executive desk pairing a generous work surface with practical storage and a deep, polished finish.',
    specs: [
      { label: 'Dimensions', value: '160 × 75 × 76 cm' },
      { label: 'Material', value: 'Hardwood with veneer panels' },
      { label: 'Storage', value: 'Three drawers' },
      { label: 'Finish', value: 'Dark satin polish' },
    ],
  },
  {
    id: 5,
    slug: 'luminous-walk-in-wardrobe',
    name: 'Luminous Walk-in Wardrobe',
    category: 'Storage',
    image: wardrobeImg,
    price: 290000,
    priceQualifier: 'starting',
    stock: 'out-of-stock',
    description: 'A made-to-measure wardrobe system with adaptable hanging, shelving, and drawer layouts for a clean, organized space.',
    specs: [
      { label: 'Configuration', value: 'Custom, made to measure' },
      { label: 'Material', value: 'Engineered wood with hardwood detailing' },
      { label: 'Interior', value: 'Adjustable shelves and hanging rails' },
      { label: 'Finish', value: 'Choice of laminate or veneer' },
    ],
  },
  {
    id: 6,
    slug: 'midnight-marble-kitchen',
    name: 'Midnight Marble Kitchen',
    category: 'Kitchen',
    image: kitchenImg,
    badge: 'Custom',
    price: 450000,
    priceQualifier: 'starting',
    stock: 'in-stock',
    description: 'A bespoke kitchen concept with dark cabinetry, polished hardware, and a layout tailored to the room and your workflow.',
    specs: [
      { label: 'Configuration', value: 'Custom, made to measure' },
      { label: 'Cabinet material', value: 'Moisture-resistant board with veneer finish' },
      { label: 'Hardware', value: 'Soft-close hinges and runners' },
      { label: 'Countertop', value: 'Selected and quoted separately' },
    ],
  },
  {
    id: 7,
    slug: 'floating-horizon-tv-unit',
    name: 'Floating Horizon TV Unit',
    category: 'Living Room',
    image: tvUnitImg,
    price: 95000,
    stock: 'in-stock',
    description: 'A streamlined media unit with concealed cable access and practical storage for a composed living room.',
    specs: [
      { label: 'Dimensions', value: '180 × 40 × 45 cm' },
      { label: 'Material', value: 'Hardwood and premium board' },
      { label: 'Storage', value: 'Drawers and open media shelf' },
      { label: 'Installation', value: 'Wall mounting quoted separately' },
    ],
  },
  {
    id: 8,
    slug: 'artisan-glass-coffee-table',
    name: 'Artisan Glass Coffee Table',
    category: 'Living Room',
    image: coffeeTableImg,
    price: 68000,
    stock: 'in-stock',
    description: 'A sculptural coffee table that balances a clear glass top with a carefully finished timber base.',
    specs: [
      { label: 'Dimensions', value: '110 × 60 × 42 cm' },
      { label: 'Top', value: 'Tempered glass' },
      { label: 'Base', value: 'Solid wood' },
      { label: 'Finish', value: 'Custom stain options' },
    ],
  },
  {
    id: 9,
    slug: 'grand-mahogany-entrance-door',
    name: 'Grand Mahogany Entrance Door',
    category: 'Doors',
    image: doorImg,
    price: 85000,
    priceQualifier: 'starting',
    stock: 'out-of-stock',
    description: 'A handcrafted entrance door with a rich wood finish. Final dimensions, hardware, and installation are confirmed to order.',
    specs: [
      { label: 'Configuration', value: 'Custom, made to measure' },
      { label: 'Material', value: 'Mahogany' },
      { label: 'Finish', value: 'Exterior-grade polish options' },
      { label: 'Hardware', value: 'Selected to suit the project' },
    ],
  },
  {
    id: 10,
    slug: 'scholars-library-wall',
    name: "Scholar's Library Wall",
    category: 'Storage',
    image: bookshelfImg,
    price: 155000,
    priceQualifier: 'starting',
    stock: 'in-stock',
    description: 'A full-height library wall with open display shelving and optional closed storage, designed for your room dimensions.',
    specs: [
      { label: 'Configuration', value: 'Custom, made to measure' },
      { label: 'Material', value: 'Hardwood and premium board' },
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
