export const defaultProducts = [
  {
    id: 1,
    slug: 'monarch-velvet-sofa',
    name: 'Velvet 3-Seat Sofa',
    category: 'Living Room',
    image: '/assets/sofa.jpg',
    badge: 'Popular',
    price: 185000,
    priceQualifier: 'fixed',
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
    image: '/assets/dining.jpg',
    badge: 'Custom',
    price: 320000,
    priceQualifier: 'fixed',
    stock: 'in-stock',
    description: 'A solid walnut dining table that seats 8, finished in natural oil.',
    specs: [
      { label: 'Capacity', value: '8-seater' },
      { label: 'Wood', value: 'Solid walnut' },
      { label: 'Finish', value: 'Natural oil finish' },
      { label: 'Dimensions', value: '240 × 100 × 76 cm' },
    ],
  },
];

export const products = defaultProducts;

