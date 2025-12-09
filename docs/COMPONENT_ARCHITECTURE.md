# Dashboard Component Architecture

This document explains the component structure of the Personal Finance Dashboard, following React best practices and the Single Responsibility Principle.

## 📁 Folder Structure

```
app/
├── page.tsx                          # Main dashboard page (orchestrator)
├── layout.tsx                        # Root layout with AppLayout wrapper
└── finance/                          # Finance/transactions page

components/
├── app-layout.tsx                    # Global layout with sidebar
└── dashboard/                        # Dashboard-specific components
    ├── index.ts                      # Barrel exports
    ├── dashboard-header.tsx          # Header with title and CTA
    ├── income-expenses-card.tsx      # Income/Expenses summary card
    ├── income-vs-expenses-chart.tsx  # Chart placeholder component
    ├── recent-transactions.tsx       # Transactions list container
    ├── transaction-item.tsx          # Single transaction item
    ├── expense-by-category.tsx       # Categories list container
    ├── category-progress-bar.tsx     # Single category progress bar
    └── monthly-summary-chart.tsx     # Monthly chart placeholder

lib/
└── dashboard/
    └── get-dashboard-data.ts         # Data fetching logic

types/
└── dashboard.ts                      # TypeScript type definitions
```

## 🎯 Single Responsibility Principle

Each component has a single, well-defined responsibility:

### Presentation Components

- **DashboardHeader**: Displays page title and action button
- **TransactionItem**: Renders a single transaction with icon and amount
- **CategoryProgressBar**: Shows a single category with progress bar

### Container Components

- **RecentTransactions**: Manages list of transaction items
- **ExpenseByCategory**: Manages list of category progress bars
- **IncomeExpensesCard**: Displays financial summary with CTA

### Chart Components

- **IncomeVsExpensesChart**: Placeholder for income/expense comparison
- **MonthlySummaryChart**: Placeholder for monthly trends

### Data Layer

- **getDashboardData()**: Centralized data fetching (ready for Prisma)

### Layout Components

- **AppLayout**: Global sidebar navigation wrapper

## 🔄 Data Flow

```
page.tsx (orchestrator)
    ↓
getDashboardData() (data fetching)
    ↓
Container Components (data distribution)
    ↓
Presentation Components (rendering)
```

## 💡 Benefits

1. **Reusability**: Components can be used in different contexts
2. **Testability**: Each component can be tested in isolation
3. **Maintainability**: Easy to locate and update specific functionality
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Scalability**: Easy to add new features without affecting existing code

## 🚀 Future Enhancements

- Replace mock data with Prisma database queries
- Add Recharts for data visualization
- Implement real-time updates with React hooks
- Add loading and error states
- Create custom hooks for data fetching
- Add unit tests for each component

## 📝 Usage Example

```tsx
import { RecentTransactions } from "@/components/dashboard";

// In your page
<RecentTransactions transactions={data.recentTransactions} />;
```

## 🎨 Component Props

All components use TypeScript interfaces for type safety:

```typescript
// Example: IncomeExpensesCard
interface IncomeExpensesCardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
```

See `types/dashboard.ts` for all type definitions.
