import { useEffect, useState } from 'react';
import {
  products as initialProducts,
  type Product,
} from '@/data/products';

import p1 from '@assets/generated_images/project1.jpg';
import p2 from '@assets/generated_images/project2.jpg';
import kitchen from '@assets/generated_images/kitchen.jpg';

import g1 from '@assets/generated_images/gallery1.jpg';
import g2 from '@assets/generated_images/gallery2.jpg';
import g3 from '@assets/generated_images/gallery3.jpg';
import g4 from '@assets/generated_images/gallery4.jpg';
import g5 from '@assets/generated_images/gallery5.jpg';
import hero from '@assets/generated_images/hero.jpg';

export interface ProjectItem {
  id: number;
  title: string;
  type: string;
  desc: string;
  img: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  className?: string;
}

const initialProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Hayatabad Villa',
    type: 'Whole-home furniture',
    desc: 'Custom furniture for a modern 2-kanal villa in Hayatabad. It includes walnut wall panels, a dining set, and bedroom furniture.',
    img: p1,
  },
  {
    id: 2,
    title: 'Executive Office',
    type: 'Office furniture',
    desc: "Furniture for a CEO's office in Peshawar, including a large mahogany desk, built-in bookshelves, and leather chairs.",
    img: p2,
  },
  {
    id: 3,
    title: 'Modern Kitchen',
    type: 'Kitchen & cabinets',
    desc: 'A modern dark kitchen with gold handles and built-in appliances.',
    img: kitchen,
  },
];

const initialGallery: GalleryItem[] = [
  { id: 1, title: 'Luxury Master Bed', src: g1, className: 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' },
  { id: 2, title: 'Handmade Dining Set', src: g2, className: 'aspect-square' },
  { id: 3, title: 'Royal Accent Chair', src: g3, className: 'aspect-[3/4]' },
  { id: 4, title: 'Main Living Showcase', src: hero, className: 'md:col-span-2 aspect-[21/9]' },
  { id: 5, title: 'Bespoke Wardrobe Detail', src: g4, className: 'aspect-square' },
  { id: 6, title: 'Artisanal Coffee Table', src: g5, className: 'aspect-square' },
];

const PRODUCTS_KEY = 'thf_admin_products';
const PROJECTS_KEY = 'thf_admin_projects';
const GALLERY_KEY = 'thf_admin_gallery';

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts;
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function saveStoredProducts(items: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
  notify();
}

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return initialProjects;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : initialProjects;
  } catch {
    return initialProjects;
  }
}

export function saveStoredProjects(items: ProjectItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(items));
  notify();
}

export function getStoredGallery(): GalleryItem[] {
  if (typeof window === 'undefined') return initialGallery;
  try {
    const data = localStorage.getItem(GALLERY_KEY);
    return data ? JSON.parse(data) : initialGallery;
  } catch {
    return initialGallery;
  }
}

export function saveStoredGallery(items: GalleryItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  notify();
}

// Global Cloud Sync from Neon via Vercel Serverless Functions
let hasSyncedFromCloud = false;

export async function syncFromCloud() {
  if (hasSyncedFromCloud || typeof window === 'undefined') return;
  hasSyncedFromCloud = true;

  try {
    // 1. Sync Products
    const prodRes = await fetch('/api/products');
    if (prodRes.ok) {
      const json = await prodRes.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        const mapped: Product[] = json.data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          priceQualifier: item.price_qualifier || item.priceQualifier || 'fixed',
          image: item.image,
          description: item.description,
          stock: item.stock || 'in-stock',
          badge: item.badge,
          specs: Array.isArray(item.specs) ? item.specs : [],
        }));
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(mapped));
        notify();
      }
    }

    // 2. Sync Projects
    const projRes = await fetch('/api/projects');
    if (projRes.ok) {
      const json = await projRes.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        const mapped: ProjectItem[] = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          desc: item.description || item.desc || '',
          img: item.img,
        }));
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(mapped));
        notify();
      }
    }

    // 3. Sync Gallery
    const galRes = await fetch('/api/gallery');
    if (galRes.ok) {
      const json = await galRes.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        const mapped: GalleryItem[] = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          src: item.src,
          className: item.class_name || item.className,
        }));
        localStorage.setItem(GALLERY_KEY, JSON.stringify(mapped));
        notify();
      }
    }
  } catch {
    // Seamless fallback to local data
  }
}

// React hooks for live reactive updates with background cloud synchronization
export function useLiveProducts(): [Product[], (items: Product[]) => void] {
  const [data, setData] = useState<Product[]>(getStoredProducts);

  useEffect(() => {
    syncFromCloud();
    const handler = () => setData(getStoredProducts());
    listeners.add(handler);
    window.addEventListener('storage', handler);
    return () => {
      listeners.delete(handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return [data, saveStoredProducts];
}

export function useLiveProjects(): [ProjectItem[], (items: ProjectItem[]) => void] {
  const [data, setData] = useState<ProjectItem[]>(getStoredProjects);

  useEffect(() => {
    syncFromCloud();
    const handler = () => setData(getStoredProjects());
    listeners.add(handler);
    window.addEventListener('storage', handler);
    return () => {
      listeners.delete(handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return [data, saveStoredProjects];
}

export function useLiveGallery(): [GalleryItem[], (items: GalleryItem[]) => void] {
  const [data, setData] = useState<GalleryItem[]>(getStoredGallery);

  useEffect(() => {
    syncFromCloud();
    const handler = () => setData(getStoredGallery());
    listeners.add(handler);
    window.addEventListener('storage', handler);
    return () => {
      listeners.delete(handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return [data, saveStoredGallery];
}
