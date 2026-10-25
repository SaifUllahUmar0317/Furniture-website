# Deployment Guide: Tehkal Hafsa Furniture (Neon + Vercel)

This website is configured and tested for deployment on **Vercel** with **Neon Serverless PostgreSQL**.

---

## Architecture Overview

- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS (SPA with client-side routing)
- **Backend API**: Vercel Serverless Functions in `/api` (`/api/products`, `/api/projects`, `/api/gallery`, `/api/auth`, `/api/health`)
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Contact & Orders**: Formspree (Form ID: `xzeebqnz` delivering to `roohk700@gmail.com`)
- **Direct Chat**: WhatsApp Floating Button (+92 316 5960886)
- **Admin Portal**: Accessible at `/admin` (Default: `admin` / `hafsa2026`)

---

## Step 1: Create Your Neon PostgreSQL Database (2 minutes)

1. Go to [https://neon.tech](https://neon.tech) and sign up / sign in (free tier is completely sufficient).
2. Click **Create Project**:
   - **Name**: `tehkal-hafsa`
   - **Region**: Choose the closest region (e.g. `US East` or `Frankfurt/Europe` or `Singapore/Asia`)
   - Click **Create Project**.
3. On the project dashboard, locate the **Connection Details** box.
4. Copy the connection string (ensure **Pooled connection** or standard connection string is copied). It looks like:
   ```text
   postgresql://neondb_owner:npg_AbCdEf123456@ep-cool-fog-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. *(Optional)*: You can open the **SQL Editor** tab in Neon and run the contents of [`schema.sql`](./schema.sql), but **you don't have to** — our serverless backend automatically creates the tables and seeds the catalog on its very first run!

---

## Step 2: Push Code to GitHub

If your code is not yet on GitHub:

```bash
git add -A
git commit -m "Configure production Neon PostgreSQL database and Vercel serverless backend"
git push origin main
```

---

## Step 3: Deploy on Vercel (3 minutes)

1. Go to [https://vercel.com](https://vercel.com) and log in.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`Furniture-website` or `Tehkal-Hafsa`).
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite` (Vercel detects this automatically)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand the **Environment Variables** section and add:

   | Name | Value | Purpose |
   |---|---|---|
   | `DATABASE_URL` | `postgresql://neondb_owner:...@ep-...neon.tech/neondb?sslmode=require` | Your Neon database connection |
   | `VITE_FORMSPREE_FORM_ID` | `xzeebqnz` | Contact & quote email forwarding |

6. Click **Deploy**.

---

## Step 4: Verify Your Deployment

Once Vercel finishes building (usually under 45 seconds):
1. Visit your new live URL: `https://your-site.vercel.app`
2. Test the backend status endpoint: `https://your-site.vercel.app/api/health`
   - Should return: `{"status":"online","database":"connected","neonTimestamp":"..."}`
3. Visit `/products` — the catalog loads directly from Neon.
4. Visit `/admin` — log in with `admin` and `hafsa2026`. Any product you add or remove is now stored in your cloud Neon database and synchronizes in real time across all visitors!
