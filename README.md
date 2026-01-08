# Personal Finance Dashboard

A comprehensive, modern dashboard to track your income, expenses, and financial goals, visualized with interactive charts and tables. Built with Next.js 16, Supabase, and Tailwind CSS 4.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Backend & Auth:** [Supabase](https://supabase.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## ✨ Features

- **📊 Dashboard Overview:**
  - Real-time summary cards for Balance, Income, Expenses, and Savings.
  - Interactive Income vs. Expenses charts.
  - Detailed expense breakdown by category.
- **💸 Transactions Management:**
  - comprehensive table view of all transactions.
  - Filtering and sorting capabilities.
  - easy-to-use forms for adding income and expenses.
- **🏦 Account Management:**
  - Track balances across multiple accounts (Bank, Cash, Wallet, etc.).
- **🎯 Goals Tracking:**
  - Set and monitor financial goals.
  - Visualize progress towards each goal.
- **📈 Reports & Analytics:**
  - Detailed financial reports.
  - Visual insights into spending habits.
- **👤 User Management:**
  - Secure Authentication via Supabase.
  - Profile management (Avatar, Display Name).
- **📱 Responsive Design:**
  - Fully responsive layout optimized for Desktop, Tablet, and Mobile.

## 📂 Project Structure

```bash
.
├── app/                  # Next.js App Router pages and layouts
│   ├── api/              # Hooks/Functions to fetch and crud the data
│   ├── store/            # Global state (Zustand)
│   ├── transactions/     # Transactions page
│   ├── accounts/         # Accounts page
│   ├── goals/            # Goals page
│   └── reports/          # Reports page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   ├── dashboard/        # Dashboard-specific widgets
│   ├── forms/            # Form components
│   └── ...
├── lib/                  # Utility functions and Supabase client
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd personal-income-dashboard
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials. You can find these in your Supabase project settings.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**

   ```bash
   yarn dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## � Scripts

- `yarn dev`: Runs the application in development mode.
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Runs ESLint to check for code quality issues.
