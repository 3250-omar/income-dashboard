export type TransactionType = "income" | "expense" | undefined;

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  category?: string;
  description?: string;
  date: string;
  created_at: string;
}
