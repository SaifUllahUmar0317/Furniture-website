# Tehkal Hafsa Furniture — Luxury Bespoke Furniture Website

A luxury, high-performance web experience for **Tehkal Hafsa Furniture**, a premier bespoke woodworking and furniture workshop located in Peshawar, Pakistan.

Crafted with modern web technologies: **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**, featuring an elegant dark/light luxury theme, smooth animations with **Framer Motion**, and a catalog with custom inquiry management.

---

## 🌟 Highlights & Features

- **Luxury Aesthetic**: Tailored typography (Playfair Display & Outfit), warm ivory/ink light theme, and deep obsidian gold dark theme.
- **Complete Multi-Page Experience**:
  - **Home**: Immersive hero section, featured pieces, craftsmanship spotlight, testimonials, and CTAs.
  - **About Us**: Heritage, woodworking philosophy, and workshop story in Peshawar.
  - **Services**: Bespoke residential, commercial, interior carpentry, and architectural woodwork.
  - **Product Catalog**: Categorized catalog (Living Room, Dining, Bedroom, Office, Custom) with instant URL category filters.
  - **Product Detail**: High-res imagery, technical specifications, and an interactive **Custom Order Dialog**.
  - **Projects**: Showcase of completed residential and commercial projects.
  - **Gallery**: High-resolution gallery grid.
  - **Why Choose Us**: Value propositions, material standards, and warranty information.
  - **FAQ**: Client questions answered with smooth accordion dropdowns.
  - **Contact**: Location map details (University Road, Tehkal Bala, Tambowano Morh, Peshawar), working hours, direct WhatsApp/phone numbers, email, and interactive inquiry form.
  - **Legal**: Privacy Policy and Terms of Service.
- **Formspree Integration**: Contact and custom order inquiries route directly to workshop email.
- **100% Hostable**: Pre-configured for Vercel, Netlify, Cloudflare Pages, Docker, and traditional cPanel/Apache hosting.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) installed on your machine.
Check your version:
```bash
node -v
```

### 2. Install Dependencies
Run one of the following commands in the project root directory:

Using **npm**:
```bash
npm install
```

Using **pnpm**:
```bash
pnpm install
```

Using **yarn**:
```bash
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or: pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The site updates instantly with Hot Module Replacement (HMR).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
# or: pnpm build
```
The compiled, minified static files will be generated in the **`dist/`** directory.

### 5. Preview Production Build
```bash
npm run preview
# or: pnpm preview
```

---

## 🌐 Deployment & Hosting Guide

This website is a standard Single Page Application (SPA) ready to be deployed to any hosting platform in seconds.

### Option A: Vercel (Recommended)
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included [`vercel.json`](./vercel.json) automatically handles SPA routing rewrites.
5. Click **Deploy**.

---

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/) and select **"Add new site"** > **"Import an existing project"**.
2. Select your repository:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Netlify automatically detects the included [`public/_redirects`](./public/_redirects) file so page refreshes on subroutes (e.g. `/products`, `/contact`) work flawlessly.
4. Click **Deploy Site**.

---

### Option C: Traditional Web Hosting (cPanel / Apache / Shared Hosting)
1. Run `npm run build` on your computer.
2. Open your hosting cPanel **File Manager** or connect via **FTP/SFTP**.
3. Navigate to your domain's public folder (usually `public_html/`).
4. Upload all files and folders located inside the **`dist/`** folder into `public_html/`.
5. The included [`.htaccess`](./public/.htaccess) file will automatically route all requests to `index.html` and enable browser caching for images and scripts.

---

### Option D: Docker & Container Hosting (Render, Railway, AWS ECS)
A production-ready multi-stage [`Dockerfile`](./Dockerfile) and [`nginx.conf`](./nginx.conf) are included:

```bash
# Build the Docker image
docker build -t tehkal-hafsa-furniture .

# Run the container on port 80
docker run -p 80:80 tehkal-hafsa-furniture
```
Access the website at `http://localhost`.

---

## ⚙️ Configuration & Customization

### 1. Formspree Contact Form
The contact and product custom order forms submit to [Formspree](https://formspree.io):
1. Create a free form endpoint at [formspree.io](https://formspree.io) to receive customer emails.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your Formspree ID:
   ```env
   VITE_FORMSPREE_FORM_ID=your_form_id_here
   ```
*(Note: If no ID is provided, the forms will gracefully simulate successful submission for demo purposes.)*

### 2. Editing Products Catalog
All furniture items, prices, specs, categories, and badges are managed in:
[`src/data/products.ts`](./src/data/products.ts)

To add or modify a product, update the `products` array:
```ts
{
  id: 1,
  slug: 'monarch-velvet-sofa',
  name: 'Velvet 3-Seat Sofa',
  category: 'Living Room',
  image: sofaImg,
  badge: 'Popular',
  price: 185000,
  stock: 'in-stock',
  description: 'A 3-seat sofa with a solid hardwood frame...',
  specs: [
    { label: 'Seating', value: '3-seater' },
    { label: 'Dimensions', value: '220 × 90 × 85 cm' },
  ],
}
```

### 3. Updating Workshop Contact Info
- **Address & Hours**: [`src/pages/Contact.tsx`](./src/pages/Contact.tsx)
- **Footer details & social links**: [`src/components/layout/Footer.tsx`](./src/components/layout/Footer.tsx)
- **Phone / WhatsApp links**:
  - Address: University Road, Tehkal Bala, Tambowano Morh, Peshawar, KPK, Pakistan
  - Email: `Roohk700@gmail.com`

### 4. Images
All high-resolution furniture photography and gallery assets are located in:
[`src/assets/generated_images/`](./src/assets/generated_images/)

---

## 📁 Project Directory Structure

```text
├── public/                 # Static assets copied directly to dist
│   ├── .htaccess          # Apache SPA rewrite rules & caching headers
│   ├── _redirects         # Netlify SPA routing rules
│   ├── favicon.svg        # Site favicon
│   └── robots.txt         # Search engine crawler directives
├── src/
│   ├── assets/            # High-res photography & brand media
│   │   └── generated_images/
│   ├── components/        # Reusable UI components & layouts
│   │   ├── layout/        # Navbar, Footer, Noise overlay
│   │   ├── products/      # Product cards, OrderFormDialog
│   │   └── ui/            # Radix UI primitives & animations
│   ├── data/              # Product catalog & showcase datasets
│   ├── hooks/             # Custom React hooks (useMobile, useToast)
│   ├── lib/               # Utilities & theme provider
│   ├── pages/             # All 12 application page views
│   ├── App.tsx            # Main router & provider setup
│   ├── index.css          # Tailwind CSS v4 & theme definitions
│   └── main.tsx           # React DOM application entry point
├── .dockerignore          # Docker build exclusion list
├── .env.example           # Environment variable template
├── .gitignore             # Git ignore definitions
├── Dockerfile             # Multi-stage production Nginx container
├── nginx.conf             # Optimized Nginx config with gzip & caching
├── package.json           # Standard npm dependencies & build scripts
├── tsconfig.json          # TypeScript compiler configuration
├── vercel.json            # Vercel deployment & routing configuration
└── vite.config.ts         # Vite bundler configuration & code splitting
```

---

## 🛠️ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `http://localhost:3000` |
| `npm run build` | Runs typecheck and compiles production bundle into `/dist` |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Validates TypeScript types across the entire codebase |

---

## 📄 License & Ownership

Developed exclusively for **Tehkal Hafsa Furniture**. All rights reserved.
