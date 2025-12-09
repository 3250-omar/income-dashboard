# Component Hierarchy

## Visual Component Tree

```
app/page.tsx (Home)
│
├── DashboardHeader
│   ├── Title & Description
│   └── Add Transaction Button
│
├── Grid Row 1 (Summary Cards)
│   ├── IncomeExpensesCard
│   │   ├── Balance Display
│   │   ├── Income Display
│   │   ├── Expenses Display
│   │   └── Add Transaction Button
│   │
│   └── IncomeVsExpensesChart
│       ├── Chart Placeholder
│       └── Legend (Income/Expenses)
│
├── Grid Row 2 (Transactions & Categories)
│   ├── RecentTransactions
│   │   └── TransactionItem (×3)
│   │       ├── Icon (colored circle)
│   │       ├── Category & Date
│   │       └── Amount (+ or -)
│   │
│   └── ExpenseByCategory
│       └── CategoryProgressBar (×4)
│           ├── Category Name & Color Dot
│           ├── Percentage
│           └── Progress Bar
│
└── MonthlySummaryChart
    ├── Title & Legend
    └── Chart Placeholder
```

## Component Relationships

### Parent → Child Props Flow

```
page.tsx
  │
  ├─→ DashboardHeader (no props)
  │
  ├─→ IncomeExpensesCard
  │     Props: { totalIncome, totalExpenses, balance }
  │
  ├─→ IncomeVsExpensesChart (no props)
  │
  ├─→ RecentTransactions
  │     Props: { transactions: Transaction[] }
  │     │
  │     └─→ TransactionItem (×N)
  │           Props: { type, category, amount, date, icon }
  │
  ├─→ ExpenseByCategory
  │     Props: { categories: ExpenseCategory[] }
  │     │
  │     └─→ CategoryProgressBar (×N)
  │           Props: { category, percentage, color }
  │
  └─→ MonthlySummaryChart (no props)
```

## Data Flow Diagram

```
┌─────────────────────────────────────┐
│         page.tsx (Client)           │
│  - Orchestrates all components      │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│    getDashboardData() (lib/)        │
│  - Fetches/prepares data            │
│  - Returns DashboardData object     │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│      DashboardData Object           │
│  {                                  │
│    totalIncome,                     │
│    totalExpenses,                   │
│    balance,                         │
│    recentTransactions[],            │
│    expensesByCategory[]             │
│  }                                  │
└──────────────┬──────────────────────┘
               │
               ↓
        ┌──────┴──────┐
        │             │
        ↓             ↓
  ┌─────────┐   ┌─────────────┐
  │Container│   │ Presentation│
  │Components│   │ Components  │
  └─────────┘   └─────────────┘
```

## Atomic Design Levels

### Atoms (Smallest reusable units)

- `CategoryProgressBar` - Single progress bar
- `TransactionItem` - Single transaction row

### Molecules (Groups of atoms)

- `DashboardHeader` - Title + Button
- `IncomeExpensesCard` - Multiple data displays + Button

### Organisms (Complex components)

- `RecentTransactions` - Card + List of TransactionItems
- `ExpenseByCategory` - Card + List of CategoryProgressBars
- `IncomeVsExpensesChart` - Card + Chart placeholder
- `MonthlySummaryChart` - Card + Chart placeholder

### Templates (Page layouts)

- `AppLayout` - Sidebar + Content area

### Pages (Complete views)

- `page.tsx` - Full dashboard composition
