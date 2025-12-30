# Personal Finance Dashboard

A comprehensive dashboard to track your income and expenses, visualized with interactive charts and tables. Built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Directory)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Backend/Auth:** [Supabase](https://supabase.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## ✨ Features

- **Dashboard Overview:**
  - Summary cards for quick financial status.
  - Interactive Income vs. Expenses charts.
  - Detailed expense breakdown.
- **Transactions Management:**
  - View recent transactions in table and list formats.
- **User Management:**
  - Authentication (Sign In).
  - Edit Profile functionality.
- **Responsive Design:** Fully responsive layout for all devices.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd personal-income-dashboard
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Application routes and pages (Next.js App Router).
- `components/`: Reusable UI components (Dashboard, Helpers, etc.).
- `lib/`: Utility functions and configuration.
- `store/`: Global state management stores.
- `hooks/`: Custom React hooks.
- `types/`: TypeScript type definitions.
